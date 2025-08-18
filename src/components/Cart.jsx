import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Button } from "@mui/material";
import '../styles.css';

function Cart({ cart, onDelete }) {
  return (
    <div>
      
      <ul className="cart-list">
        {cart.map((item, index) => (
          <li key={index} className="cart-item">
            <span> ✈ {item.airline} — {item.count} x  {item.price * item.count}$ place: {item.index?.join(", ")}  </span>
            <Button className="btn-delete" onClick={() => onDelete(index)}>Remove</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
