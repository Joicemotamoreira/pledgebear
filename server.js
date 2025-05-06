const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
// Configure body-parser to handle JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./')); // Serve all static files from the current directory

// Mailgun configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.eu.mailgun.org',
  port: 587,
  secure: false,
  auth: {
    user: 'contactform@mg.eu.pledgebear.com',
    pass: process.env.MAILGUN_SMTP_PASSWORD || 'your-smtp-password-here' // Fallback for testing
  },
  tls: {
    rejectUnauthorized: false // Only for testing, remove in production
  }
});

// Verify SMTP connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log('SMTP Configuration Error:', error);
  } else {
    console.log('SMTP Server is ready to take our messages');
  }
});

// Contact form endpoint
app.post('/send-email', async (req, res) => {
  console.log('Received request body:', req.body); // Debug log

  if (!req.body || !req.body.name || !req.body.email || !req.body.subject || !req.body.message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required fields' 
    });
  }

  const { name, email, subject, message } = req.body;

  try {
    // Email options
    const mailOptions = {
      from: 'contactform@mg.eu.pledgebear.com',
      to: 'joice@flip-pay.com', // Test email
      subject: `Contact Form: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    console.log('Attempting to send email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve other HTML pages
app.get('/:page', (req, res) => {
  const page = req.params.page;
  if (page.endsWith('.html')) {
    res.sendFile(path.join(__dirname, page));
  } else {
    res.sendFile(path.join(__dirname, `${page}.html`));
  }
});

// Handle favicon request
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No content
});

const PORT = 80; // Use port 80 for the main server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 