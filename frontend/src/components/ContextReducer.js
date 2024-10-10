import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD": {
            const existingItemIndex = state.findIndex(
                item => item.id === action.id && item.size === action.size
            );

            if (existingItemIndex !== -1) {
                // If item exists, update quantity and price
                const updatedState = [...state];
                updatedState[existingItemIndex].qty += action.qty; // Add to existing qty
                updatedState[existingItemIndex].price += action.price; // Add to existing price
                return updatedState;
            }

            // If item doesn't exist, add it to the cart
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    qty: action.qty,
                    size: action.size,
                    price: action.price,
                    img: action.img,
                },
            ];
        }

        case "REMOVE": {
            const newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;
        }

        case "UPDATE": {
            const updatedArr = state.map((food) => {
                if (food.id === action.id && food.size === action.size) {
                    
                    return {
                        ...food,
                        qty: parseInt(action.qty) + parseInt(food.qty), // Add to existing quantity
                        price: action.price + food.price, // Update the price
                    };
                }
                return food;
            });
            return updatedArr;
        }

        case "DROP":
            let empArray = []
            return empArray

        default:
            console.log("Error in Reducer");
            return state;
    }
};




export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, [])
    return (

        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);