import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

// Define reviews routes
import reviewsActions from "./modules/reviews/reviewsActions";

router.get("/api/reviews", reviewsActions.browse);
router.get("/api/reviews/:id", reviewsActions.read);
router.put("/api/reviews/:id", reviewsActions.edit);
router.post("/api/reviews", reviewsActions.add);
router.delete("/api/reviews", reviewsActions.destroy);

/* ************************************************************************* */

// Define articles-related routes
import articlesActions from "./modules/articles/articlesActions";

router.get("/api/articles", articlesActions.browse);
router.get("/api/articles/:id", articlesActions.read);
router.put("/articles/:id", articlesActions.edit);
router.post("/api/articles", articlesActions.add);
router.delete("/articles/:id", articlesActions.destroy);

/* ************************************************************************* */

import watchActions from "./modules/watch/watchActions";

router.get("/api/watches", watchActions.browse);
router.get("/api/watches/:id", watchActions.read);
router.post("/api/watches", watchActions.add);

/* ************************************************************************* */

// Define articles-related routes
import faqActions from "./modules/faq/faqActions";

router.get("/api/faq", faqActions.browse);
router.get("/api/faq/:id", faqActions.read);
router.put("/faq/:id", faqActions.edit);
router.post("/api/faq", faqActions.add);
router.delete("/faq/:id", faqActions.destroy);

/* ************************************************************************* */

export default router;
