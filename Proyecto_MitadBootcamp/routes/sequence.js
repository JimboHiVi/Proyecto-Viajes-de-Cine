const express = require('express');
const router = express.Router();
const SequenceController = require('../controllers/sequenceController');
const uploadFile = require('../middlewares/multer');

//localhost:3000/sequence
router.get('/', SequenceController.allSequences);

router.get('/createSeqForm/:place_id', SequenceController.createForm);

router.post('/createSequence/:place_id', uploadFile('sequences'), SequenceController.createSequence);

router.get('/logicDeleteSeq/:place_id/:sequence_id', SequenceController.logicDeleteSeq);

module.exports = router;