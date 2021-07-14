//init mongoDB
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = mongoose.model('Comment', new Schema ({
  title: String,
  content: String,
  reviewId: { type: Schema.Types.ObjectId, ref: 'Review' }
},
{
  timestamps: true
}
))

module.exports = Comment;``