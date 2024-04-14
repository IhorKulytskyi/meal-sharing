import express from "express";
const router = express.Router();
import knex from "../database.js";
import app from "../app.js";

router.get("/", async (req, res) => {
  try {
const {maxPrice,
  availableReservations,
  title,
  dateAfter,
  dateBefore,
  limit,
  sortKey,
  sortDir
} = req.query;
const query = knex("meal")
      .select([
        "meal.id",
        "meal.title",
        "meal.max_reservations",
        "meal.price",
        "meal.when",
      ])
      .countDistinct("reservation.id as total_reservations")
      .leftJoin("reservation", "meal.id", "=", "reservation.meal_id")
      .groupBy("meal.id", "meal.title", "meal.max_reservations", "meal.price", "meal.when");

      if (maxPrice !== undefined) {
        // Convert maxPrice to a float
        const price = parseFloat(maxPrice);
  
        if (!isNaN(price) && price >= 0) {
          query.where("meal.price", "<=", price);
        } else {
          res.status(400).send("Invalid maxPrice");
return
}}

if (availableReservations === 'true') {
  query.having("total_reservations", "<", knex.raw("meal.max_reservations"));

} else if (availableReservations === 'false') {
  query.having("total_reservations", ">=", knex.raw("meal.max_reservations"));
}

if (title !== undefined) {
  query.where("meal.title", "like", `%${title}%`);
}

if (dateAfter !== undefined) {
  query.where("meal.when", ">", dateAfter);
}

if (dateBefore !== undefined) {
  query.where("meal.when", "<", dateBefore);
}

if (limit !== undefined) {
  query.limit(parseInt(limit, 10));
}


if (sortKey !== undefined) {
  const direction = sortDir === 'desc' ? 'desc' : 'asc';
  query.orderBy(`meal.${sortKey}`, direction);
}

const result = await query;

res.json(result);
} catch (error) {
  console.error(error);
  res.status(500).send("Error");
}
});

router.get("/", async (req,res) => {
  try{
    const meals = await knex("meal").select();
    res.json(meals);
}catch(error){
    console.error(error);
    res.status(500).send("Error");
}
});

router.post("/", async (req, res) => {
  try {
    const newMeal = req.body;
    const meal = await knex("meal").insert(newMeal);
    res.status(201).json(meal);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

router.get("/:id", async(req,res)=>{
  try{
    const mealId = req.params.id
    const meal = await knex("meal").where("id","=", mealId).select();
    if(meal.length === 0){
      res.status(404).send("Not found");
      return
    }
    res.json({ meal });
  }catch(error){
    console.error(error);
    res.status(500).send("Error");
  }
});

router.put("/:id", async(req,res)=>{
  try{
    const mealId = req.params.id
    const updatedMeal = req.body
    const meal = await knex("meal").where("id","=", mealId).update(updatedMeal);
    if(meal === 0){
      res.status(404).send("Not found");
      return
    }
    res.status(200).json({ meal });
  }catch(error){
    console.error(error);
    res.status(500).send("Error");
  }
});


router.delete("/:id", async(req,res)=>{
  try{
    const mealId = req.params.id
    const meal = await knex("meal").where("id","=", mealId).del();
    if(meal === 0){
      res.status(404).send("Not found");
      return
    }
    res.status(200).json({ meal });
  }catch(error){
    console.error(error);
    res.status(500).send("Error");
  }
});

router.get("/:meal_id/reviews", async (req, res) => {
  try {
      const { meal_id } = req.params;

      const reviews = await knex("review")
          .where({ meal_id })
          .select();

      res.status(200).json(reviews);
  } catch (error) {
      console.error(error);
      res.status(500).send("Error");
  }
}); 


export default router;
