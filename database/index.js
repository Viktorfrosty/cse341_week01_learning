require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.DBURL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function databaseBridge(requirement) {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    switch (requirement) {
      case "handshake": {
        // Send a ping to confirm a successful connection
        await client
          .db("admin")
          .command({ ping: 1 })
          .then(console.log("Handshake successful. connection to MongoDB stablished."));
        return "Bridge stablished";
      }
      case "request": {
        // Access the database and collection
        const professional = await client
          .db("cse_341")
          .collection("week_01")
          .findOne({ _id: new ObjectId("67815cc3e9d7c86e18a59ab1") })
          .then(console.log("request stablished. data from MongoDB fetched."));
        return professional[0];
      }
    }
  } catch (error) {
    console.error(error);
    return `An error occurred: ${error.message}`;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = { databaseBridge };
