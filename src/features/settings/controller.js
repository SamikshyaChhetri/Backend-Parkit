import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { prisma } from "../auth/register/controller.js";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MESSAGINGSENDERID,
};
const app = initializeApp(firebaseConfig);

export const updateProfileController = async (req, res) => {
  try {
    const { name, address, country, phone, gender, zipcode } = req.body;

    const updatedData = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        name,
        address,
        country,
        phone,
        gender,
        zipcode,
      },
    });
    return res.status(200).send({
      success: true,
      data: updatedData,
      message: "User updated successfully",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
export const updateImageController = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const avatar = req.files.avatar;
    if (!avatar) {
      return res.status(400).send({
        success: false,
        message: "Photo is required",
        data: [],
        error: [],
      });
    }
    const storage = getStorage();

    // Create a storage reference (filepath or filename in which file is to be uploaded)
    const storageRef = ref(storage, `${avatar.name}`); // making unique file name

    // prepare metadata
    const metadata = {
      contentType: avatar.mimetype,
    };

    // Upload the file using the prepared data
    const uploadedFile = await uploadBytesResumable(
      storageRef,
      avatar.data,
      metadata
    );
    const URL = await getDownloadURL(uploadedFile.ref);
    const updateImage = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: URL,
      },
    });
    return res.status(201).send({
      success: true,
      data: updateImage,
      message: "Avatar updated successfully",
      error: [],
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      data: [],
      message: "Internal server error",
      error: err,
    });
  }
};
