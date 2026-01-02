import faqRepository from "./faqRepository";

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const faqFromDB = await faqRepository.readAll();

    res.json(faqFromDB);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const faqId = Number.parseInt(req.params.id);
    const questions = await faqRepository.read(faqId);

    if (questions != null) {
      res.json(questions);
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
    const question = {
      idtable1: Number(req.body.id),
      question: String(req.body.question),
      answer: String(req.body.answer),
    };

    const affectedRows = await faqRepository.update(question);

    // If the question is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the question in JSON format
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
    const newQuestion = {
      idtable1: Number(req.body.id),
      question: String(req.body.question),
      answer: String(req.body.answer),
    };

    // Create the question
    const insertId = await faqRepository.create(newQuestion);

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
    const questionId = Number(req.params.id);

    await faqRepository.delete(questionId);

    // Respond with HTTP 204 (No Content) anyway
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Export them to import them somewhere else

export default { browse, read, edit, add, destroy };
