const express = require("express") ;
const router = express.Router();
const compilerControllers = require("../controllers/compilerController") ; 


const authenticate = require("../middleware/auth") ;

router.post(`/run` , compilerControllers.run ) ;
router.post(`/submit/:id` , authenticate , compilerControllers.submit ) ;


module.exports = router ;