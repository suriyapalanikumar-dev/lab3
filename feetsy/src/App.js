import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import Login from './components/Login/Login';
import CheckName from './components/SellItems/CheckName';
//import ShopDetails from './components/SellItems/ShopDetails';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ShopDisplay from './components/SellItems/ShopDisplay.js';
import Dashboard from './components/Dashboard/Dashboard';
//import Favorites from "./components/Favorites/Favorites.js";
import ShoppingItemOverview from './components/ShoppingItemOverview/ShoppingItemOverview';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';
import Example from './components/Example.js/Example';
import UserProfile from './components/UserProfile.js/UserProfile';
import Fav from './components/Favorites/Fav';
import SearchInitial from './components/Extras/SearchInitial';
import SearchPage from './components/Search/Search'
import SearchInitialMobile from './components/Extras/SearchInitialMobile';
import SearchOverview from './components/SummaryResult/summaryresult';
import SearchOverviewMobile from './components/Extras/SearchOverviewMobile';
import SearchOverviewoos from './components/Extras/SearchOverviewoos';
import Purchase from './components/Cart/Purchase';
import ShoppDisplay from './components/Extras/ShopDisplay';
//import SearchOverview from './components/Extras/SearchOverview';


function App() {
  return (
    <div className="App">
    <Router>  
    <Routes>
    <Route exact path="/" element={<Dashboard/>} />
    <Route path="/sell" element={<CheckName/>} />
    <Route path="/shopdetails" element={<ShopDisplay/>} />
    <Route path="/dashboard" element ={<Dashboard/>}/>
    <Route path="/favorites" element={<Fav/>}/>
    <Route path="/shopoverview" element = {<ShoppingItemOverview/>}/>
    <Route path="/footer" element={<Footer/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/example" element={<Example/>}/>
    <Route path="/profile" element={<UserProfile/>}/>
    <Route path="/searchoverview" element={<SearchPage/>}/>
    <Route path="/summaryoverview" element={<SearchOverview/>}/>
    <Route path="/purchase" element={<Purchase/>}/>
    <Route path="/shoppdetails" element={<ShoppDisplay/>}/>
    </Routes>
    </Router>
    </div>

  );
}

export default App;
