
const express = require("express")
const router = express.Router();

const {isAuth,isVoter} = require("../middlewares/auth.middleware");

const controller = require("../controllers/sub.controller");



router.post("/election",isAuth(),express.json(),controller.createElection);

router.post("/voter",isAuth(),express.json(),controller.createVoter);

router.post("/candidate",isAuth(),express.json(),controller.createCandidate);

router.post("/admin-votes",isAuth(),express.json(),controller.createAdminVotes);

router.post("/votes",isVoter(),express.json(),controller.createVotes);


module.exports = router;
