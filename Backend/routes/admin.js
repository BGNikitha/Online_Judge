const express = require("express") ;
const router = express.Router();
const authenticate = require("../middleware/auth") ;
const checkAdmin = require("../middleware/checkAdmin") ;
const adminControllers = require("../controllers/adminController") ;


router.use(authenticate) ;
router.use(checkAdmin) ;


router.get( '/' , adminControllers.admin ) ;
router.post(`/create` , adminControllers.create ) ;
router.put(`/edit/:id` , adminControllers.edit ) ;
router.delete('/delete/:id' , adminControllers.deleteProblem ) ;


module.exports = router ;