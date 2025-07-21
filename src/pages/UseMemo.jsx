import { useMemo, useRef, useState } from "react";

const data = [
  { name: "banana", price: 1.05 },
  { name: "apple", price: 2.5 },
  { name: "orange", price: 0.5 },
];

export const UseMemoShowcase = () => {
  const [items, setItems] = useState(data);
  const [search, setSearch] = useState("");
  const [sortDirection, setSortDirection] = useState(null); // 'asc' | 'desc' | null

  const inputName = useRef(null);
  const inputPrice = useRef(null);

  console.log("rerender");

  const totalPrice = useMemo(() => {
    console.log("memo: totalPrice");
    return items.reduce((acc, item) => acc + item.price, 0);
  }, [items]);

  const filteredAndSortedItems = useMemo(() => {
    console.log("memo: filteredAndSortedItems");

    let filtered = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortDirection === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortDirection === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [items, search, sortDirection]);

  const handleAddItem = (e) => {
    e.preventDefault();
    const name = inputName.current.value.trim();
    const price = parseFloat(inputPrice.current.value);

    if (!name || isNaN(price)) return;

    setItems([...items, { name, price }]);
    inputName.current.value = "";
    inputPrice.current.value = "";
  };

  return (
    <div className="container">
      <h2>List of items</h2>

      <input
        type="text"
        placeholder="Search item..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ol>
        {filteredAndSortedItems.map((item, idx) => (
          <li key={idx}>
            {item.name} - {item.price} KM
          </li>
        ))}
      </ol>

      <h2>Total price: {totalPrice.toFixed(2)} KM</h2>

      <h3>Sort by:</h3>
      <button onClick={() => setSortDirection("desc")}>Highest to Lowest</button>
      <button onClick={() => setSortDirection("asc")}>Lowest to Highest</button>
      <button onClick={() => setSortDirection(null)}>Reset Sort</button>

      <h3>Add item</h3>
      <form onSubmit={handleAddItem}>
        <input ref={inputName} placeholder="name" />
        <input ref={inputPrice} type="number" placeholder="price" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
