import AppError from "../../utils/appError.js";
import Task from "../task/task.model.js";
import Offer from "./offer.model.js";

// Submit an offer
const createOfferService = async (taskId, jobSeekerId, payload) => {

  const task = await Task.findById(taskId);

  if (!task) throw new AppError(404, "Task not found");

  // Prevent  from making offers on their own tasks
  if (String(task.createdBy) === String(jobSeekerId)) {
    throw new AppError(403,"You cannot make an offer on your own task");
  }

  const offer = await Offer.create({
    task : taskId,
    jobSeeker : jobSeekerId,
    ...payload,
  });

  return offer;
};

// Get all offers for a task(only task owner can get offers)
const getOffersForTaskService = async (taskId) => {
  const offers = await Offer.find({ task : taskId })
    .populate("jobSeeker", "name email")
    .sort({ createdAt: -1 });

  return offers;
};

// Accept offer (only client can accept offer)
export const acceptOfferService = async (offerId, clientId) => {
  const offer = await Offer.findById(offerId).populate("task");
  if (!offer) throw new AppError(404,"Offer not found");

  if (String(offer.task.createdBy) !== String(clientId)) {
    throw new AppError(403, "Not authorized to accept this offer");
  }

  offer.status = "accepted";
  await offer.save();

  // Update task assignment
  await Task.findByIdAndUpdate(offer.task._id, {
    assignedTo: offer.jobSeeker,
    status: "assigned",
  });

  return offer;
};

// Reject offer (only client can reject an offer)
export const rejectOfferService = async (offerId, clientId) => {
  const offer = await Offer.findById(offerId).populate("task");
  if (!offer) throw new AppError(404,"Offer not found");

  if (String(offer.task.createdBy) !== String(clientId)) {
    throw new AppError(403,"Not authorized to reject this offer");
  }

  offer.status = "rejected";
  await offer.save();

  return offer;
};


export const offerservices ={
    createOfferService,
    getOffersForTaskService,
    acceptOfferService,
    rejectOfferService
}