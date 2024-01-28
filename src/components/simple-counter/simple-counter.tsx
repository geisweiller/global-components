interface CounterProps {
  /**
   * The index will be the number displayed by this simple counter.
   */
  index: number;
}

/**
 * A Simple Counter component that displays a number it receives through props.
 * - Does not allow any manipulation of the number directly within the component.
 * - Suited for informational purposes, for example, displaying the number of visits on a page.
 * - It is important to manage the props in a way that reflects the updates in it, for example, by using useEffect or useState.
 * In the stories file, you can find simple examples of using both useState and useEffect to keep the counter updated through changes in its index number.
 */

export const SimpleCounter = ({ index = 1 }: CounterProps) => {

  return (
    <>
        <span>{index}</span>
    </>
  );
};
