//Initialize all the frameworks we'll need for this project

const express = require('express') // express.js
const app = express() 
const bodyParser = require('body-parser') //body-parser (Express.js module to read data submitted in forms.)
var exphbs = require('express-handlebars'); //handlebars
const mongoose = require("mongoose"); //Express.js requires this to communicate with MongoDB
const methodOverride = require("method-override"); //intercepts our PUT requests.

const port = process.env.PORT || 3000;

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://user:justmonika@rotten-potatoes.dfo9m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });


// this will contain our form data, and we'll submit it to MongoDB
app.use(bodyParser.urlencoded({ extended: true }));

//this allows us to edit or delete existing data on MongoDB
app.use(methodOverride('_method'));



//Locally added Modules. Our routes live here.
const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);
const movies = require('./controllers/movies')(app);

/* OUR MOCK ARRAY OF PROJECTS
let reviews = [
    { title: "Great Review", movieTitle: "Batman II" },
    { title: "Awesome Movie", movieTitle: "Titanic" },
    {title: "Too many bee puns", movieTitle: "The Bee Movie"}
  ]
*/
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})

module.exports = app;
