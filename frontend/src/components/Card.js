import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1); // Default quantity is 1
    const [size, setSize] = useState(""); // Default size is empty initially

    const handleAddToCart = async () => {
        let food = data.find(item => item.id === props.foodItem._id && item.size === size);
    
        if (food) {
            // If the same item with the same size exists, update its quantity
            await dispatch({
                type: "UPDATE",
                id: props.foodItem._id,
                size: size,
                price: finalPrice, // Should match the existing item price
                qty: qty           // This should match the quantity you want to add
            });
        } else {
            // If the item with a different size or a new item, add it to the cart
            await dispatch({
                type: "ADD",
                id: props.foodItem._id,
                name: props.foodItem.name,
                price: finalPrice,
                qty: qty,           // Ensure this is the quantity you selected
                size: size,
                img: props.foodItem.img
            });
        }
    };
    
    
    
    

    // Calculate final price based on selected size and quantity
    let finalPrice = qty * parseInt(options[size] || 0);

    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])


    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img
                    className="card-img-top"
                    src={props.foodItem.img}
                    alt="Card image cap"
                    style={{ height: "120px", objectFit: "fill" }}
                />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>

                    <div className='container w-100'>
                        {/* Select Quantity */}
                        <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1}</option>
                                )
                            })}
                        </select>

                        {/* Select Size */}
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>

                        {/* Display Total Price */}
                        <div className='d-inline h-100 fs-5'>
                            Total Price: {"\u20B9"}{finalPrice}/-
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="btn btn-success mt-3" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
