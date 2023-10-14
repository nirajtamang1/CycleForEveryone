import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./Pages/Home";
import Rental from "./Pages/Rental";
import FAQ from "./Pages/FAQ";
function App() {
  return (
    <>
     <BrowserRouter>
   <Routes>
    <Route path="/" element= {<Home />}></Route>
    <Route path="/rental" element= {<Rental />}></Route>
    <Route path="/faq" element= {<FAQ />}></Route>
    </Routes>
   </BrowserRouter>

    </>
  
  );
}
export default App;
