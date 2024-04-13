import express from "express";
const router = express.Router();
import knex from "../database.js";
import app from "../app.js";

router.get("/", async (req, res) => {
  try {
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

export default router;
