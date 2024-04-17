import  { useState, useEffect } from "react";
function MealsList() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 useEffect(() => {
  async function fetchMeals() {
    try {
      const res = await fetch("http://localhost:5001/all-meals");
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
      <h2 className="MealsList-title">Meals List</h2>
      <div className="MealsList-container">
        {meals.map((meal) => (
          <div key={meal.id} className="MealsList-item">
            <h3 className="MealsList-item-title">{meal.title}</h3>
            <p className="MealsList-item-description">{meal.description}</p>
            <p className="MealsList-item-price">Price: ${meal.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MealsList;