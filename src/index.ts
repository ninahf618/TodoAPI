import express, { Request, Response } from "express";
import { createTodosRouter } from "./interface/web/routes/todos";
import { errorHandler } from "./interface/web/middleware/errorHandler";
import { getSystemErrorMap } from "util";

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Todo API is running');
});

app.use('/api', createTodosRouter());
//app.use('/api/todos/', todoRoutes);

app.use((errorHandler));

const PORT = 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
