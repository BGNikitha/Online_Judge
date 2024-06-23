const express = require("express") ;
const router = express.Router();
const HomeControllers = require("../controllers/HomeController") ;
const authenticate = require("../middleware/auth") ;


router.get( '/home' , HomeControllers.home ) ;
router.get ( '/problem/:id' , HomeControllers.problem ) ;
router.get ( '/submissionHistory/:id' , authenticate , HomeControllers.submissionHistory ) ;

module.exports = router ;