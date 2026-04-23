import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { getCurrentUser, getAllUsers, updateUserRole, makeAdmin } from "../controllers/user.controller.js"


const userRouter = express.Router()

userRouter.get("/current-user",isAuth,getCurrentUser)
userRouter.get("/all-users",isAuth,getAllUsers)
userRouter.patch("/:id/role",isAuth,updateUserRole)
userRouter.post("/make-admin",makeAdmin)  // Temporary - remove after use

export default userRouter