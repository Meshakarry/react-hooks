import { useRef, useState } from "react"

// useRef hook doesn't trigger a rerender as a normal state change does
// useRef is used for referencing DOM elements

export const UseRefShowcase = () => {
  const [rerenderInput, setRerenderInput] = useState(false);

  const inputRef = useRef(null);
  const inputLength = useRef(0);

  const handleInput = () => {
    inputRef.current.style.transform = 'scale(2)'
  }

  const handleBlur = () => {
    inputRef.current.style.transform = 'scale(1)'
    inputLength.current = inputRef.current.value.length;
    setRerenderInput(!rerenderInput)
  }

  return (
    <div className="container">
      <input
        ref={inputRef}
        onChange={(e) => inputRef.current.value = e.target.value }
        onFocus={handleInput}
        onBlur={handleBlur}
      />
      <h2>Input length is {inputLength.current}</h2>
    </div>
  )
} 
