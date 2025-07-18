import { useMemo, useRef, useState } from "react"

// useMemo hook used for optimizing performance
const data = [
  { name: 'banana', price: 1.05 },
  { name: 'apple', price: 2.5},
  { name: 'orange', price: 0.5 }
];

export const UseMemoShowcase = () => {
  const [items, setItems] = useState(data);
  const [sortedItems, setSortedItems] = useState([])

  // za dodavanje novi item-a
  const inputName = useRef(null);
  const inputPrice = useRef(null);

  const totalPrice = useMemo(() => {
    console.log('memo called')
    return items.reduce((acc, item) => acc += item.price, 0)
  }, [items])

  return (
  <div className="container">
    <h2>List of items sorted by price:</h2>
    <ol>
      {sortedItems.length ? sortedItems.map((item, idx) => <li key={idx}>{item.name} {item.price} KM</li>) :
      items.map((item, idx) => <li key={idx}>{item.name} {item.price} KM</li> )}
    </ol>
    <h2>total price {totalPrice}</h2>
    <h3>sort by</h3>
    <button onClick={() => setSortedItems([...items].sort((a,b) => a.price - b.price))}>highest to lowest</button>
    <button onClick={() => setSortedItems([...items].sort((a,b) => b.price - a.price))}>lowest to highest</button>

    <h3>add item</h3>
    <form onSubmit={(e) => {
      e.preventDefault()
      setItems([...items, { name: inputName.current.value, price: parseInt(inputPrice.current.value) }])
      }}>
      <input ref={inputName} placeholder="name" onChange={(e) => inputName.current.value = e.target.value } /> 
      <input ref={inputPrice} type="number" placeholder="price" onChange={(e) => inputPrice.current.value = e.target.value } />
      <button>submit</button>
    </form>
  </div>
  )
} 
