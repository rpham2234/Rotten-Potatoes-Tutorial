const express = require('express')
const app = express()

//to use handlebars
var exphbs = require('express-handlebars');

// OUR MOCK ARRAY OF PROJECTS
let reviews = [
    { title: "Great Review", movieTitle: "Batman II" },
    { title: "Awesome Movie", movieTitle: "Titanic" }
  ]

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

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})