import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { UseEffectShowcase } from './pages/UseEffect'
import { UseRefShowcase } from "./pages/UseRef";
import { UseMemoShowcase } from "./pages/UseMemo";
import { UseCallbackShowcase } from "./pages/UseCallback";
import './App.css';

function App() {
  return (
    <div className="App">
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/use-effect" element={<UseEffectShowcase slug={'test'} />} />
        <Route path="/use-ref" element={<UseRefShowcase />} />
        <Route path="/use-memo" element={<UseMemoShowcase />} />
        <Route path="/use-callback" element={<UseCallbackShowcase />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
