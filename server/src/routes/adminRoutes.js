const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const adminAuth = require("../middlewares/adminAuth");
const adminController = require("../controllers/adminController");

// protect all admin routes
router.use(auth, adminAuth);

//users
router.get("/users", adminController.getUsers);
router.put("/users/:id", adminController.updateUser);
router.patch("/users/:id/toggle", adminController.toggleUser);

//providers
router.get("/providers", adminController.getProviders);
router.put("/providers/:id", adminController.updateProvider);
router.patch("/providers/:id/toggle", adminController.toggleProvider);
router.delete("/providers/:id", adminController.deleteProvider);

module.exports = router;
