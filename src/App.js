import './App.css';
import{BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Main from "../src/pages/main/Main";
import Login from "../src/pages/Login";
import Nav from "../src/componenets/Nav";
import Create from "./pages/create-post/Create";

function App() {
  return (
    <>
    <div className='app'>
    <Router>
    <Nav/>
      <Routes>
        
        <Route path="/" element={<Main/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Create" element={<Create/>}/>


      </Routes>
    </Router>
    </div>
    </>
     )
}

export default App;
