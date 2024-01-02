import express  from "express"
const router = express.Router()
import { authUser,getUserProfile } from "../controllers/userController.js" 
import { protect } from "../middleware/authMiddleWare.js"
import { registerUser } from "../controllers/userController.js"

router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile)
router.route('/').post(registerUser)

//router.route('/:id').get(getProductById)


export default router