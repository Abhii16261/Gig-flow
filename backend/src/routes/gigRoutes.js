import express from 'express';
import { getAllGigs, createGig, getMyGigs, getGigById } from '../controllers/gigController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getAllGigs);
router.get('/my-gigs', authenticate, getMyGigs);
router.get('/:id', getGigById);
router.post('/', authenticate, createGig);

export default router;
