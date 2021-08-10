

const router = require("express").Router();

const passport = require("passport");

const {isAuth,isVoter} = require("../middlewares/auth.middleware");

const controller = require("../controllers/main.controller");


router.get("/admin/login",controller.gAdminLogin);

router.get("/admin/dashboard",isAuth(),controller.adminDashboard);

router.get("/admin/candidate",isAuth(),controller.adminCandidate);

router.get("/admin/votes",isAuth(),controller.adminVotes);

router.get("/admin/voters",isAuth(),controller.adminVoters);

router.get("/admin/ballot",isAuth(),controller.adminBallot);


router.get("/login",controller.gLogin);

router.get("/dashboard",isVoter(),controller.gDashboard);

router.get("/logout",controller.logout);



module.exports = router;