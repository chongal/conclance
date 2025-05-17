import React, { useState, useEffect } from "react";

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default function DementiaSupportApp() {
  const [tasks, setTasks] = useState([
    { id: 1, label: "Drink 1-1.5 liters of water", done: false },
    { id: 2, label: "Eat breakfast", done: false },
    { id: 3, label: "Take medication", done: false },
  ]);

  const [memorySet, setMemorySet] = useState(["Apple", "Dog", "Car"]);
  const [showMemory, setShowMemory] = useState(true);
  const [inputWords, setInputWords] = useState("");

  const [pairs, setPairs] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const items = ["A", "B", "C", "D"];
    const shuffled = shuffle([...items, ...items]).map((item, index) => ({
      id: index,
      value: item,
    }));
    setPairs(shuffled);
  }, []);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleFlip = (index) => {
    if (flipped.length === 2 || flipped.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (pairs[first].value === pairs[second].value) {
        setMatched([...matched, pairs[first].value]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div style={{ padding: 16, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>
        Conclance: Dementia Support
      </h1>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Daily Tasks</h2>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span style={{ textDecoration: task.done ? "line-through" : "none", color: task.done ? "gray" : "black" }}>
                {task.label}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Play: Memory Challenge</h2>
        {showMemory ? (
          <div>
            <p>Memorize these words:</p>
            <div style={{ fontWeight: "bold", marginBottom: 8 }}>{memorySet.join(", ")}</div>
            <button onClick={() => setShowMemory(false)}>Hide and Recall</button>
          </div>
        ) : (
          <div>
            <p>Enter all words you remember (separated by spaces):</p>
            <input
              type="text"
              value={inputWords}
              onChange={(e) => setInputWords(e.target.value)}
              style={{ marginBottom: 8, width: "100%", padding: 4 }}
            />
            <button onClick={() => setShowMemory(true)}>Try Again</button>
          </div>
        )}
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Play: Find the Pair</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 50px)",
            gap: 8,
          }}
        >
          {pairs.map((card, idx) => (
            <div
              key={card.id}
              onClick={() => handleFlip(idx)}
              style={{
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: 4,
                backgroundColor:
                  flipped.includes(idx) || matched.includes(card.value)
                    ? "#fff"
                    : "#eee",
                cursor: "pointer",
                userSelect: "none",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              {(flipped.includes(idx) || matched.includes(card.value))
                ? card.value
                : "?"}
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Play: Spot the Difference</h2>
        <p style={{ fontSize: 14, fontStyle: "italic" }}>
          (Coming soon: Visual comparison tool with image differences.)
        </p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Play: Attention Switching</h2>
        <p style={{ fontSize: 14, fontStyle: "italic" }}>
          (Coming soon: Tasks requiring switching between sorting criteria like
          color and shape.)
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Play: Mini Crosswords / Sudoku</h2>
        <p style={{ fontSize: 14, fontStyle: "italic" }}>
          (Coming soon: Mini puzzles for language and logic training.)
        </p>
      </section>
    </div>
  );
}
