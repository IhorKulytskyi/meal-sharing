import { Link } from "react-router-dom";
const Meal = ({ meal }) => {
  if (!meal) {
    return <div>Ooops meal data not available now</div>;
  }
  return (
    <div className="mealsList">
      <Link to={`/meals/${meal.id}`}>
        <img
          className="meals-picture"
          src={meal.picture}
          alt={meal.title}
        />
        <h3 className="meals-title">{meal.title}</h3>

      </Link>
    </div>
  );
};
export default Meal;