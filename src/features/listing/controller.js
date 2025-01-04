import { prisma } from "../auth/register/controller.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1IdlU5R0EufKwnmGPzRmzhY3Oo0SUhH4",
  authDomain: "parkify-1e3c7.firebaseapp.com",
  projectId: "parkify-1e3c7",
  storageBucket: "parkify-1e3c7.firebasestorage.app",
  messagingSenderId: "502106164865",
  appId: "1:502106164865:web:034a30b9b2198b2c2b0780",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const createListingController = async (req, res) => {
  try {
    const {
      city,
      street,
      country,
      zipcode,
      type,
      description,
      rating,
      price,
      noOfVehicle,
      ownerId,
    } = req.body;
    console.log(req.files);
    const createList = await prisma.listing.create({
      data: {
        city,
        street,
        country,
        zipcode,
        type,
        description,
        rating,
        price,
        noOfVehicle,
        ownerId,
      },
    });

    return res.status(201).send({
      success: true,
      data: createList,
      message: "List added successfully",
      error: [],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      data: [],
      message: "Internal server error",
      error: err,
    });
  }
};
export const getlistingsController = async (req, res) => {
  const all_list = await prisma.listing.findMany();
  return res.status(200).send({
    success: true,
    data: all_list,
    message: "All Listing retrived",
    error: [],
  });
};

export const getSingleListing = async (req, res) => {
  const listdata = await prisma.listing.findFirst({
    where: { id: req.params.id },
  });
  if (listdata) {
    return res.status(200).send({
      success: true,
      data: listdata,
      message: "Single listing retrieved",
      error: [],
    });
  }
  return res.status(404).send({
    success: false,
    data: [],
    message: "Listing not found",
    error: ["Listing not found"],
  });
};
