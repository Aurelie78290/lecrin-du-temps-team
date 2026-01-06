import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";
import teamMembersActions from "./modules/item/teamMembers/teamMembersActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/team-members", teamMembersActions.browse);
router.get("/api/team-members/:id", teamMembersActions.read);

/* ************************************************************************* */

export default router;
