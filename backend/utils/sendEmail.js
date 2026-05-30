const nodemailer = require("nodemailer");

// Create Email Transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Email Function
const sendEmail = async ({
  email,
  subject,
  message,
  html,
}) => {
  try {
    const mailOptions = {
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: email,
      subject,
      text: message,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`Email sent: ${info.messageId}`);

    return info;
  } catch (error) {
    console.error(`Email Error: ${error.message}`);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;