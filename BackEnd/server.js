const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Middleware for CORS//
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Body parser middleware//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database connection function //
async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@martinscluster.w5rtkz0.mongodb.net/DB14?retryWrites=true&w=majority');
}

// Call the database connection function, handle any errors //
main().catch(err => console.log(err));

// Define the schema for the 'my_books' collection //
const bookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  author: String,
});

// Create a model for the 'my_books' collection//
const bookModel = mongoose.model('my_books', bookSchema);

// POST endpoint to create a new book
app.post('/api/book', (req, res) => {
  console.log(req.body);

  // Create a new book using the model //
  bookModel
    .create({
      title: req.body.title,
      cover: req.body.cover,
      author: req.body.author,
    })
    .then(() => {
      res.send('Book Created');
    })
    .catch(() => {
      res.send('Book NOT Created');
    });
});

// Sample root endpoint //
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET endpoint to fetch all books //
app.get('/api/books', async (req, res) => {
  let books = await bookModel.find({});
  res.json(books);
});

// GET endpoint to fetch a specific book by ID //
app.get('/api/book/:identifier', async (req, res) => {
  console.log(req.params.identifier);
  let book = await bookModel.findById(req.params.identifier);
  res.send(book);
});

// PUT endpoint to update a specific book by ID //
app.put('/api/book/:identifier', async (req, res) => {
  console.log('Edit: ' + req.params.identifier);
  let book = await bookModel.findByIdAndUpdate(req.params.identifier, req.body, { new: true });
  res.send(book);
});

// Start the server and listen on the specified port //
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
