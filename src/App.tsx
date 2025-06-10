import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LayoutAdmin from "./Layout";
import HomeMoney from "./Pages/QlGuiTien/HomeMoney";
import Home from "./Pages/QlTheATM/Home";
import Home3 from "./Pages/Home3/Home3";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LayoutAdmin />}>
            <Route index path="home" element={<Home />} />
            <Route path="home2" element={<HomeMoney />} />
            <Route path="home3" element={<Home3 />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
