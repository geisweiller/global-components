


interface ProgressProps {
  /**
   * This explains foo.
   */
  foo: boolean;
  /**
   * This explains bar.
   */
  bar: string;
  /**
   * This explains baz.
   */
  baz: string;
}

/**
 * The progress component displays the advancement made towards completing any task.
 * If the end of the task is unknown, this can be indicated via props. In this case, the progress will transform into a spinner, symbolizing ongoing work without a known endpoint.
 * For determinate tasks, progress can be displayed as a percentage or a progress bar, based on user preference set through props.
 * 
 * Task Information Display:
 * The component can also display the current task's name or description, providing context on what part of the overall process is currently underway or completed. This feature enhances user understanding of the progress in relation to the specific tasks being performed.
 * 
 * Multiple and Hierarchical Tasks Tracking:
 * For tracking multiple tasks or tasks with a hierarchical structure, the component can be instantiated multiple times, each instance representing a different task or a level in the task hierarchy. This approach allows for a granular and dynamic view of progress across individual tasks or stages.
 * For a collective view, the component can aggregate the progress of multiple tasks as well as a collective endpoint that will be informed through props, offering a unified progress measure. This is particularly useful in scenarios where the completion of several sub-tasks contributes to the completion of a larger, overarching task.
 */




export const Progress = ({ foo, bar, baz }: ProgressProps) => {
  return(
  <div>
    <p>Hello 👋, I am a Progress component.</p>
    <div>{foo ? bar : baz}</div>
  </div>
)
};

