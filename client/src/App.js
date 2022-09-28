import './App.css';
import {Routes,Route} from "react-router-dom";
import Details from "./components/Details";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={
          <h2>About Page</h2>
          
        }/>
        <Route path="/details" element={<Details/>}/>
        <Route path="/user/signup" element={<Signup/>}/>
      
      <Route path="*" element={<Home/>}/>
      </Routes>

    </div>
  );
}

export default App;
