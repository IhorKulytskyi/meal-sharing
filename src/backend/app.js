import express from "express";
import path from "path";
import mealsRouter from "./api/meals.js";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import reservationsRouter from "./api/reservations.js";
import reviewsRouter from "./api/reviews.js";
import knex from "./database.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const router = express.Router();
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);
router.use( "/reservations",reservationsRouter);
router.use("/reviews", reviewsRouter);

//--------------------------

app.get("/future-meals", async(reg, res) => {
  try{
    const futureMeals = await knex("meal")
    .select()
    .where("when", ">", new Date());
    if (futureMeals.length === 0){
     res.status(404).send("No found");
     return
    }
    res.status(200).json(futureMeals);
  }catch(error){
    console.error(error);
    res.status(500).send("Error");
  }
});

//--------------------------

app.get("/past-meals", async(reg,res)=>{
  try{
    const pastMeals = await knex("meal")
    .where("when", "<", new Date())
    .select();
    if(pastMeals.length === 0){
      res.status(404).send("No found");
      return
    }
    res.status(200).json(pastMeals);
  }catch(error){
    console.error(error);
    res.status(500).send("Error");
  }
});

//--------------------------

app.get("/all-meals", async(reg, res)=>{
  try{
    const allMeals = await knex("meal")
    .select()
    .orderBy("id");
    if(allMeals.length === 0){
      res.status(404).send("No found");
      return
    }
    res.status(200).json(allMeals);
  }catch(error){
    console.error(error);
    res.status(500).send("Error");
  }
});

//--------------------------

app.get("/first-meal", async (req, res) => {
  try {
    const firstMeal = await knex("meal")
      .select()
      .orderBy("id")
      .first();
    if (firstMeal) {
      res.status(200).json(firstMeal);
    } else {res.status(404).send("No found");
  }
} catch (error) {
  console.error(error);
  res.status(500).send("Error");
}
});

//--------------------------

app.get("/last-meal", async (req, res) => {
try {
  const lastMeal = await knex("meal")
    .select()
    .where("id", '=', knex("meal").max('id'));

  if (lastMeal.length > 0) {
    res.status(200).json(lastMeal);
  } else {
    res.status(404).send("No found");
  }
} catch (error) {
  console.error(error);
  res.status(500).send("Error");
}
});

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file"
};

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

export default app;