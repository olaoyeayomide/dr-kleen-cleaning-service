import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Hero from "./components/sections/Hero";
import Features from "./components/sections/Features";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import WorkProcess from "./components/sections/WorkProcess";
import ContactTestimonials from "./components/sections/ContactTestimonials";
import GetEstimate from "./components/sections/GetEstimate";
import Footer from "./components/layout/Footer";
import Shop from "./components/Shop/Shop";

function App() {
  return (
    <Router>
      <div className="bg-gray-50">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <Features />
                <About />
                <Services />
                <WorkProcess />
                <ContactTestimonials />
                <GetEstimate />
              </main>
            }
          />
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/home"
            element={
              <main>
                <Hero />
                <Features />
                <About />
                <Services />
                <WorkProcess />
                <ContactTestimonials />
                <GetEstimate />
              </main>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
