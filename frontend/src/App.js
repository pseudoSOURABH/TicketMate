// import logo from './logo.svg';
// import './App.css';
// import Nav from './Components/Nav/Nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from './Components/Home/Home';
// import Ticket from './Components/Ticket/Ticket';
// import About from './Components/About/About';
// import Bus from './Components/Ticket/Travel/Bus/Bus';
// import Travel from './Components/Ticket/Travel/Travel';

// import Profile from './Components/Profile/Profile';
// import Cred from './Components/Cred/Cred'
import Observer from "./PersistComponent/Observer/Observer";
import Account from "./PersistComponent/Account/Account";
import Users from "./PersistComponent/Users";
import Navbar from "./PersistComponent/Navigation/Navbar";


// import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/Observer" element={<Observer />}></Route>
        <Route path="/" element={<Account />}></Route>
        <Route path="/Users" element={<Users />}></Route>

        {/* {localStorage.getItem('token') && <Route path="/about" element={<About />} />}
        <Route path="/cred" element={<Cred />} />
        {localStorage.getItem('token') && <Route path="/Ticket" element={<Ticket />} />}
        {localStorage.getItem('token') && <Route path='/Ticket/Travel' element={<Travel />} />}
        {localStorage.getItem('token') && <Route path='/Ticket/Travel/Bus' element={<Bus />} />}
        {localStorage.getItem('token') && <Route path='Profile' element={<Profile />} />} */}
      </Routes>
    </>
  )
}

export default App;
