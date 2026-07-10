import express from 'express'
import { addDoctor } from '../controllers/doctorcontroller'


const adminRouter = express.Router()

adminRouter.post('/add-doctor', upload.single('image'), addDoctor)