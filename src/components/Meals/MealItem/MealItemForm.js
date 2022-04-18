import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import { useRef, useState } from 'react';

const MealItemForm = (props) => {
  const [isValidForm, validateForm] = useState(true);
  const amountInputRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();


    const entredInputAmount = amountInputRef.current.value;

    const entredInputAmountNum = +entredInputAmount;

    if (entredInputAmount.trim().length === 0 || 
      entredInputAmountNum < 1 || 
      entredInputAmountNum > 5) {
      validateForm(false);
      return;
    }

    props.onAddToCart(entredInputAmountNum);
  }


  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!isValidForm && <p> please enter a valid amount</p>}
    </form>
  );
};

export default MealItemForm;
