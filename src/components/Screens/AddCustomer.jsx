import React, { useState, useEffect } from "react";
import { dataBase } from "../../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    customerID: "", // New field for Customer ID
    name: "",
    email: "",
    phone: "",
    address: "",
    bookingHistory: [],
  });

  const [customers, setCustomers] = useState([]); // State to hold customers

  // Fetch customers from Firestore
  const fetchCustomers = async () => {
    const customersCollection = collection(dataBase, "customers");
    const customerSnapshot = await getDocs(customersCollection);
    const customerList = customerSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCustomers(customerList);
  };

  useEffect(() => {
    fetchCustomers(); // Fetch customers on component mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Adding a new document to the "customers" collection
      const newCustomerRef = await addDoc(collection(dataBase, "customers"), {
        customerID: customer.customerID, // Include customer ID
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        bookingHistory: [], // Start with an empty booking history
      });
      alert("Customer added successfully!");
      setCustomer({
        customerID: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        bookingHistory: [],
      }); // Reset the form
      fetchCustomers(); // Refresh the customer list
    } catch (error) {
      console.error("Error adding customer: ", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Customer ID</label>
            <input
              type="text"
              name="customerID"
              value={customer.customerID}
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
              value={customer.name}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={customer.address}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Customer
          </button>
        </form>
      </div>

      {/* Customer List Table */}
      <div className="mt-6 bg-white w-full max-w-4xl rounded-lg shadow-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Customer List</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Customer ID</th>{" "}
              {/* New column for Customer ID */}
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Phone</th>
              <th className="border border-gray-300 p-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr key={cust.id}>
                <td className="border border-gray-300 p-2">
                  {cust.customerID}
                </td>{" "}
                {/* Display Customer ID */}
                <td className="border border-gray-300 p-2">{cust.name}</td>
                <td className="border border-gray-300 p-2">{cust.email}</td>
                <td className="border border-gray-300 p-2">{cust.phone}</td>
                <td className="border border-gray-300 p-2">{cust.address}</td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center border border-gray-300 p-2"
                >
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddCustomer;
