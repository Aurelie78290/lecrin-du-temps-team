// import type { RequestHandler } from "express";

// // Import access to data
// import articlesRepository from "./articlesRepository";

// // The B of BREAD - Browse (Read All) operation
// const browse: RequestHandler = async (req, res, next) => {
//   try {
//     // Fetch all items
//     const articles = await articlesRepository.readAll();

//     // Respond with the items in JSON format
//     res.json(articles);
//   } catch (err) {
//     // Pass any errors to the error-handling middleware
//     next(err);
//   }
// };

// // The R of BREAD - Read operation
// const read: RequestHandler = async (req, res, next) => {
//   try {
//     // Fetch a specific item based on the provided ID
//     const articleId = Number(req.params.id);
//     const article = await articlesRepository.read(articleId);

//     // If the item is not found, respond with HTTP 404 (Not Found)
//     // Otherwise, respond with the item in JSON format
//     if (article == null) {
//       res.sendStatus(404);
//     } else {
//       res.json(article);
//     }
//   } catch (err) {
//     // Pass any errors to the error-handling middleware
//     next(err);
//   }
// };

// // The A of BREAD - Add (Create) operation
// const add: RequestHandler = async (req, res, next) => {
//   try {
//     // Extract the item data from the request body
//     const newArticle = {
//       title: req.body.title,
//       user_id: req.body.user_id,
//     };

//     // Create the item
//     const insertId = await articlesRepository.create(newArticle);

//     // Respond with HTTP 201 (Created) and the ID of the newly inserted item
//     res.status(201).json({ insertId });
//   } catch (err) {
//     // Pass any errors to the error-handling middleware
//     next(err);
//   }
// };

// export default { browse, read, add };
