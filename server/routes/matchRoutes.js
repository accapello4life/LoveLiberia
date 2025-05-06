const express = require('express');
const { getMatches, getPotentialMatches, createMatch } = require('../controllers/matchController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', getMatches);
router.get('/potential', getPotentialMatches);
router.post('/', createMatch);

module.exports = router;
