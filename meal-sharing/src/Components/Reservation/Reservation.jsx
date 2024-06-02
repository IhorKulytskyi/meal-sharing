import  { useState } from "react";
import "./Reservation.css"
const ReservationForm = ({ mealId }) => {
  const [reserved, setReserved] = useState(false);
  const [error, setError] = useState("");
  const getTodayDate = () => new Date().toISOString().split('T')[0];
  const makeReservation = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5001/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number_of_guests: e.target.number_of_guests.value,
          created_date: getTodayDate(),
          contact_phonenumber: e.target.phonenumber.value,
          contact_name: e.target.name.value,
          contact_email: e.target.email.value,
          meal_id: mealId,
        }),
      });
      if (response.ok) {
        setReserved(true);
        alert("Yum Yum! Food is booked!");
        // Optionally refresh meal details or update state
      } else {
        const errorData = await response.json(); // Parse the JSON response from the server
        throw new Error(errorData.message || "Oops! Try later!");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return reserved ? (
    <>
      <p>Meal reserved!</p>
      {error && <p>Error: {error}</p>}
    </>
  ) : (
    <form className="reservationinput-form" onSubmit={makeReservation}>
      <input
        name="number_of_guests"
        type="number"
        placeholder="Enter number of guests"
        min="1"
        required
      />
      <input type="text" placeholder="Enter name" name="name" required />
      <input type="text" placeholder="Enter phone number" name="phonenumber" required />
      <input type="email" placeholder="Enter email" name="email" required />
      <input type="hidden" name="meal_id" value={mealId} />
      <button type="submit">Reserve</button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};
export default ReservationForm;