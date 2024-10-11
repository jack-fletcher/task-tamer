const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function get_all_badge_data()
{
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const database = await client.db("task-tamer");
    const collection = database.collection("badge_data");
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const cursor = await collection.find();
    const badge_data = await cursor.toArray();
    await client.close();
    return(badge_data);
}