import React, { useEffect, useState } from "react";
import { dataBase } from "../../config/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState({
    customerID: "",
    roomID: "",
    bookingDate: "",
    checkInDate: "",
    checkOutDate: "",
    status: "Pending", // default status
  });

  // Fetch bookings from Firestore
  const fetchBookings = async () => {
    const bookingsCollection = collection(dataBase, "bookings");
    const bookingSnapshot = await getDocs(bookingsCollection);
    const bookingList = bookingSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBookings(bookingList);
  };

  useEffect(() => {
    fetchBookings(); // Fetch bookings when the component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({
      ...booking,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add a new booking document to the "bookings" collection
      const newBookingRef = await addDoc(collection(dataBase, "bookings"), {
        customerID: booking.customerID,
        roomID: booking.roomID,
        bookingDate: booking.bookingDate,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        status: booking.status,
      });

      // Update the customer's booking history
      const customerRef = doc(dataBase, "customers", booking.customerID);
      const customerDoc = await getDoc(customerRef);

      if (customerDoc.exists()) {
        const customerData = customerDoc.data();
        const updatedBookingHistory = [
          ...customerData.bookingHistory,
          newBookingRef.id,
        ];

        // Update the customer's document with the new booking history
        await updateDoc(customerRef, {
          bookingHistory: updatedBookingHistory,
        });
      } else {
        console.error("Customer does not exist");
      }

      alert("Booking added successfully!");
      setBooking({
        // Reset booking state after submission
        customerID: "",
        roomID: "",
        bookingDate: "",
        checkInDate: "",
        checkOutDate: "",
        status: "Pending",
      });
      fetchBookings(); // Refresh the booking list after adding a new booking
    } catch (error) {
      console.error("Error adding booking: ", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-4 mb-6">
        <h2 className="text-2xl font-bold mb-4">Add New Booking</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Customer ID</label>
            <input
              type="text"
              name="customerID"
              value={booking.customerID}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Room Number</label>
            <input
              type="text"
              name="roomID"
              value={booking.roomID}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Booking Date</label>
            <input
              type="date"
              name="bookingDate"
              value={booking.bookingDate}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Check-In Date</label>
            <input
              type="date"
              name="checkInDate"
              value={booking.checkInDate}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Check-Out Date</label>
            <input
              type="date"
              name="checkOutDate"
              value={booking.checkOutDate}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Booking
          </button>
        </form>
      </div>

      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Booking List</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Booking ID</th>
              <th className="border border-gray-300 p-2">Customer ID</th>
              <th className="border border-gray-300 p-2">Room Number</th>
              <th className="border border-gray-300 p-2">Booking Date</th>
              <th className="border border-gray-300 p-2">Check-In Date</th>
              <th className="border border-gray-300 p-2">Check-Out Date</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="border border-gray-300 p-2">{booking.id}</td>
                <td className="border border-gray-300 p-2">
                  {booking.customerID}
                </td>
                <td className="border border-gray-300 p-2">{booking.roomID}</td>
                <td className="border border-gray-300 p-2">
                  {booking.bookingDate}
                </td>
                <td className="border border-gray-300 p-2">
                  {booking.checkInDate}
                </td>
                <td className="border border-gray-300 p-2">
                  {booking.checkOutDate}
                </td>
                <td className="border border-gray-300 p-2">{booking.status}</td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center border border-gray-300 p-2"
                >
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingManagement;
