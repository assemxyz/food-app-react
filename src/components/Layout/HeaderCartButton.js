import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../store/CartContext';

const HeaderCartButton = (props) => {
  const cartContext = useContext(CartContext)
  const itemsNumber = cartContext.items.length;

  let { items } = cartContext;

  const [isBump, setIsBump] = useState(false);
  const classesButton = `${classes.button} ${isBump ? classes.bump : ''}`;


  useEffect(() => {
    if (items.length < 1) {
      return;
    } else {
      setIsBump(true);
    }
    const timer = setTimeout(() => { setIsBump(false) }, 400);
    //time out cleaner for quick cliker
    //useffect return a cleanup
    return () => clearTimeout(timer);
  }, [items])

  return (
    <button className={classesButton} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{itemsNumber}</span>
    </button>
  );
};

export default HeaderCartButton;
