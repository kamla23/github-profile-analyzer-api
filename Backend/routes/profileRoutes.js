import express from 'express';
import { analyzeProfile, getAllProfiles, getProfileByUsername } from '../controllers/profileController.js';

const router = express.Router();

router.post('/profiles/:username', analyzeProfile); 
router.get('/profiles', getAllProfiles);            
router.get('/profiles/:username', getProfileByUsername); 

export default router;