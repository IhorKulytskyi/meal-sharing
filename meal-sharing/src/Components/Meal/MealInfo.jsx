import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReservationForm from "../Reservation/Reservation";
import ReviewForm from "../Review/Review";

const MealInfo = () => {
  const { id } = useParams();
  const apiUrl = `http://localhost:5001/api/meals/${id}`;
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMeal(data.meal[0]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeal();
  }, [apiUrl]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!meal) {
    return <div>Meal not found</div>;
  }

  return (
    <div className="mealsdetail-container">
      <div className="mealsdetail-header">
        <img src={meal.picture} alt={meal.title} className="mealslist-picture" />
        <div className="meals-info">
          <h2 className="mealsinfo-title">{meal.title}</h2>
          <p className="mealsinfo-description">{meal.description}</p>
          <p className="mealsinfo-price"><span className="pricespan">Price:</span> ${meal.price}</p>
          <p className="mealsinfo-location">Location: {meal.location}</p>
        </div>
      </div>
      <div> 
      <ReservationForm mealId={id} onSuccess={() => console.log("Thanks for reservation!")} />
      <ReviewForm mealId={meal.id} />
      </div>
    </div>
  );
};

export default MealInfo;