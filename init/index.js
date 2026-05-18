if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose=require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
main()
  .then(() => initDB())
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());

async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
  console.log("connected.");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj, index)=>({
    ...obj,
    owner:'68b91e52072038fbe9a812be',
    geometry: {
      type: "Point",
      // Seed needs a valid GeoJSON point; use deterministic coordinates.
      coordinates: [77.209 + index * 0.01, 28.6139 + index * 0.01],
    },
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};
