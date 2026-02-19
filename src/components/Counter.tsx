import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  incrementByAmount,
} from '../store/reducers/counterSlice';
const Counter = () => {
  const count = useSelector((state:any) => state.counter.value);
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(increment())
  // },[])
  return (
    <div>
      <h1>Count: {count}</h1>
      <button className='button' onClick={() => dispatch(increment())}>Increment</button>
      <button className='button' onClick={() => dispatch(decrement())}>Decrement</button>
      <button className='button' onClick={() => dispatch(incrementByAmount(5))}>
        Increment by 5
      </button>
    </div>
  );
}; 

export default Counter;
