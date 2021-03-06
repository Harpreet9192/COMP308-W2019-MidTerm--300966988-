// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    res.render('books/details', {
      title:'A new book',
      books:book
    });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
// Create an object and then add the data to model
    let abook =book({
      "Title" : req.body.title,
      "Price" : req.body.price,
      "Author" : req.body.author,
      "Genre" : req.body.genre
    });
    book.create(abook, (err, b) => {
      if(err) {
        console.log(err);
        res.end(err);
      }
      else {
        res.redirect('/books');
      }
    });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
 //Get the book details by id
  book.findById(id, (err, bookobj) => {
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.render('books/details',{
        title:"Edit book",
        books:bookobj
      });
    }
  });
    
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let id = req.params.id;

  let update = book({
    "_id" : id,
    "Title" : req.body.title,
    "Price" : req.body.price,
    "Author" : req.body.author,
    "Genre" : req.body.genre
  });
  //Update the collection by matching the id of the selected item
  book.update({_id : id},update,(err) =>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/books');
      
    }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id= req.params.id;
  //Remove the item by using id
  book.remove({_id :id},(err) =>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/books');
    }
  });

    
});


module.exports = router;
