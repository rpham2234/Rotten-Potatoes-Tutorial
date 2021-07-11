//init mongoDB
const mongoose = require("mongoose")

//MongoDB model. This is like a class, or a template to store our form data on MongoDB
const Review = mongoose.model("Review", {
    title: String,
    movieTitle: String,
    description: String,
    rating: Number
  })

//Exports model
module.exports = Review