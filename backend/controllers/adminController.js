const Requirement = require("../models/Requirement");
const { Donation } = require("../models/Donation");
const Matching = require("../models/Matching");

// Helper function to determine category from item name
const getItemCategory = (itemName) => {
  const educationalItems = ["pen", "pencil", "books", "notebooks", "bag"];
  const clothingItems = ["shirt", "pants", "sweater", "shoes", "jacket"];
  
  if (educationalItems.includes(itemName)) {
    return "educational";
  } else if (clothingItems.includes(itemName)) {
    return "clothes";
  }
  return null;
};

// Calculate match score between requirement and donation
const calculateMatchScore = (requirement, donation) => {
  let totalScore = 0;
  let matchedItems = [];
  let categoryMatch = false;

  // Check category compatibility
  const donationCategory = getItemCategory(donation.itemsDonated[0].name);
  if (requirement.category === donationCategory) {
    categoryMatch = true;
    totalScore += 10; // Base score for category match
  }

  if (!categoryMatch) {
    return { totalScore: 0, matchedItems: [], categoryMatch: false };
  }

  // Calculate item matches
  for (const reqItem of requirement.items) {
    const donatedItem = donation.itemsDonated.find(item => item.name === reqItem.name);
    
    if (donatedItem) {
      const matchedQuantity = Math.min(reqItem.quantity, donatedItem.quantity);
      const itemScore = matchedQuantity * 2; // 2 points per matched item
      
      matchedItems.push({
        itemName: reqItem.name,
        requiredQuantity: reqItem.quantity,
        donatedQuantity: donatedItem.quantity,
        matchedQuantity: matchedQuantity,
        itemScore: itemScore
      });
      
      totalScore += itemScore;
    }
  }

  return {
    totalScore,
    matchedItems,
    categoryMatch,
    matchPercentage: (matchedItems.length / requirement.items.length) * 100
  };
};

// Get all requirements
exports.getAllRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.find()
      .populate("receiver", "name email phone address")
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: requirements.length,
      data: requirements
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching requirements",
      error: error.message
    });
  }
};

// Get all donations
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("donor", "name email phone")
      .populate("receiver", "name email phone address")
      .populate("requirement", "category items")
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching donations",
      error: error.message
    });
  }
};

// Get all matches
exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Matching.find()
      .populate("requirement", "category items createdAt")
      .populate("donation", "itemsDonated status createdAt")
      .populate("receiver", "name email phone address")
      .populate("donor", "name email phone")
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: matches.length,
      data: matches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching matches",
      error: error.message
    });
  }
};

// Get matches by status
exports.getMatchesByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    
    if (!["pending", "approved", "disapproved"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be pending, approved, or disapproved"
      });
    }

    const matches = await Matching.find({ status })
      .populate("requirement", "category items createdAt")
      .populate("donation", "itemsDonated status createdAt")
      .populate("receiver", "name email phone address")
      .populate("donor", "name email phone")
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: matches.length,
      status: status,
      data: matches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error fetching ${req.params.status} matches`,
      error: error.message
    });
  }
};

// Create match between requirement and donation
exports.createMatch = async (req, res) => {
  try {
    const { requirementId, donationId } = req.body;
    
    if (!requirementId || !donationId) {
      return res.status(400).json({
        success: false,
        message: "Requirement ID and Donation ID are required"
      });
    }

    const requirement = await Requirement.findById(requirementId).populate("receiver");
    const donation = await Donation.findById(donationId).populate("donor");
    
    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: "Requirement not found"
      });
    }

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found"
      });
    }

    // Check if match already exists
    const existingMatch = await Matching.findOne({
      requirement: requirementId,
      donation: donationId
    });

    if (existingMatch) {
      return res.status(400).json({
        success: false,
        message: "Match already exists between this requirement and donation"
      });
    }

    // Calculate match score
    const matchResult = calculateMatchScore(requirement, donation);
    
    if (matchResult.totalScore === 0) {
      return res.status(400).json({
        success: false,
        message: "No matching items found between requirement and donation",
        details: "Categories or items do not match"
      });
    }

    const match = new Matching({
      requirement: requirementId,
      donation: donationId,
      receiver: requirement.receiver._id,
      donor: donation.donor._id,
      matchedItems: matchResult.matchedItems,
      category: requirement.category,
      matchScore: matchResult.totalScore,
      status: "pending"
    });
    
    await match.save();
    
    // Populate the created match
    await match.populate([
      { path: "requirement", select: "category items createdAt" },
      { path: "donation", select: "itemsDonated status createdAt" },
      { path: "receiver", select: "name email phone address" },
      { path: "donor", select: "name email phone" }
    ]);

    res.status(201).json({
      success: true,
      message: "Match created successfully",
      data: match,
      matchDetails: {
        score: matchResult.totalScore,
        matchPercentage: matchResult.matchPercentage,
        itemsMatched: matchResult.matchedItems.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating match",
      error: error.message
    });
  }
};

// Find potential matches
exports.findPotentialMatches = async (req, res) => {
  try {
    const requirements = await Requirement.find().populate("receiver", "name email phone address");
    const availableDonations = await Donation.find({ 
      status: "pending" 
    }).populate("donor", "name email phone");

    const potentialMatches = [];

    for (const requirement of requirements) {
      for (const donation of availableDonations) {
        // Check if match already exists
        const existingMatch = await Matching.findOne({
          requirement: requirement._id,
          donation: donation._id
        });

        if (!existingMatch) {
          const matchResult = calculateMatchScore(requirement, donation);
          
          if (matchResult.totalScore > 0) {
            potentialMatches.push({
              requirement,
              donation,
              matchScore: matchResult.totalScore,
              matchPercentage: matchResult.matchPercentage,
              matchedItems: matchResult.matchedItems,
              category: requirement.category,
              priority: matchResult.totalScore >= 20 ? "high" : matchResult.totalScore >= 10 ? "medium" : "low"
            });
          }
        }
      }
    }

    // Sort by match score (highest first)
    potentialMatches.sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json({
      success: true,
      count: potentialMatches.length,
      message: `Found ${potentialMatches.length} potential matches`,
      data: potentialMatches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error finding potential matches",
      error: error.message
    });
  }
};

// Approve match
exports.approveMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminNotes, adminId } = req.body;
    
    const match = await Matching.findById(id);
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found"
      });
    }

    if (match.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Match is already ${match.status}`
      });
    }

    const updatedMatch = await Matching.findByIdAndUpdate(
      id,
      {
        status: "approved",
        adminNotes: adminNotes || "",
        reviewedAt: new Date(),
        reviewedBy: adminId || null
      },
      { new: true }
    ).populate([
      { path: "requirement", select: "category items createdAt" },
      { path: "donation", select: "itemsDonated status createdAt" },
      { path: "receiver", select: "name email phone address" },
      { path: "donor", select: "name email phone" },
      { path: "reviewedBy", select: "name email" }
    ]);
    
    // Update donation status to accepted
    await Donation.findByIdAndUpdate(match.donation, { status: "accepted" });
    
    res.status(200).json({
      success: true,
      message: "Match approved successfully",
      data: updatedMatch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error approving match",
      error: error.message
    });
  }
};

// Disapprove match
exports.disapproveMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminNotes, adminId } = req.body;
    
    const match = await Matching.findById(id);
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found"
      });
    }

    if (match.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Match is already ${match.status}`
      });
    }

    const updatedMatch = await Matching.findByIdAndUpdate(
      id,
      {
        status: "disapproved",
        adminNotes: adminNotes || "",
        reviewedAt: new Date(),
        reviewedBy: adminId || null
      },
      { new: true }
    ).populate([
      { path: "requirement", select: "category items createdAt" },
      { path: "donation", select: "itemsDonated status createdAt" },
      { path: "receiver", select: "name email phone address" },
      { path: "donor", select: "name email phone" },
      { path: "reviewedBy", select: "name email" }
    ]);
    
    res.status(200).json({
      success: true,
      message: "Match disapproved successfully",
      data: updatedMatch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error disapproving match",
      error: error.message
    });
  }
};

// Bulk approve matches
exports.bulkApproveMatches = async (req, res) => {
  try {
    const { matchIds, adminNotes, adminId } = req.body;
    
    if (!matchIds || !Array.isArray(matchIds) || matchIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Match IDs array is required"
      });
    }

    const results = await Promise.all(
      matchIds.map(async (id) => {
        try {
          const match = await Matching.findById(id);
          
          if (!match) {
            return { id, success: false, error: "Match not found" };
          }

          if (match.status !== "pending") {
            return { id, success: false, error: `Match is already ${match.status}` };
          }

          await Matching.findByIdAndUpdate(id, {
            status: "approved",
            adminNotes: adminNotes || "",
            reviewedAt: new Date(),
            reviewedBy: adminId || null
          });
          
          // Update donation status
          await Donation.findByIdAndUpdate(match.donation, { status: "accepted" });
          
          return { id, success: true };
        } catch (error) {
          return { id, success: false, error: error.message };
        }
      })
    );
    
    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;

    res.status(200).json({ 
      success: true,
      message: `Bulk approval completed: ${successCount} approved, ${failureCount} failed`,
      results,
      summary: {
        total: matchIds.length,
        approved: successCount,
        failed: failureCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in bulk approval",
      error: error.message
    });
  }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalRequirements,
      totalDonations,
      totalMatches,
      pendingMatches,
      approvedMatches,
      disapprovedMatches,
      pendingDonations,
      acceptedDonations,
      completedDonations
    ] = await Promise.all([
      Requirement.countDocuments(),
      Donation.countDocuments(),
      Matching.countDocuments(),
      Matching.countDocuments({ status: "pending" }),
      Matching.countDocuments({ status: "approved" }),
      Matching.countDocuments({ status: "disapproved" }),
      Donation.countDocuments({ status: "pending" }),
      Donation.countDocuments({ status: "accepted" }),
      Donation.countDocuments({ status: "completed" })
    ]);

    // Calculate category-wise statistics
    const educationalRequirements = await Requirement.countDocuments({ category: "educational" });
    const clothesRequirements = await Requirement.countDocuments({ category: "clothes" });
    
    const educationalMatches = await Matching.countDocuments({ category: "educational" });
    const clothesMatches = await Matching.countDocuments({ category: "clothes" });

    const approvalRate = totalMatches > 0 ? ((approvedMatches / totalMatches) * 100).toFixed(2) : 0;
    const matchingRate = totalRequirements > 0 ? ((totalMatches / totalRequirements) * 100).toFixed(2) : 0;

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalRequirements,
          totalDonations,
          totalMatches,
          pendingMatches,
          approvedMatches,
          disapprovedMatches
        },
        donations: {
          total: totalDonations,
          pending: pendingDonations,
          accepted: acceptedDonations,
          completed: completedDonations
        },
        categories: {
          educational: {
            requirements: educationalRequirements,
            matches: educationalMatches
          },
          clothes: {
            requirements: clothesRequirements,
            matches: clothesMatches
          }
        },
        metrics: {
          approvalRate: parseFloat(approvalRate),
          matchingRate: parseFloat(matchingRate),
          avgMatchScore: totalMatches > 0 ? await Matching.aggregate([
            { $group: { _id: null, avgScore: { $avg: "$matchScore" } } }
          ]).then(result => result[0]?.avgScore?.toFixed(2) || 0) : 0
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard statistics",
      error: error.message
    });
  }
};

// Search functionality
exports.searchData = async (req, res) => {
  try {
    const { query, type } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      });
    }

    let results = {
      requirements: [],
      donations: [],
      matches: []
    };
    
    const searchRegex = { $regex: query, $options: "i" };
    
    if (type === 'requirement' || !type) {
      results.requirements = await Requirement.find({
        $or: [
          { "items.name": searchRegex },
          { category: searchRegex }
        ]
      }).populate("receiver", "name email phone");
    }
    
    if (type === 'donation' || !type) {
      results.donations = await Donation.find({
        $or: [
          { "itemsDonated.name": searchRegex },
          { status: searchRegex }
        ]
      }).populate("donor", "name email phone").populate("receiver", "name email");
    }
    
    if (type === 'match' || !type) {
      results.matches = await Matching.find({
        $or: [
          { status: searchRegex },
          { category: searchRegex },
          { "matchedItems.itemName": searchRegex }
        ]
      })
      .populate("requirement", "category items")
      .populate("donation", "itemsDonated status")
      .populate("receiver", "name email")
      .populate("donor", "name email");
    }
    
    const totalResults = results.requirements.length + results.donations.length + results.matches.length;

    res.status(200).json({
      success: true,
      query: query,
      type: type || 'all',
      totalResults,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching data",
      error: error.message
    });
  }
};