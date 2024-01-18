import { useState } from "react";

interface CounterProps {
  /**
   * The index will be the number of initialization of counter on first render.
   * If not provided, the counter will initialize with a default value of 1.
   */
  index?: number;
}

export const Counter = ({ index = 1 }: CounterProps) => {
  const [counterState, setCounterState] = useState(index);

  const handleCounterIncrement = () => {
    setCounterState(counterState + 1);
  };

  const handleCounterDecrement = () => {
    if (counterState > 1) {
      setCounterState(counterState - 1);
    }
  };
  return (
    <>
      <button onClick={handleCounterDecrement}>minus</button>
      <span>{counterState}</span>
      <button onClick={handleCounterIncrement}>plus</button>
    </>
  );
};
