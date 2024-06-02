import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MealsList from "./Components/Meal/MealsList";
import "./App.css";
import MealInfo from "./Components/Meal/MealInfo";
import HomePage from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
//import ReviewForm from "./Components/Review/Review";
import AllReview from "./Components/Review/AllReview";
function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/meals" element={<MealsList />} />
          <Route path="/meals/:id" element={<MealInfo />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/reviews" element={<AllReview />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
export default App;