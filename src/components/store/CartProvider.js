import React, { useReducer } from "react";
import CartContext from "./CartContext"

const defaultState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const itemExistIndex = state.items.findIndex((item) => item.id === action.item.id);
        const existingItem = state.items[itemExistIndex];
        let itemsUpdated = [...state.items];
        if (existingItem) {
            itemsUpdated[itemExistIndex] = { ...existingItem, amount: action.item.amount + existingItem.amount };
        } else {
            itemsUpdated = state.items.concat(action.item);
        }
        const updateTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return { items: itemsUpdated, totalAmount: updateTotalAmount }
    }
    if (action.type === 'REMOVE') {
        const itemExistIndex = state.items.findIndex((item) => item.id === action.id);
        const existingItem = state.items[itemExistIndex];
        let itemsUpdated;
        if(existingItem.amount === 1){
            itemsUpdated = state.items.filter(e=>e.id !== action.id);
        } else {
            itemsUpdated = [...state.items];
            itemsUpdated[itemExistIndex] = {
                ...existingItem,
                amount: existingItem.amount - 1,
            };
        }
        
        const updateTotalAmount = state.totalAmount - existingItem.price;
        return { items: itemsUpdated, totalAmount: updateTotalAmount }
    }
    return defaultState;
}

const CartProvider = (props) => {


    const [cartState, dispacthAction] = useReducer(cartReducer, defaultState)

    const addItemHandler = (item) => { dispacthAction({ type: 'ADD', item: item }) };
    const removeItemHandler = (id) => { dispacthAction({ type: 'REMOVE', id: id }) };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }
    return (<CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>);
}

export default CartProvider;