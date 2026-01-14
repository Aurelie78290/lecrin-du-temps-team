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
// Define team members routes
import teamMembersActions from "./modules/teamMembers/teamMembersActions";

router.get("/api/team-members", teamMembersActions.browse);
router.get("/api/team-members/:id", teamMembersActions.read);
router.put("/api/team-members/:id", teamMembersActions.edit);
router.post("/api/team-members", teamMembersActions.add);
router.delete("/api/team-members/:id", teamMembersActions.destroy);

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

router.get("/api/shop/watches", watchActions.browseShop);
router.get("/api/collection/watches/:userId", watchActions.browseCollection);

router.delete(
  "/api/collection/watches/:watchId",
  watchActions.removeFromCollection,
);
router.post(
  "/api/watches",
  upload.fields([
    { name: "watch_image", maxCount: 1 },
    { name: "certificate_image", maxCount: 1 },
  ]),
  watchActions.add,
);

/* ************************************************************************* */

// Define articles-related routes
import faqActions from "./modules/faq/faqActions";

router.get("/api/faq", faqActions.browse);
router.get("/api/faq/:id", faqActions.read);
router.put("/faq/:id", faqActions.edit);
router.post("/api/faq", faqActions.add);
router.delete("/faq/:id", faqActions.destroy);

/* ************************************************************************* */
import brandsActions from "./modules/brands/brandsActions";
router.get("/api/brands", brandsActions.browse);

import modelsActions from "./modules/models/modelsActions";
router.get("/api/models", modelsActions.browse);

// Define MonthlySales routes
import MonthlySalesActions from "./modules/MonthlySales/MonthlySalesActions";

router.get("/api/monthlySales", MonthlySalesActions.browse);

/* ************************************************************************* */

import { upload } from "../middleware/upload";
// Define PendingTransactions route
import PendingTransactionsActions from "./modules/PendingTransactions/PendingTransactionsActions";

router.get("/api/PendingTransactions", PendingTransactionsActions.browse);

/* ************************************************************************* */

// Define adminNewMembers route
import AdminNewMembersActions from "./modules/adminNewMembers/adminNewMembersActions";

router.get("/api/AdminNewMembers", AdminNewMembersActions.browse);

/* ************************************************************************* */

// Define adminVolTran route
import adminVolTran from "./modules/adminVolTran/adminVolTranActions";

router.get("/api/adminVolTran", adminVolTran.browse);

/* ************************************************************************* */

export default router;
