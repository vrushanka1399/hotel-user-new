import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Details from "./pages/Details";
import MyBookings from "./pages/MyBookings";

export default function App(){

 const logout=()=>{
  localStorage.removeItem("user");
  window.location.href="/auth";
 };

 return(
  <BrowserRouter>

   <nav>
    <Link to="/">Home</Link> {"  "}
    <Link to="/explore">Explore</Link> {"  "}
    <Link to="/bookings">My Bookings</Link>{"  "}
    <button onClick={logout}>Logout</button>
   </nav>

   <Routes>
    <Route path="/auth" element={<Auth/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/explore" element={<Explore />} />
    <Route path="/explore/:id" element={<Details />} />
    <Route path="/details/:id" element={<Details/>}/>
    <Route path="/bookings" element={<MyBookings/>}/>
   </Routes>

  </BrowserRouter>
 );
}
