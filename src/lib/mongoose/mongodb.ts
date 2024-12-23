import mongoose, { mongo } from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

const MONGODB_URI: string = process.env.MONGODB_URI;

// This object will keep track of the connection status
interface GlobalMongoDB {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare the global variable
declare global {
  var mongoose: GlobalMongoDB;
}

// Initialize the global mongoose object
global.mongoose = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  if (global.mongoose.conn) {
    // Use existing connection if available
    console.log("Using existing connection");
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    // Set connection options
    const opts = {
      bufferCommands: false,
    };

    // Create new connection
    global.mongoose.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("New database connection established");
        return mongoose;
      });
  }

  try {
    // Wait for connection to be established
    global.mongoose.conn = await global.mongoose.promise;
    return global.mongoose.conn;
  } catch (error) {
    global.mongoose.promise = null;
    throw error;
  }
}

export default connectDB;
