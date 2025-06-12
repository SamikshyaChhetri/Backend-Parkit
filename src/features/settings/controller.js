import { prisma } from "../auth/register/controller";

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, address, country, phone, gender, zipcode } = req.body;
    const findEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (findEmail) {
      return res.status(403).send({
        success: false,
        data: [],
        message: "Email already exists",
        error: [],
      });
    }
    const updatedData = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        name,
        email,
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
