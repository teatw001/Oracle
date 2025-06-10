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
import AddAcc from "./Pages/Thêm User/AddAcc";
import PrivateRoute from "./Pages/Login/PrivateRoute";
import AdminRoute from "./Pages/Login/AdminRoute";
import ListATMKH from "./Pages/ListAtmKH/List";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route element={<LayoutAdmin />}>
            <Route index element={<Navigate to="/listAtm" />} />

            <Route path="listAtm" element={<ListATMKH />} />

            <Route element={<AdminRoute />}>
              <Route index path="home" element={<Home />} />
              <Route path="home3" element={<Home3 />} />
              <Route path="addAccount" element={<AddAcc />} />
              <Route path="atmKH" element={<HomeMoney />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
