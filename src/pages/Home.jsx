import { Link } from "react-router-dom"

export const Home = () => {
  return (
  <div className="container">
      <h1>React Hooks</h1>
      <div className="hook-links">
      <Link to="/use-effect">useEffect showcase</Link>
      <Link to="/use-ref">useRef showcase</Link>
      <Link to="/use-memo">useMemo showcase</Link>
      <Link to="/use-callback">useCallback showcase</Link>
      </div>
  </div>)
} 
