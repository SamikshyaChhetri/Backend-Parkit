import { createTransport } from "nodemailer";

const sendOTPcontroller = () => {
  try {
    const transporter = createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.NODE_EMAIL,
        pass: process.env.NODE_PASS,
      },
    });

    transporter.sendMail({
      from: process.env.NODE_EMAIL,
      to: "samikxyaxettri@gmail.com",
      subject: "This is a test email",
      text: "This is a test email",
    });
  } catch (error) {
    console.log(error);
  }
};
