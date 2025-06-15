const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDB = require('./DB/db.js');
const cookieParser = require('cookie-parser');
const blogRoutes = require('./routes/blogRoutes');
const courseRoutes = require('./routes/courseRoutes');
const queryRoutes = require('./routes/queryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');


// Serve static files from the "public" folder
app.use(express.static('public'));

connectToDB();

app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:3000'], // Allow requests from both ports
  credentials: true, // Allow cookies and other credentials
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());








// Middleware to check if the path does not start with '/api'
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    // Send an HTML page with the meme image and the "Unauthorized access" text below it
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Unauthorized</title>
          <style>
            body {
              text-align: center;
              font-family: Arial, sans-serif;
              background-color: #0f0f0f;
              padding: 20px;
            }
            img {
              max-width: 90%;
              height: auto;
            }
            .message {
              margin-top: 20px;
              font-size: 24px;
              font-weight: bold;
              color: #ff0000;
              text-align: center;
              padding-bottom: 30px
            }
          </style>
        </head>
        <body>
        <div class="message">Bad Gateway</div>
        <img src="/meme.jpg" alt="Meme Image" />
        </body>
      </html>
    `);
  }
  next();
});


// Define routes you want to use starting with /api
app.use('/api/courses', courseRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);


module.exports = app;