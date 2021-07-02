//Initialize all the frameworks we'll need for this project

const express = require('express') // express.js
const app = express() 
const bodyParser = require('body-parser') //body-parser (Express.js module to read data submitted in forms.)
var exphbs = require('express-handlebars'); //handlebars
const mongoose = require("mongoose"); //Express.js requires this to communicate with MongoDB
const methodOverride = require("method-override"); //intercepts our PUT requests.

//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rotten-potatoes', { useNewUrlParser: true, useUnifiedTopology: true });


// this will contain our form data, and we'll submit it to MongoDB
app.use(bodyParser.urlencoded({ extended: true }));

//this allows us to edit or delete existing data on MongoDB
app.use(methodOverride('_method'));

//MongoDB model. This is like a class, or a template to store our form data on MongoDB
const Review = mongoose.model("Review", {
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
  Review.find({}).lean()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

//opens a form to create the review
app.get('/reviews/new', (req, res) => {
  res.render("reviews-new", {title: "New Review"});
})

//saves review to the database.
app.post('/reviews', (req, res) => {
  console.log(req.body); //contents that will be put in the model instance
  Review.create(req.body).then((review) => {
    console.log(review); //logs the model instance itself.
    res.redirect(`/reviews/${review._id}`);
  }).catch((err) => {
    console.log(err.message);
  })
  // res.render('reviews-new', {});
})

//show single review
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).lean().then((review) => {
    res.render("reviews-show", {review: review})
  }).catch((err) => {
    console.log(err.message);
  })
});

// edit existing reviews
app.get('/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id).lean().then((review) => {
    res.render('reviews-edit', {review: review});
  })
})

// update reviews.
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body).lean() 
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})