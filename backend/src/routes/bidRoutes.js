import express from 'express';
import { createBid, getBidsByGig, hireBid, getMyBids } from '../controllers/bidController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticate, createBid);
router.get('/my-bids', authenticate, getMyBids);
router.get('/:gigId', authenticate, getBidsByGig);
router.patch('/:bidId/hire', authenticate, hireBid);

export default router;
