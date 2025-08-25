const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Routes for Requirements
router.get("/requirements", adminController.getAllRequirements);

// Routes for Donations
router.get("/donations", adminController.getAllDonations);

// Routes for Matches
router.get("/matches", adminController.getAllMatches);
router.get("/matches/status/:status", adminController.getMatchesByStatus);
router.post("/matches/create", adminController.createMatch);
router.get("/matches/potential", adminController.findPotentialMatches);

// Routes for Match Actions
router.put("/matches/:id/approve", adminController.approveMatch);
router.put("/matches/:id/disapprove", adminController.disapproveMatch);
router.post("/matches/bulk-approve", adminController.bulkApproveMatches);

// Routes for Dashboard & Analytics
router.get("/dashboard/stats", adminController.getDashboardStats);

// Search Routes
router.get("/search", adminController.searchData);

// Health check route
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin API is working properly",
    timestamp: new Date().toISOString(),
    endpoints: {
      requirements: "/api/admin/requirements",
      donations: "/api/admin/donations",
      matches: "/api/admin/matches",
      potential_matches: "/api/admin/matches/potential",
      approve_match: "/api/admin/matches/:id/approve",
      disapprove_match: "/api/admin/matches/:id/disapprove",
      bulk_approve: "/api/admin/matches/bulk-approve",
      dashboard_stats: "/api/admin/dashboard/stats",
      search: "/api/admin/search"
    }
  });
});

module.exports = router;