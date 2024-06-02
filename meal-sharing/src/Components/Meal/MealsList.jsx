import  { useState, useEffect } from "react";
import Meal from "./Meal";
function MealsList() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 useEffect(() => {
  async function fetchMeals() {
    try {
      const res = await fetch("http://localhost:5001/api/meals");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const parsedData = await res.json();
      setMeals(parsedData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.error("There was an error fetching the data:", error);
    }
  }
  fetchMeals();
}, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <h2 className="mealsList-title">All Meals</h2>
      <div className="mealsList-container">
        {meals.map((meal) => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
}
export default MealsList;