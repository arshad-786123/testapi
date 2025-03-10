import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory data store
let items: { id: number; name: string }[] = [];

// Routes

// Get all items
app.get("/api/items", (req: Request, res: Response) => {
  res.json(items);
});


app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the API" });
});


// Get one item by ID
app.get("/api/items/:id", (req: Request, res: Response) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  item ? res.json(item) : res.status(404).json({ message: "Item not found" });
});

// Create an item
app.post("/api/items", (req: Request, res: Response) => {
  const newItem = { id: Date.now(), name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
