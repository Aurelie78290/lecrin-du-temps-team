import reviewsRepository from "./reviewsRepository";

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const reviewsFromDB = await reviewsRepository.readAll();

    res.json(reviewsFromDB);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const reviewId = Number.parseInt(req.params.id);
    const review = await reviewsRepository.read(reviewId);

    if (review != null) {
      res.json(review);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    // Update a specific review based on the provided ID
    const review = {
      idreviews: Number(req.body.review),
      review_title: String(req.body.title),
      note: Number(req.body.note),
      comment: String(req.body.comment),
      user_iduser: Number(req.body.user),
    };

    const affectedRows = await reviewsRepository.update(review);

    // If the review is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the review in JSON format
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the review data from the request body
    const newReview = {
      idreviews: Number(req.body.review),
      review_title: String(req.body.title),
      note: Number(req.body.note),
      comment: String(req.body.comment),
      user_iduser: Number(req.body.user),
    };

    // Create the category
    const insertId = await reviewsRepository.create(newReview);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Delete a specific review based on the provided ID
    const reviewId = Number(req.params.id);

    await reviewsRepository.delete(reviewId);

    // Respond with HTTP 204 (No Content) anyway
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Export them to import them somewhere else

export default { browse, read, edit, add, destroy };
