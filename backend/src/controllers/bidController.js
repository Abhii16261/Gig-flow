import Bid from '../models/Bid.js';
import Gig from '../models/Gig.js';
import mongoose from 'mongoose';

export const createBid = async (req, res) => {
  try {
    const { gigId, message } = req.body;

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    if (gig.status !== 'open') {
      return res.status(400).json({ message: 'Gig is not open for bidding' });
    }

    if (gig.ownerId.toString() === req.userId) {
      return res.status(400).json({ message: 'Cannot bid on your own gig' });
    }

    const existingBid = await Bid.findOne({ gigId, freelancerId: req.userId });
    if (existingBid) {
      return res.status(400).json({ message: 'You have already bid on this gig' });
    }

    const bid = new Bid({
      gigId,
      freelancerId: req.userId,
      message
    });

    await bid.save();
    await bid.populate('freelancerId', 'name email');

    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBidsByGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    if (gig.ownerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Only gig owner can view bids' });
    }

    const bids = await Bid.find({ gigId })
      .populate('freelancerId', 'name email')
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({ freelancerId: req.userId })
      .populate('gigId', 'title budget')
      .sort({ createdAt: -1 });
    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId).session(session);
    if (!bid) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Bid not found' });
    }

    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Gig not found' });
    }

    if (gig.ownerId.toString() !== req.userId) {
      await session.abortTransaction();
      return res.status(403).json({ message: 'Only gig owner can hire' });
    }

    if (gig.status === 'assigned') {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Gig is already assigned' });
    }

    if (bid.status !== 'pending') {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Bid is not pending' });
    }

    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bidId } },
      { $set: { status: 'rejected' } },
      { session }
    );

    bid.status = 'hired';
    await bid.save({ session });

    gig.status = 'assigned';
    await gig.save({ session });

    await session.commitTransaction();

    await bid.populate('freelancerId', 'name email');
    await gig.populate('ownerId', 'name email');

    const { io } = await import('../../server.js');
    io.emit(`notification:${bid.freelancerId._id}`, {
      type: 'hired',
      message: `You have been hired for ${gig.title}!`,
      gigId: gig._id,
      bidId: bid._id
    });

    res.json({ bid, gig });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};
