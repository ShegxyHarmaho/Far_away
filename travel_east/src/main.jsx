import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 5, packed: false },
];

function App() {
  const [items, setItems] = useState(initialItems);

  // Handle item packing toggle
  function handleTogglePacked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  // Handle item deletion
  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form setItems={setItems} items={items} />
      <PackingList
        items={items}
        onTogglePacked={handleTogglePacked}
        onDelete={handleDelete}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ setItems, items }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    setItems([...items, newItem]);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you want for your 😍 Trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add Item</button>
    </form>
  );
}

function PackingList({ items, onTogglePacked, onDelete }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onTogglePacked={onTogglePacked}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onTogglePacked, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onTogglePacked(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} ({item.quantity})
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentagePacked =
    totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

  return (
    <footer className="stats">
      <em>
        🎁 You have {totalItems} items on your list, and you already packed{" "}
        {packedItems} ({percentagePacked}%)
      </em>
    </footer>
  );
}

export default App;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
