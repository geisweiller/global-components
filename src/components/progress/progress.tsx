interface ProgressProps {
   /**
   * totalOfTasks (optional) represents the total number of tasks that must be completed to achieve 100% completion.
   * If not provided, the component interprets this as an indeterminate progress and displays a spinner symbolizing ongoing work without a known endpoint.
   * Once the work is done, the parent component should update the totalOfTasks to be equal to tasksCompleted to display the 'Completed!' state.
   */
  totalOfTasks?: number;
  /**
   * tasksCompleted is the number of tasks that have already been completed. To show the progress evolution as it happens, this number should be stored and updated in the parent component, typically using a useState hook.
   */
  tasksCompleted: number;
  /**
   * isInBar is a boolean set to false by default. If set to true, the progress will be displayed as a progress bar that fills up as progress is made, instead of a percentage.
   */
  isInBar?: boolean;
 /**
 * taskInformation is a string representing the name or description of the most recently completed task. If provided, the component will display this information to offer more context on the progress.
 */
taskInformation?: string;

}

/**
 * The progress component displays the advancement made towards completing any task. Once the task is completed it will stop showing the progress and just show "Completed!" instead, you can change the message of completion on the conditional progressMade >= 100, and if you erase this contidional it will just show "100%" (or full bar) once all progress is made.
 *
 *  - For determinate tasks (when totalOfTasks is provided), progress can be displayed as a percentage or a progress bar, based on the isInBar prop.
 * - For indeterminate tasks (when totalOfTasks is not provided), the component will display a spinner, symbolizing ongoing work without a known endpoint. 
 *   Once the task is completed, the parent component should update totalOfTasks to match tasksCompleted to transition from the spinner to "Completed!" state.
 * 
 * Task Information:
 * The component can also display the name or description of the current task being completed, providing context on what part of the overall process is currently underway. This feature enhances user understanding of the progress in relation to the specific tasks being performed.
 * 
 * Multiple and Hierarchical Tasks Tracking:
 * For tracking multiple tasks or tasks with a hierarchical structure, the component can be instantiated multiple times, each instance representing a different task or a level in the task hierarchy. This approach allows for a granular and dynamic view of progress across individual tasks or stages.
 * Additionally, for a collective view, the component can aggregate the progress of multiple tasks, offering a unified progress measure. This is particularly useful in scenarios where the completion of several sub-tasks contributes to the completion of a larger, overarching task.
 * 
 * Styles:
 * This component utilizes Tailwind CSS classes for spinner animation (animate-spin), progress bar styling,and other utility classes for layout and design. The color, size, and margin classes can be adjusted to meet the specific design needs of your project. all colors are set in custom in tailwind.config.js
 */


export const Progress = ({
  tasksCompleted,
  totalOfTasks,
  isInBar = false,
  taskInformation,
}: ProgressProps) => {
  if(!totalOfTasks) {
    return <div className="w-16 h-16 border-4 border-light-gray rounded-full border-t-4 border-t-dark-blue animate-spin"></div>
 
  }
  const progressMade = (tasksCompleted / totalOfTasks) * 100;

  const displayProgress = isInBar ? (
    <div className="w-full bg-gray rounded-full h-4">
  <div
    className="bg-dark-blue h-4 rounded-full"
    style={{ width: `${progressMade}%` }}
  ></div>
</div>
  ) : (
    `${progressMade}%`
  );

  if(progressMade >= 100) {
    return(
      <div>Completed!</div>
    )
  }

  return (
    <div className="w-64">
      {displayProgress}
      {taskInformation && <p>{taskInformation}</p>}
    </div>
  )  
}
