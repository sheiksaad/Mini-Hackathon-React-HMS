import React, { useEffect, useState } from "react";
import { dataBase } from "../../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({
    roomNumber: "",
    roomType: "",
    status: "Available", // default status
    price: "",
  });

  // Fetch rooms from Firestore
  const fetchRooms = async () => {
    const roomsCollection = collection(dataBase, "rooms");
    const roomSnapshot = await getDocs(roomsCollection);
    const roomList = roomSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRooms(roomList);
  };

  useEffect(() => {
    fetchRooms(); // Fetch rooms when the component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom({
      ...room,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(dataBase, "rooms"), {
        roomNumber: room.roomNumber,
        roomType: room.roomType,
        status: room.status,
        price: room.price,
      });
      alert("Room added successfully!");
      setRoom({ roomNumber: "", roomType: "", status: "Available", price: "" }); // Reset form
      fetchRooms(); // Refresh the room list after adding a new room
    } catch (error) {
      console.error("Error adding room: ", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Add New Room</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Room Number</label>
            <input
              type="text"
              name="roomNumber"
              value={room.roomNumber}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Room Type</label>
            <input
              type="text"
              name="roomType"
              value={room.roomType}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="text"
              name="price"
              value={room.price}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Room
          </button>
        </form>
      </div>

      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Room List</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Room ID</th>
              <th className="border border-gray-300 p-2">Room Number</th>
              <th className="border border-gray-300 p-2">Room Type</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="border border-gray-300 p-2">{room.id}</td>
                <td className="border border-gray-300 p-2">
                  {room.roomNumber}
                </td>
                <td className="border border-gray-300 p-2">{room.roomType}</td>
                <td className="border border-gray-300 p-2">{room.status}</td>
                <td className="border border-gray-300 p-2">{room.price}</td>
              </tr>
            ))}
            {rooms.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center border border-gray-300 p-2"
                >
                  No rooms found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomManagement;
