import type { RequestHandler } from "express";

// Import access to data
import articlesRepository from "./articlesRepository";
import type { Article } from "./articlesRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const articles = await articlesRepository.readAll();

    // Respond with the items in JSON format
    res.json(articles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const articleId = Number(req.params.id);
    const article = await articlesRepository.read(articleId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (article == null) {
      res.sendStatus(404);
    } else {
      res.json(article);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit: RequestHandler = async (req, res, next) => {
  try {
    // Extract the article ID from the request parameters
    const articleId = Number(req.params.id);

    // Extract the article data from the request body
    const articleData: Partial<Omit<Article, "idarticles">> = {
      article_title: req.body.article_title,
      subtitle: req.body.subtitle,
      content: req.body.content,
      reference_source: req.body.reference_source,
      release_date: req.body.release_date,
    };

    // Remove undefined values
    for (const key of Object.keys(articleData)) {
      if (articleData[key as keyof typeof articleData] === undefined) {
        delete articleData[key as keyof typeof articleData];
      }
    }

    // Update the article
    const updated = await articlesRepository.update(articleId, articleData);

    // If the article is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with HTTP 204 (No Content)
    if (!updated) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const newArticle = {
      article_title: req.body.article_title,
      subtitle: req.body.subtitle || null,
      content: req.body.content,
      photo: req.body.photo,
      reference_source: req.body.reference_source || null,
      user_iduser: req.body.user_iduser,
      release_date: req.body.release_date || new Date().toISOString(),
    };

    if (
      !newArticle.article_title ||
      !newArticle.content ||
      !newArticle.user_iduser
    ) {
      res.status(400).json({
        error: "Données manquantes",
        message: "article_title, content et user_iduser sont requis",
      });
      return;
    }

    // Create the article
    const insertId = await articlesRepository.create(newArticle);
    const createdArticle = await articlesRepository.read(insertId);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json(createdArticle);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const articleId = Number(req.params.id);

    // Delete the article
    const deleted = await articlesRepository.delete(articleId);

    // If the article is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with HTTP 204 (No Content)
    if (!deleted) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, edit, add, destroy };
