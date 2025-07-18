import { useCallback, useEffect, useState } from "react"
import { RNG } from "../randomNumberGenerator"

export const UseEffectShowcase = ({ slug }) => {
  const [count, setCount] = useState(0);
  const [isButtonOnePressed, setIsButtonOnePressed] = useState(false);
  const [isButtonTwoPressed, setIsButtonTwoPressed] = useState(false);
  const [isButtonThreePressed, setIsButtonThreePressed] = useState(false);
  // const { mobile } = useBreakpoints();

  const getStories =  useCallback( async () => {
    if (isButtonThreePressed) {
      setCount((prevCount) => prevCount + 1) // functional update
      return document.body.style.backgroundColor = `rgba(${RNG(255)}, ${RNG(255)}, ${RNG(255)}, 1)` // BG
    }
  }, [isButtonThreePressed])

  useEffect(() => {
    document.body.style.backgroundColor = `rgba(${RNG(255)}, ${RNG(255)}, ${RNG(255)}, 1)` // BG
    if (slug === "test") {
      document.body.style.backgroundColor = `rgba(${RNG(255)}, ${RNG(255)}, ${RNG(255)}, 1)` // BG
    }
    getStories()
    // return () => document.body.style = '#fff'
  }, [isButtonOnePressed, getStories, slug])

  return (
    <div className="container">
      <h3>button 3 pressed {count} times</h3>
      <button onClick={() => setIsButtonOnePressed(!isButtonOnePressed)}>Button 1</button>
      <button onClick={() => setIsButtonTwoPressed(!isButtonTwoPressed)}>Button 2</button>
      <button onClick={() => setIsButtonThreePressed(!isButtonThreePressed)}>Button 3</button>
    </div>
  )
} 
