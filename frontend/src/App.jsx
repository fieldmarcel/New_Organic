import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
// import RecipeDetail from "./pages/RecipeDetail";
import { Toaster } from "react-hot-toast";
import Favourites from "./pages/SupportUs.jsx";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "../redux/store.js";
import Hero from "./components/Hero.jsx";
import Cards from "./components/Cards";
import Recipe from "./components/Recipe";
import Review from "./components/Review";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Searchpage from "./components/SearchPage";
import AddRecipe from "./pages/AddRecipe";
import UserSettings from "./pages/UserSettings";
import SubCategory from "./pages/SubCategory";
import Cuisine from "./pages/Cuisine";
import Explore from "./components/Explore";
import MoreIdeas from "./components/MoreIdeas";
import LiveFeed from "./components/LiveFeed";
const App = () => {
  return (
    <div className="">
      <Provider store={store}>
        <BrowserRouter>
          {/* // If I want to show the navbar on top of each page, I can place it here above routes */} 
          <Navbar />
          <Toaster />

          <Routes>
            <Route
              path="/"
              
              element={
                <>
                  <Hero />
                 <LiveFeed />

                  <Cards />

                  <Explore/>
                  <Review />
                  <MoreIdeas/>
                  <Footer/>
                </>
              }
            />
            <Route path="/login" element={<><Login /><Footer /></>} />
            <Route path="/about" element={<><About /><Footer /></>} />
            <Route path="/recipe/:id" element={<><Recipe /><Footer /></>} />
            <Route path="/favourites" element={<><Favourites /><Footer /></>} />

            <Route path="/signup" element={<><Signup /><Footer /></>} />
            <Route path="/search" element={<><Searchpage /><Footer /></>} />
            <Route path="/profile/:userName" element={<><Profile /><Footer /></>} />
            <Route path="/addRecipe" element={<><AddRecipe /><Footer /></>} />
            <Route path="/userSettings" element={<><UserSettings /><Footer /></>} />
            <Route path="/subCategory/:subCategory" element={<><SubCategory /><Footer /></>} />
            <Route path="/cuisine/:cuisine" element={<><Cuisine /><Footer /></>} />

          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
