import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

console.log('Testing login:', process.env.EMAIL_USER, process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify((err, success) => {
  if (err) {
    console.error('❌ SMTP failed:', err);
  } else {
    console.log('✅ SMTP works');
  }
});

export default transporter;