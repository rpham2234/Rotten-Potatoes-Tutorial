//Initialize all the frameworks we'll need for this project

const express = require('express') // express.js
const app = express() 
const bodyParser = require('body-parser') //body-parser (Express.js module to read data submitted in forms.)
var exphbs = require('express-handlebars'); //handlebars
const mongoose = require("mongoose"); //Express.js requires this to communicate with MongoDB

//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rotten-potatoes', { useNewUrlParser: true, useUnifiedTopology: true });


// this will contain our form data, and we'll submit it to MongoDB
app.use(bodyParser.urlencoded({ extended: true }));

//MongoDB model. This is like a class, or a template to store our form data on MongoDB
const reviews = mongoose.model("Review", {
  title: String,
  movieTitle: String,
  description: String,
  rating: Number
})

/* OUR MOCK ARRAY OF PROJECTS
let reviews = [
    { title: "Great Review", movieTitle: "Batman II" },
    { title: "Awesome Movie", movieTitle: "Titanic" },
    {title: "Too many bee puns", movieTitle: "The Bee Movie"}
  ]
*/
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Routes

/*app.get('/', (req, res) => {
    res.render('home', { msg: 'Handlebars are Cool!' });
  })
*/
app.get('/', (req, res) => {
    res.render("reviews-index", {reviews: reviews});
})

app.get('/reviews/new', (req, res) => {
  res.render("reviews-new", {});
})

//create
app.post('/reviews', (req, res) => {
  console.log(req.body); //contents that will be put in the model instance
  reviews.create(req.body).then((review) => {
    console.log(reviews); //logs the model instance itself.
    res.redirect("/");
  }).catch((err) => {
    console.log(err.message);
  })
  // res.render('reviews-new', {});
})

// SHOW
app.get('/reviews/:id', (req, res) => {
  res.send("im a review")
  reviews.findById(req.params.id).then((reviews) => {
    res.render("reviews-show", {review: reviews})
  }).catch((err) => {
    console.log(err.message);
  })
});

reviews.find()
  .then(review => {

  })
  .catch(err => {

  });

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})