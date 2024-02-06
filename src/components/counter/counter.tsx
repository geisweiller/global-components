import { useState } from "react";

interface CounterProps {
  /**
   * The index will be the number of initialization of counter on first render.
   * If not provided, the counter will initialize with a default value of 1.
   */
  index?: number;
}

/**
 * Counter component that allows users to increment or decrement a value.
 * - Does not allow the value to go below 1 based on the assumption that
 *   counts for negative numbers or zero are not needed.
 * - If zero or negative counting is desired, modifications can be made as follows:
 *   - change the useState from "const [counterState, setCounterState] = useState(Math.max(1,index))" to "const [counterState, setCounterState] = useState(index)"
 *   - Remove the conditional check "&& counterState > 1" in handleCounterDecrement.
 *   - Adjust the conditional check in handleNumberChange to "value >= 0".
 *   - Set the min attribute in the input field to 0 or remove it.
 *   - Update tests in counter.test.tsx to reflect these changes.
 */

export const Counter = ({ index = 1 }: CounterProps) => {
  const [counterState, setCounterState] = useState(Math.max(1, index));
  const [isEditing, setIsEditing] = useState(false);

  const handleCounterIncrement = () => {
    if (!isEditing) {
      setCounterState(counterState + 1);
    }
  };

  const handleCounterDecrement = () => {
    if (!isEditing && counterState > 1) {
      setCounterState(counterState - 1);
    }
  };

  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setCounterState(value);
    }
  };
  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <>
      <button onClick={handleCounterDecrement}>minus</button>
      {isEditing ? (
        <input
          type="number"
          min={1}
          onChange={handleNumberChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span onClick={handleEditing}>{counterState}</span>
      )}
      <button onClick={handleCounterIncrement}>plus</button>
    </>
  );
};
