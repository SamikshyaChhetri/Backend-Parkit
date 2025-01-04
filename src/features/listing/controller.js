import { prisma } from "../auth/register/controller.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
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
    const { photo } = req.files;
    // const photo=req.files.photo
    if (!photo) {
      return res.send({
        success: false,
        message: "Photo is required",
        data: [],
        error: [],
      });
    }
    console.log(photo);

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
