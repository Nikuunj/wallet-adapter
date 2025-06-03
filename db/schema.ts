import mongoose, { Schema, model, models } from "mongoose";

const db_url = process.env.DB_CONNECTION || "mongodb://localhost:27017/mydatabase";

if (!mongoose.connections[0].readyState) {
    mongoose.connect(db_url);
}

const URI = new Schema({
    key: String,
    name: String,
    symbol: String,
    description: String,
    image: String
})

export const url_model = models.uris || model("uris", URI);