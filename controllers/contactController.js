const ContactUs = require("../models/contact");
const nodemailer = require("nodemailer");

// @desc    Send contact us message

exports.submitContact = async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ msg: "Please fill in all fields" });
    }

    try {
        // Create a new contact us message
        const contactUsMessage = new ContactUs({
            name,
            email,
            subject,
            message,
        });

        await contactUsMessage.save();

        // Send email notification
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            subject: `Contact Form: ${subject}`,
            text: `You have received a new message from ${name} (${email}):\n\n${message}`,
        });

        res.status(200).json({ msg: "Message sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error", error });
    }
}