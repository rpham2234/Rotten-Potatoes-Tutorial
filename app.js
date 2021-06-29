const express = require('express')
const app = express()

//to use handlebars
var exphbs = require('express-handlebars');

//we need mongoDB lol
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/rotten-potatoes', { useNewUrlParser: true, useUnifiedTopology: true });

const reviews = mongoose.model("Review", {
  title: String,
  movieTitle: String
})

/* OUR MOCK ARRAY OF PROJECTS
let reviews = [
    { title: "Great Review", movieTitle: "Batman II" },
    { title: "Awesome Movie", movieTitle: "Titanic" },
    {title: "Too many bee puns", movieTitle: "The Bee Movie"}
  ]
*/
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/*/Routes
app.get('/', (req, res) => {
    res.render('home', { msg: 'Handlebars are Cool!' });
  })
*/
app.get('/', (req, res) => {
    res.render("reviews-index", {reviews: reviews});
})

reviews.find()
  .then(review => {

  })
  .catch(err => {

  });

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})