const asyncHandler = require("express-async-handler");
const { Donation } = require("../models/donationModel");
const { Requirement } = require("../models/requireModel");
const { Donor } = require("../models/donorModel");
const { Receiver } = require("../models/recieverModel");




// GET all requirements
const checkRequirements = asyncHandler(async (req, res) => {
  const requirements = await Requirement.find().populate("receiver", "name email");
  res.status(200).json(requirements);
});


// POST donation
const placeDonation = asyncHandler(async (req, res) => {
  const { donorId, receiverId, requirementId, itemsDonated } = req.body;




  const donor = await Donor.findById(donorId);
  if (!donor) return res.status(404).json({ message: "Donor not found" });




  const receiver = await Receiver.findById(receiverId);
  if (!receiver) return res.status(404).json({ message: "Receiver not found" });




  const requirement = await Requirement.findById(requirementId).populate("receiver", "name email");
  if (!requirement) return res.status(404).json({ message: "Requirement not found" });




  if (!req.files || req.files.length !== itemsDonated.length) {
    return res.status(400).json({ message: "All items must have an image" });
  }




  const itemsWithImages = itemsDonated.map((item, index) => ({
    ...item,
    image: req.files[index].path // server file path
  }));




  const donation = await Donation.create({
    donor: donor._id,
    receiver: receiver._id,
    requirement: requirement._id,
    itemsDonated: itemsWithImages,
  });


  res.status(201).json({
    message: "Donation placed successfully",
    donation,
  });
});


module.exports = {
  checkRequirements,
  placeDonation
};
