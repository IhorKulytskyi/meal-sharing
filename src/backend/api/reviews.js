import express from "express";
const router = express.Router();
import knex from "../database.js";

router.get("/", async (req,res) => {
    try{
        const reviews = await knex("review").select();
        res.json(reviews);
    }catch(error){
        console.error(error);
        res.status(500).send("Error");
    }
})

router.post("/", async (req, res) => {
    try {
        const newReview = req.body;
        const [reviewId] = await knex("review").insert(newReview);
        res.status(201).json({ id: reviewId });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }
});

router.get("/:id", async(req,res)=>{
    try{
      const reviewId = req.params.id
      const reviews = await knex("review").where("id","=", reviewId).select();
      if(reviews.length === 0){
        res.status(404).send("Not found");
        return
      }
      res.json({ reviews });

    }catch(error){
      console.error(error);
      res.status(500).send("Error");
    }
  });

router.put("/:id", async(req,res)=>{
    try{
      const reviewId = req.params.id
      const updateReview = req.body
      const reviews = await knex("review").where("id","=", reviewId).update(updateReview);
      if(reviews === 0){
        res.status(404).send("Not found");
        return
      }
      res.status(200).json({ reviews });
    }catch(error){
      console.error(error);
      res.status(500).send("Error");
    }
  });


router.delete("/:id", async(req,res)=>{
    try{
      const reviewId = req.params.id
      const reviews = await knex("review").where("id","=", reviewId).del();
      if(reviews === 0){
        res.status(404).send("Not found");
        return
      }
      res.status(200).json({ reviews });
    }catch(error){
      console.error(error);
      res.status(500).send("Error");
    }
  });

  export default router;