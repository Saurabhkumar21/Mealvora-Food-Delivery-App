import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete'; 
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart(); // Cart items
  let dispatch = useDispatchCart(); // Dispatch for cart actions

  // Handle empty cart
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    );
  }

  // Handle checkout
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    try {
      console.log("userEmail",userEmail)
      let response = await fetch("http://localhost:5000/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_data: data, // Cart data
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });

      if (response.ok) {
        // Successful checkout, clear the cart
        dispatch({ type: "DROP" });
        alert("Order placed successfully!");
      } else {
        // Handle error response
        console.error("Failed to place the order, try again.");
        alert("Failed to place the order.");
      }
    } catch (error) {
      // Handle any other errors
      console.error("Error during checkout:", error);
      alert("Error during checkout, please try again later.");
    }
  };

  // Calculate total price
  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Size</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0" onClick={() => dispatch({ type: "REMOVE", index })}>
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-2'>Total Price: ₹{totalPrice}/-</h1>
        </div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  );
}
