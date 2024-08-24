import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

// Підключення до MongoDB
mongoose.connect('mongodb+srv://<nickname>:<password>@cluster0.5unt9.mongodb.net/crud?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Connection error', error));

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },

});

const Book = mongoose.model('Book', bookSchema);

app.use(express.json()); 

// Маршрути
app.get('/', (req, res) => res.send('Hello World!'));

// GET /books - Отримати всі книги
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find()
        res.json(books);
    } catch (error) {
        res.status(500).json({
            succes: false
        })
    }
});

// GET /books/:id - Отримати одну книгу
app.get('/books/:id', async (req, res) => {
    try {
        const books = await Book.findById(req.params.id)
        res.json(books)
    } catch (error) {
        res.status(500).json({
            succes: false
        })
    }
});

// POST /books/:id - Створити книгу
app.post('/books/', async (req, res) => {
    try{
        const newBook = new Book(req.body)
        await newBook.save()
        res.status(201).json(newBook);
    } catch {
        res.status(500).json({
            succes: false
        })
    }
});

// PUT /books/:id - Редагувати одну книгу
app.put('/books/:id', async (req, res) => {
    try{
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(updatedBook)
    } catch{
        res.status(500).json({
            succes: false
        })
    }
});

// DELETE /books/:id - Видалити одну книгу
app.delete('/books/:id', async (req, res) => {
    try{
        const deleteBook = await Book.findByIdAndDelete(req.params.id)
        res.json(deleteBook)
    } catch {
        res.status(500).json({
            succes: false
        })
    }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
