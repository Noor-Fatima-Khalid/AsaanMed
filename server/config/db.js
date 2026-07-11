import mongoose from "mongoose"

const connectDB = async () => {
    mongoose.connection.on('connection', ()=>console.log("DB connected"))
    await mongoose.connect (`${process.env.MONGO_URI}/AsaanMed`)
}

export default connectDB