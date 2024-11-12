import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup.js';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { CartProvider } from './components/ContextReducer.js';
import MyOrder from './screens/MyOrder.js';
import Checkout from './components/PaymentCheckout.js';


function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/creatuser" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
            <Route exact path="/checkout" element={<Checkout />}/>
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
// import React, { useRef, useState } from 'react'

// export default function App() {

//   const inputRef = useRef(null);

//   function handleClick() {
//     console.log(inputRef);
//     inputRef.current.value="Saurabh"

//   }


//   return (
//     <>
//       <h1 >App</h1>
//       <input ref={inputRef} type='text' value={"Saurabh Kumar"}/>
//       <button onClick={handleClick}>Click Me</button>

//     </>

//   )
// }
// import React from 'react'
// import FormValidation from './components/FormValidation'

// export default function App() {
//   return (
//     <FormValidation/>
//   )
// }

