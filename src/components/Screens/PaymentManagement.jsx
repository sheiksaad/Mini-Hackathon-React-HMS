import React, { useEffect, useState } from "react";
import { dataBase } from "../../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [payment, setPayment] = useState({
    bookingID: "",
    amount: "",
    paymentDate: "",
    paymentMethod: "Credit Card", // default method
    status: "Completed", // default status
  });

  // Fetch payments from Firestore
  const fetchPayments = async () => {
    const paymentsCollection = collection(dataBase, "payments");
    const paymentSnapshot = await getDocs(paymentsCollection);
    const paymentList = paymentSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPayments(paymentList);
  };

  useEffect(() => {
    fetchPayments(); // Fetch payments when the component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment({
      ...payment,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add a new payment document to the "payments" collection
      await addDoc(collection(dataBase, "payments"), {
        bookingID: payment.bookingID,
        amount: parseFloat(payment.amount),
        paymentDate: payment.paymentDate,
        paymentMethod: payment.paymentMethod,
        status: payment.status,
      });
      alert("Payment added successfully!");
      setPayment({
        bookingID: "",
        amount: "",
        paymentDate: "",
        paymentMethod: "Credit Card",
        status: "Completed",
      }); // Reset form
      fetchPayments(); // Refresh the payment list after adding a new payment
    } catch (error) {
      console.error("Error adding payment: ", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Add New Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Booking ID</label>
            <input
              type="text"
              name="bookingID"
              value={payment.bookingID}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={payment.amount}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Payment Date</label>
            <input
              type="date"
              name="paymentDate"
              value={payment.paymentDate}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              value={payment.paymentMethod}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Payment
          </button>
        </form>
      </div>

      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Payment List</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Payment ID</th>
              <th className="border border-gray-300 p-2">Booking ID</th>
              <th className="border border-gray-300 p-2">Amount</th>
              <th className="border border-gray-300 p-2">Payment Date</th>
              <th className="border border-gray-300 p-2">Payment Method</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="border border-gray-300 p-2">{payment.id}</td>
                <td className="border border-gray-300 p-2">
                  {payment.bookingID}
                </td>
                <td className="border border-gray-300 p-2">{payment.amount}</td>
                <td className="border border-gray-300 p-2">
                  {payment.paymentDate}
                </td>
                <td className="border border-gray-300 p-2">
                  {payment.paymentMethod}
                </td>
                <td className="border border-gray-300 p-2">{payment.status}</td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center border border-gray-300 p-2"
                >
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManagement;
