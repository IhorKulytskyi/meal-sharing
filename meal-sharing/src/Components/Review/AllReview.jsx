import { useState, useEffect } from "react";
import "./AllReview.css"; 
const AllReview = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5001/api/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };
  const renderStars = (numStars) => {
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(
        <span className="star" key={i}>
          ★
        </span>
      );
    }
    return stars;
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <h2 className="Review-title">Read our reviews</h2>
      <div className="Review-container">
        {reviews.map((review) => (
          <div key={review.id} className="Review-item">
            <div className="Review-info">
              <h3>{review.title}</h3>
              <p className="Review-description">{review.description}</p>
              <p className="stars">{renderStars(review.stars)}</p>
              <p className="Review-date">
                Created at: {formatDate(review.created_date)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AllReview;