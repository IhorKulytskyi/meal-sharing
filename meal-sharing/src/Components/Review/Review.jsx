import  { useState } from "react";
import "./Review.css";
const ReviewForm = ({ mealId }) => {
  const [fetchError, setFetchError] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [stars, setStars] = useState(0);
  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => new Date().toISOString().split('T')[0];
  const toggleAddForm = () => {
    setIsActive(!isActive);
  };
  const addReview = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5001/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: e.target.title.value,
          description: e.target.description.value,
          created_date: getTodayDate(),
          stars: stars,
          meal_id: mealId,
        }),
      });
      if (response.ok) {
        setIsActive(false);
        alert("Yuhu! Thanks for the review!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Oops! Try later!");
      }
    } catch (error) {
      setFetchError(error.message);
    }
  };
  const StarRating = ({ stars, setStars }) => {
    const handleClick = (value) => {
      setStars(value);
    };
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= stars ? "filled" : ""}`}
            onClick={() => handleClick(star)}
          >
            &#9733;
          </span>
        ))}
      </div>
    );
  };
  return (
    <>
      <div className="add-review-container" onClick={toggleAddForm}>
        <p>Add review</p>
      </div>
      {isActive && (
        <>
          {fetchError && <p>Error: {fetchError}</p>}
          <form className="review-form" onSubmit={addReview}>
            <label htmlFor="title">Add title:</label>
            <input
              className="review-input"
              type="text"
              name="title"
              placeholder="Enter title"
              required
            />
            <label htmlFor="stars">Give us stars:</label>
            <StarRating stars={stars} setStars={setStars} />
            <input type="hidden" name="stars" value={stars} />
            <label htmlFor="description">What is your opinion about this meal?</label>
            <textarea
              name="description"
              rows="5"
              placeholder="Enter review"
              required
            ></textarea>
            <button type="submit">Add review</button>
          </form>
        </>
      )}
    </>
  );
};
export default ReviewForm;