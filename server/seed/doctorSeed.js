import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";

import Doctor from "../models/doctor.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.join(__dirname, "../.env")
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

console.log (process.env.MONGO_URI)
await mongoose.connect(process.env.MONGO_URI);

const about =
    "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.";

const doctors = [
    {
        image: "doc1.png",
        name: "Dr. Richard James",
        email: "doctor1@gmail.com",
        speciality: "General physician",
        degree: "MBBS",
        experience: "4 Years",
        fees: 50,
        address: {
            line1: "17th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        }
    },
    {
        image: "doc2.png",
        name: "Dr. Emily Larson",
        email: "doctor2@gmail.com",
        speciality: "Gynecologist",
        degree: "MBBS",
        experience: "3 Years",
        fees: 60,
        address: {
            line1: "27th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        }
    },
    {
        image: "doc3.png",
        name: "Dr. Sarah Patel",
        email: "doctor3@gmail.com",
        speciality: "Dermatologist",
        degree: "MBBS",
        experience: "1 Years",
        fees: 30,
        address: {
            line1: "37th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        }
    },
    {
        image: "doc4.png",
        name: "Dr. Christopher Lee",
        email: "doctor4@gmail.com",
        speciality: "Pediatricians",
        degree: "MBBS",
        experience: "2 Years",
        fees: 40,
        address: {
            line1: "47th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        }
    },
    {
        image: "doc5.png",
        name: "Dr. Jennifer Garcia",
        email: "doctor5@gmail.com",
        speciality: "Neurologist",
        degree: "MBBS",
        experience: "4 Years",
        fees: 50,
        address: {
            line1: "57th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        }
    },
    {
        image: "doc6.png",
        name: "Dr. Andrew Williams",
        email: "doctor6@gmail.com",
        speciality: "Neurologist",
        degree: "MBBS",
        experience: "4 Years",
        fees: 50,
        address: {
            line1: "57th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        }
    },
    {
        image: "doc7.png",
        name: "Dr. Christopher Davis",
        email: "doctor7@gmail.com",
        speciality: "General physician",
        degree: "MBBS",
        experience: "4 Years",
        fees: 50,
        address: {
            line1: "17th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        }
    },
    {
        image: "doc8.png",
        name: "Dr. Timothy White",
        email: "doctor8@gmail.com",
        speciality: "Gynecologist",
        degree: "MBBS",
        experience: "3 Years",
        fees: 60,
        address: {
            line1: "27th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        }
    },
    {
        image: "doc9.png",
        name: "Dr. Ava Mitchell",
        email: "doctor9@gmail.com",
        speciality: "Dermatologist",
        degree: "MBBS",
        experience: "1 Years",
        fees: 30,
        address: {
            line1: "37th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        }
    },
    {
        image: "doc10.png",
        name: "Dr. Jeffrey King",
        email: "doctor10@gmail.com",
        speciality: "Pediatricians",
        degree: "MBBS",
        experience: "2 Years",
        fees: 40,
        address: {
            line1: "47th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        }
    },
    {
        image: "doc11.png",
        name: "Dr. Zoe Kelly",
        email: "doctor11@gmail.com",
        speciality: "Neurologist",
        degree: "MBBS",
        experience: "4 Years",
        fees: 50,
        address: {
            line1: "57th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        }
    },
    {
        image: "doc12.png",
        name: "Dr. Patrick Harris",
        email: "doctor12@gmail.com",
        speciality: "Neurologist",
        degree: "MBBS",
        experience: "4 Years",
        fees: 50,
        address: {
            line1: "57th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        }
    },
    {
        image: "doc13.png",
        name: "Dr. Chloe Evans",
        email: "doctor13@gmail.com",
        speciality: "General physician",
        degree: "MBBS",
        experience: "4 Years",
        fees: 50,
        address: {
            line1: "17th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        }
    },
    {
        image: "doc14.png",
        name: "Dr. Ryan Martinez",
        email: "doctor14@gmail.com",
        speciality: "Gynecologist",
        degree: "MBBS",
        experience: "3 Years",
        fees: 60,
        address: {
            line1: "27th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        }
    },
    {
        image: "doc15.png",
        name: "Dr. Amelia Hill",
        email: "doctor15@gmail.com",
        speciality: "Dermatologist",
        degree: "MBBS",
        experience: "1 Years",
        fees: 30,
        address: {
            line1: "37th Cross, Richmond",
            line2: "Circle, Ring Road, London"
        }
    }
];

const password = await bcrypt.hash("123456", 10);

await Doctor.deleteMany();

for (const doctor of doctors) {
    const imagePath = path.join(
        __dirname,
        "../../client/src/assets",
        doctor.image
    );

    console.log(`Uploading ${doctor.image}...`);

    const uploaded = await cloudinary.uploader.upload(imagePath, {
        folder: "doctors",
        public_id: doctor.image.replace(".png", ""),
        overwrite: true
    });

    await Doctor.create({
        name: doctor.name,
        email: doctor.email,
        password,
        image: uploaded.secure_url,
        speciality: doctor.speciality,
        degree: doctor.degree,
        experience: doctor.experience,
        about,
        fees: doctor.fees,
        address: doctor.address,
        date: Date.now()
    });

    console.log(`${doctor.name} inserted.`);
}

console.log("All doctors inserted successfully!");

await mongoose.disconnect();
process.exit(0);