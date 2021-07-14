

//Our routes. it takes an app parameter which is our controller.
module.exports = (app) => {

  const Review = require('../models/review');
  const Comment = require('../models/comment')
  const moment = require("moment")

  //Routes
  /* Test page
  app.get('/', (req, res) => {
      res.render('home', { msg: 'Handlebars are Cool!' });
    })
  */
  //Homepage
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
    console.log(req.params.id)
    //finds the review
    Review.findById(req.params.id).lean().then((review) => {
      let createdAt = review.createdAt;
      review.createdAtFormatted = moment(createdAt).format("MM/DD/yyyy, HH:mm")
      Comment.find({ reviewId: req.params.id }).lean().then(comments => {
        // respond with the template with both values
        comments.createdAtFormat = moment(comments.createdAt).format("MM/DD/yyyy, HH:mm")
        res.render('reviews-show', { review: review, comments: comments })
        console.log(comments)
      })
    }).catch((err) => {
      console.log(err.message);
    })
  });

  // edit existing reviews
  app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id).lean().then((review) => {
      res.render('reviews-edit', {review: review, title: "Edit Review"});
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

  // DELETE
  app.delete('/reviews/:id', (req,res) => {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).lean().then((review) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })
  
  }