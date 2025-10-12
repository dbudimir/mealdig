import mongoose from 'mongoose';

mongoose.Promise = Promise;

let mongoURI = '';

// Use DB_URL from environment if available, otherwise default to localhost
if (process.env.DB_URL) {
  mongoURI = process.env.DB_URL;
} else if (process.env.NODE_ENV === 'production') {
  throw new Error('DB_URL must be defined in production');
} else {
  mongoURI = 'mongodb://localhost/qsr-order-api';
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(mongoURI, opts).then((mongooseInstance) => {
      console.log(`Connected to db: ${mongooseInstance.connections[0].name}`);
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
