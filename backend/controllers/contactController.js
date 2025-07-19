import ContactMessage from '../model/ContactMessage.js';
import transporter from '../config/nodemailer.js';

export const handleContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Debug logs to make sure credentials are loaded
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✔️ Loaded' : '❌ Missing');

    // Save to MongoDB
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();
    console.log('✅ Message saved:', newMessage);

    // Send email
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`, // Use a clear sender name
      to: process.env.EMAIL_USER, // Always to you
      replyTo: email, // User's email
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('❌ Error in handleContact:', err);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
};
