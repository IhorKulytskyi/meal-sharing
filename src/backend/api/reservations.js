import express from "express";
const router = express.Router();
import knex from "../database.js";

router.get("/", async (req,res) => {
    try{
        const reservations = await knex("reservation").select();
        res.json(reservations);
    }catch(error){
        console.error(error);
        res.status(500).send("Error");
    }
    });
    
router.post("/", async (req, res) => {
    try {
      const newReservation = req.body;
      const reservations = await knex("reservation").insert(newReservation);
      res.status(201).json(reservations);
    } catch (error) {
      console.error(error);
    
      res.status(500).send("Error");
    }
  });

  router.get("/:id", async(req,res)=>{
  try{
    const reservationlId = req.params.id
    const reservations = await knex("reservation").where("id","=", reservationlId).select();
    if(reservations.length === 0){
      res.status(404).send("Not found");
      return}
    res.json({ reservations });
  }catch(error){
    console.error(error);
    res.status(500).send("Error");
  }
});

router.put("/:id", async(req,res)=>{
    try{
      const reservationlId = req.params.id
      const updateReservation = req.body
      const reservations = await knex("reservation").where("id","=", reservationlId).update(updateReservation);
      if(reservations === 0){
        res.status(404).send("Not found");
        return}
      res.status(200).json({ reservations });
    }catch(error){
      console.error(error);
      res.status(500).send("Error");
    }
  });

  router.delete("/:id", async(req,res)=>{
    try{
      const reservationId = req.params.id
      const reservations = await knex("reservation").where("id","=", reservationId).del();
      if(reservations === 0){
        res.status(404).send("Not found");
        return}
      res.status(200).json({ reservations });
    }catch(error){
      console.error(error);
      res.status(500).send("Error");
    }
  });

  export default router;