

module.exports = (app) => {
    const Comment = require('../models/comment')
    // NEW Comment
    // CREATE Comment
    app.post('/reviews/comments', (req, res) => {
        Comment.create(req.body).then((comment) => {
          console.log(comment)
          res.redirect(`/reviews/${comment.reviewId}`);
        }).catch((err) => {
          console.log(err.message);
        });
      });
  
  }