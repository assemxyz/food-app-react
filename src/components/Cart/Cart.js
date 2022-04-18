import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { useContext } from 'react';
import CartContext from '../store/CartContext';
import CartItem from './CartItem';

const Cart = (props) => {
  const cart = useContext(CartContext)
  const itemRemoveHandler = (id)=> {cart.removeItem(id)};
  const itemAddHandler = (item)=> {cart.addItem({...item, amount: 1})};

  const totalAmount = `${cart.totalAmount.toFixed(2)}  $`;

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cart.items.map((item) => (
        <CartItem amount={item.amount} key={item.id} name={item.name} price={item.price} onRemove={itemRemoveHandler.bind(null, item.id)} onAdd={itemAddHandler.bind(null, item)} />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
