import React, { useEffect, useState } from "react";
import { dataBase } from "../../config/firebase"; // Adjust the import path as necessary
import { collection, addDoc, getDocs } from "firebase/firestore";

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStaff, setNewStaff] = useState({
    staffID: "",
    name: "",
    role: "",
    contactInfo: "",
    shiftTiming: "",
  });

  // Fetch staff from Firestore
  const fetchStaff = async () => {
    try {
      const staffCollection = collection(dataBase, "staff");
      const staffSnapshot = await getDocs(staffCollection);
      const staffList = staffSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStaff(staffList);
    } catch (err) {
      console.error("Error fetching staff data: ", err);
      setError("Failed to load staff data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff(); // Fetch staff when the component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({
      ...newStaff,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(dataBase, "staff"), {
        staffID: newStaff.staffID,
        name: newStaff.name,
        role: newStaff.role,
        contactInfo: newStaff.contactInfo,
        shiftTiming: newStaff.shiftTiming,
      });
      alert("Staff added successfully!");
      setNewStaff({
        staffID: "",
        name: "",
        role: "",
        contactInfo: "",
        shiftTiming: "",
      });
      fetchStaff(); // Refresh the staff list after adding a new staff member
    } catch (error) {
      console.error("Error adding staff: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message if any
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">Add New Staff</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Staff ID</label>
            <input
              type="text"
              name="staffID"
              value={newStaff.staffID}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={newStaff.name}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={newStaff.role}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Contact Info</label>
            <input
              type="text"
              name="contactInfo"
              value={newStaff.contactInfo}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Shift Timing</label>
            <input
              type="text"
              name="shiftTiming"
              value={newStaff.shiftTiming}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Staff
          </button>
        </form>
      </div>

      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Staff List</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Staff ID</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Role</th>
              <th className="border border-gray-300 p-2">Contact Info</th>
              <th className="border border-gray-300 p-2">Shift Timing</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((staffMember) => (
              <tr key={staffMember.id}>
                <td className="border border-gray-300 p-2">
                  {staffMember.staffID}
                </td>
                <td className="border border-gray-300 p-2">
                  {staffMember.name}
                </td>
                <td className="border border-gray-300 p-2">
                  {staffMember.role}
                </td>
                <td className="border border-gray-300 p-2">
                  {staffMember.contactInfo}
                </td>
                <td className="border border-gray-300 p-2">
                  {staffMember.shiftTiming}
                </td>
              </tr>
            ))}
            {staff.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center border border-gray-300 p-2"
                >
                  No staff members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffManagement;
