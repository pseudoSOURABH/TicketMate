
import { Routes, Route } from "react-router-dom";

import Observer from "./PersistComponent/Observer/Observer";
import Account from "./PersistComponent/Account/Account";
import Users from "./PersistComponent/Users";
import Navbar from "./PersistComponent/Navigation/Navbar";
import Stock from "./PersistComponent/Stock/Stock";
import Portfolio from "./PersistComponent/Portfolio/Portfolio";


// import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/Observer" element={<Observer />}></Route>
        <Route path="/" element={<Account />}></Route>
        <Route path="/Users" element={<Users />}></Route>
        <Route path="/Portfolio" element={<Portfolio />}></Route>
        <Route path="/Stock" element={<Stock />}></Route>
      </Routes>
    </>
  )
}

export default App;
