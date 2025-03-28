const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require("bcrypt");

const nodemailer = require('nodemailer'); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Service Booking Endpoint
app.post('/api/book-service', async (req, res) => {
  const { 
    firstName, 
    lastName, 
    email, 
    phoneNumber, 
    address, 
    city, 
    state, 
    zipCode,
    buildingType,
    serviceType,
    paymentMethod,
    completionDate,
    totalCost,
    problemDescription,

  } = req.body;

  try {
    const query = `
      INSERT INTO service_bookings (
        first_name, 
        last_name, 
        email, 
        phone_number, 
        address, 
        city, 
        state, 
        zip_code,
        building_type,
        service_type,
        payment_method,
        completion_date,
        total_cost,
        problem_description
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14)
      RETURNING *
    `;

    const values = [
      firstName, 
      lastName, 
      email, 
      phoneNumber, 
      address, 
      city, 
      state, 
      zipCode,
      buildingType,
      serviceType,
      paymentMethod,
      completionDate,
      totalCost,
      problemDescription,
    ];

    const result = await pool.query(query, values);

    const transporter = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: 'maintainease@gmail.com',
        pass: "apzftymkzjnquxgq"
      }
    });

    const mailOptions = {
      from: 'maintainease@gmail.com',
      to: email,
      subject: 'Service Booking Confirmation',
      text: `Hi ${firstName} ${lastName},

        Thank you for booking a service with us. Here are your booking details:

        Service Type: ${serviceType}
        Building Type: ${buildingType}
        Address: ${address}, ${city}, ${state} - ${zipCode}
        Problem Description: ${problemDescription}
        Completion Date: ${completionDate}
        Total Cost: $${totalCost}

        We will get back to you soon with further details.

        Best regards,
        Maintain Ease 
        `
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Email sending error:', err);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({
      success: true,
      message: 'Service booking created successfully. Confirmation Email Sent.',
      booking: result.rows[0]
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
});

app.get('/api/dashboard-stats', async (req, res) => {
  try {
    const totalCustomersResult = await pool.query('SELECT COUNT(*) FROM service_bookings');
    const totalEarningsResult = await pool.query('SELECT SUM(total_cost) FROM service_bookings');
    const completedServicesResult = await pool.query(
      'SELECT COUNT(*) FROM service_bookings WHERE completion_date < CURRENT_TIMESTAMP'
    );
    const estimatedProfitResult = await pool.query(
      'SELECT SUM(total_cost * 0.3) FROM service_bookings'  // Assuming 30% profit margin
    );

    res.json({
      totalCustomers: parseInt(totalCustomersResult.rows[0].count),
      totalEarnings: parseFloat(totalEarningsResult.rows[0].sum),
      completedServices: parseInt(completedServicesResult.rows[0].count),
      estimatedProfit: parseFloat(estimatedProfitResult.rows[0].sum)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Service bookings endpoint
app.get('/api/service-bookings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM service_bookings');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete service booking
app.delete('/api/service-bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM service_bookings WHERE id = $1', [id]);
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// API endpoint for login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      console.log("Invalid email or password");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Invalid email or password");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Insert a new user (email and password with bcrypt hashing) into the database only if not exists
const email = "admin@example.com"; // Your email
const password = "admin123"; // Your password

(async () => {
  try {
    // Check if the email already exists in the database
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (existingUser.rows.length > 0) {
      console.log("Admin user already exists, skipping insertion.");
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the user with the hashed password into the database
      await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashedPassword]);

      console.log("Admin user registered successfully");
    }
  } catch (error) {
    console.error("Error inserting user:", error);
  }
})();


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});