"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Todo API is running');
});
app.get('/todos', async (req, res) => {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: {
                created_at: 'desc'
            }
        });
        res.json(todos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});
app.post('/todos', async (req, res) => {
    const { title, body, due_date } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'A title is required' });
    }
    try {
        const newTodo = await prisma.todo.create({
            data: {
                title,
                body,
                due_date: due_date ? new Date(due_date) : null,
            },
        });
        res.status(201).json(newTodo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
