import { Router } from "express";
import Poi from "../models/poi.js";

const router = Router();

router.post("/", async (request, response) => {
  try {
    const newPoi = new Poi (request.body);

    const data = await newPoi.save();

    response.json(data);
  } catch (error) {

    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});


router.get("/", async (request, response) => {
  try {

    const query = request.query;

    const data = await Poi.find(query);

    response.json(data);
  } catch (error) {

    console.log(error);

    return response.status(500).json(error.errors);
  }
});


router.get("/:id", async (request, response) => {
  try {
    const data = await Poi.findById(request.params.id);

    response.json(data);
  } catch (error) {

    console.log(error);

    return response.status(500).json(error.errors);
  }
});


router.delete("/:id", async (request, response) => {
  try {
    const data = await Poi.findByIdAndDelete(request.params.id);

    response.json(data);
  } catch (error) {

    console.log(error);

    return response.status(500).json(error.errors);
  }
});


router.put("/:id", async (request, response) => {
  try {
    const body = request.body;

    const data = await Poi.findByIdAndUpdate(
      request.params.id,
      {
        $set: {
          country: body.country,
          city: body.city,
          description: body.description,
          latitude: body.latitude,
          longitude: body.longitude
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    response.json(data);
  } catch (error) {

    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

export default router;
