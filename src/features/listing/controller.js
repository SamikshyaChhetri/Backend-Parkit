import { prisma } from "../auth/register/controller.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
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
  measurementId: process.env.MESSAGINGSENDERID,
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

    //get the storage service from firebase
    const storage = getStorage();

    // Create a storage reference (filepath or filename in which file is to be uploaded)
    const storageRef = ref(storage, `${ownerId}-${photo.name}`); // making unique file name

    // prepare metadata
    const metadata = {
      contentType: photo.mimetype,
    };

    // Upload the file using the prepared data
    const uploadedFile = await uploadBytesResumable(
      storageRef,
      photo.data,
      metadata
    );

    // Get the uploaded file URL
    const URL = await getDownloadURL(uploadedFile.ref);
    console.log(URL);
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
        photo: URL,
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
    include: { owner: true },
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

export const getUserListings = async (req, res) => {
  try {
    const userListings = await prisma.listing.findMany({
      where: { ownerId: req.params.ownerId },
    });
    return res.status(400).send({
      success: true,
      data: userListings,
      message: "Successfully fetched user's listings",
      error: [],
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      data: [],
      message: "Listings not found",
      error: ["Listings not found"],
    });
  }
};
//la vandeu k mistake vayexa
