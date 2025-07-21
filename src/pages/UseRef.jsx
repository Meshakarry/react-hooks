import { useRef, useState } from "react"

// useRef hook doesn't trigger a rerender as a normal state change does
// useRef is used for referencing DOM elements

export const UseRefShowcase = () => {
  const [rerenderInput, setRerenderInput] = useState(false);

  let inputLength = useRef(0);

  const handleChange = (e) => {
    inputLength.current = e.target.value.length;
    setRerenderInput(!rerenderInput)
  }

  return (
    <div className="container">
      <input
        onChange={(e) =>  handleChange(e)}
      />
      <h2>Input length is {inputLength.current}</h2>
    </div>
  )
} 
