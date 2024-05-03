// Import necessary modules
import express from 'express'; // Import Express framework for building the server
import cors from 'cors'; // Import CORS module to allow cross-origin resource sharing
import dotenv from 'dotenv'; // Import dotenv to read environment variables from .env files
import dbConnect from './config/mongoose.config.js'; // Import function to connect to database
import router from './routes/trade.routes.js';
import yahooRouter from './routes/yahoo.routes.js';
// import yahooRouter from './routes/yahoo.routes.js';
import ToDoRouter from './routes/toDo.routes.js';


// Connect to the database
dbConnect();

// Create an instance of the Express application
const app = express();

// Parse JSON requests and use CORS to enable cross-origin requests
app.use(express.json(), cors());

// Load environment variables from .env file
dotenv.config();

// Use the router middleware for handling API routes under /api prefix
app.use('/api', router)
// app.use('/api', yahooRouter)
app.use('/api', yahooRouter)
// app.use('/api', ToDoRouter)
app.use('/api', ToDoRouter)


// Start the server and listen on specified port from environment variables
const PORT = process.env.PORT;
app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);
