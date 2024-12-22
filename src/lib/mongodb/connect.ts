import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";
require("dotenv").config();

const Data_Base_Uri = process.env.MONGODB_URI;

if (!Data_Base_Uri) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version.
const client = new MongoClient(Data_Base_Uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
} as MongoClientOptions);

interface DocumentSchema {
  objectID: 0;
  museumID: "";
  accessionNumber: "";
  accessionYear: "";
  isPublicDomain: true;
  objectType: "Painting";
  objectTitle: "";
  medium: "Oil on canvas";
  primaryImage: "";
  primaryImageSmall: "";
  constituentULAN_URL: "";
  constituentWikidata_URL: "";
  dimensions: "";
  objectDate: "";
  artistName: "";
  artistDisplayBio: "";
  artistNationality: "";
  artistBeginDate: "";
  artistEndDate: "";
  artistWikidata_URL: "";
  artistULAN_URL: "";
  culture: "";
  creditLine: "";
  repository: "Metropolitan Museum of Art, New York, NY";
  objectURL: "";
  GalleryNumber: "";
  metadataDate: "2024-12-21";
}

export async function connectToDatabase() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment 🎉. You successfully connected to MongoDB!"
    );
    return client
  } catch (error) {
    console.error("Error connecting to the Database Client");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

