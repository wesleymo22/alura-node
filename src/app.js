import express from "express";
import db from "./config/dbConnect.js"
import livros from "./models/Livro.js"

db.on("error", console.log.bind(console, 'Erro de conexao'))
db.once("open", () => {
    console.log("conexao com o banco feita com sucesso")
})

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node')
})

app.get('/livros', async (req, res) => {
    try {
        const livro = await livros.find();
        res.json(livro);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.get('/livros/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const livro = await livros.findById(id);
        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.json(livro);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.post('/livros', async (req, res) => {
    const { titulo, autor } = req.body;

    const livro = new livros({
        titulo,
        autor,
    });

    try {
        const newLivro = await livro.save();
        res.status(201).json(newLivro);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

app.put('/livros/:id', (req, res) => {
    const id = req.params.id

    try {
        const livro = livros.findById(id)
        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.json(livro)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.delete('/livros/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const livro = await livros.findByIdAndDelete(id);

        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }

        return res.status(200).json({ message: 'Livro excluído com sucesso.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao excluir livro.' });
    }
})

export default app