import express from "express";
import isAuth from "./middlewares/authMiddleware";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define the auth routes //
import userActions from "./modules/User/userActions";
router.post("/api/users", userActions.add); // Signup //
router.post("/api/login", userActions.login); // Login //
router.get("/api/logout", userActions.logout); // Logout //
router.get("/api/auth/me", isAuth, userActions.checkAuth); // Check de la session //
router.put("/api/users/me", isAuth, userActions.edit); // Modification d'informmation personnelle //
router.post("/api/forgot-password", userActions.forgotPassword); // MDP oublié //
router.post("/api/reset-password", userActions.resetPassword); // Réinitialisation du MDP //

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
router.put("/api/articles/:id", articlesActions.edit);
router.post("/api/articles", articlesActions.add);
router.delete("/api/articles/:id", articlesActions.destroy);

/* ************************************************************************* */

import watchActions from "./modules/watch/watchActions";

router.get("/api/watches", watchActions.browse);
router.get("/api/watches/:id", watchActions.read);
router.patch(
  "/api/watches/:id/request-sell",
  isAuth,
  watchActions.requestSellApproval,
);

router.get("/api/shop/watches", watchActions.browseShop);
router.get("/api/collection/watches", isAuth, watchActions.browseCollection);
router.delete(
  "/api/collection/watches/:watchId",
  isAuth,
  watchActions.removeFromCollection,
);

router.post(
  "/api/watches",
  isAuth,
  upload.fields([
    { name: "watch_image", maxCount: 1 },
    { name: "certificate_image", maxCount: 1 },
  ]),
  watchActions.add,
);

router.put(
  "/api/watches/:id",
  upload.fields([
    { name: "watch_image", maxCount: 1 },
    { name: "certificate_image", maxCount: 1 },
  ]),
  watchActions.update,
);
router.get("/api/collection/stats", isAuth, watchActions.getCollectionStats);

router.get("/api/admin/users/:id/watches", watchActions.browseForAdmin);

/* ************************************************************************* */

// Define articles-related routes
import faqActions from "./modules/faq/faqActions";

router.get("/api/faq", faqActions.browse);
router.get("/api/faq/:id", faqActions.read);
router.put("/api/faq/:id", faqActions.edit);
router.post("/api/faq", faqActions.add);
router.delete("/api/faq/:id", faqActions.destroy);

/* ************************************************************************* */
import brandsActions from "./modules/brands/brandsActions";
router.get("/api/brands", brandsActions.browse);

import modelsActions from "./modules/models/modelsActions";
router.get("/api/models", modelsActions.browse);

/* ************************************************************************* */

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

// Define pendingAdd route
import pendingAddActions from "./modules/pendingAdd/pendingAddActions";

router.get("/api/pendingAdd", pendingAddActions.browse);
router.get("/api/nbPendingAdd", pendingAddActions.browseNb);
router.get("/api/pendingAdd/:id", pendingAddActions.read);
router.put("/api/pendingAddSell/:id", pendingAddActions.edit);

/* ************************************************************************* */
import lookupsActions from "./modules/lookup/lookUpActions";

router.get("/api/lookups/brands", lookupsActions.brands);
router.get("/api/lookups/brands/:brandId/models", lookupsActions.modelsByBrand);

router.get("/api/lookups/case-materials", lookupsActions.caseMaterials);
router.get("/api/lookups/clasp-types", lookupsActions.claspTypes);
router.get("/api/lookups/dial-finishes", lookupsActions.dialFinishes);
router.get("/api/lookups/hour-marker-types", lookupsActions.hourMarkerTypes);
router.get("/api/lookups/strap-materials", lookupsActions.strapMaterials);
router.get("/api/lookups/movement-types", lookupsActions.movementTypes);
router.get("/api/lookups/functions", lookupsActions.functionsList);
router.get("/api/lookups/certificates", lookupsActions.certificates);

/* ************************************************************************* */
// Define the table to editUserRole route

import editUsersActions from "./modules/editUsers/editUsersActions";

router.get("/api/users", editUsersActions.browse);
router.put("/api/users/:id/role", editUsersActions.update);
router.delete("/api/users", editUsersActions.destroy);

/* ************************************************************************* */
// Define Basket routes

import basketActions from "./modules/basket/basketActions";

router.get("/api/cart", isAuth, basketActions.browse);
router.post("/api/cart/items", isAuth, basketActions.add);
router.delete("/api/cart/items/:watchId", isAuth, basketActions.remove);
router.delete("/api/cart", isAuth, basketActions.clear);

/* ************************************************************************* */
// Define stripe payment routes

import stripeActions from "./modules/stripe/stripeActions";

router.post(
  "/api/stripe/create-checkout-session",
  isAuth,
  stripeActions.createCheckoutSession,
);
router.get(
  "/api/stripe/verify-payment/:sessionId",
  isAuth,
  stripeActions.verifyPayment,
);
router.post("/api/stripe/webhook", stripeActions.handleWebhook);

/* ************************************************************************* */
// Define order routes

import { createOrderFromStripe } from "./modules/orderArchive/orderArchiveActions";

router.post("/api/orders/create-from-stripe", isAuth, createOrderFromStripe);

export default router;
