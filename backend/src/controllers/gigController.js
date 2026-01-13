import Gig from '../models/Gig.js';

export const getAllGigs = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = { status: 'open' };

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const gigs = await Gig.find(filter)
      .populate('ownerId', 'name email')
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate('ownerId', 'name email');
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ ownerId: req.userId })
      .populate('ownerId', 'name email')
      .sort({ createdAt: -1 });
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    const gig = new Gig({
      title,
      description,
      budget,
      ownerId: req.userId
    });

    await gig.save();
    await gig.populate('ownerId', 'name email');

    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
