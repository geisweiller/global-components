interface ProgressProps {
  /**
   * totalOfTasks represents the total number of tasks that must be completed to achieve 100% completion. Providing this allows the component to calculate the progress made.
   */
  totalOfTasks?: number;
  /**
   * tasksCompleted is the number of tasks that have already been completed. To show the progress evolution as it happens, this number should be stored and updated in the parent component, typically using a useState hook.
   * IMPORTANT if the totalOfTasks props is not sent the comonent will interpret that the progress does not have a forseeable end and will turn into a spinner symbolizing ongoing work without a known endpoint.
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
 * The progress component displays the advancement made towards completing any task. Once the task is completed it will stop showing the progress and just show "Completed!" instead, you can change on the conditional progressMade >= 100, and if you erase this contitional it will just show "100%" (or full bar) once all progress is made.
 * If the end of the task is unknown, this can be indicated by not sending a totalOfTask number. In this case, the progress will transform into a spinner, symbolizing ongoing work without a known endpoint.
 * For determinate tasks, progress can be displayed as a percentage or a progress bar, based on user preference set through props.
 * 
 * Task Information:
 * The component can also display the name or description of the current task being completed, providing context on what part of the overall process is currently underway. This feature enhances user understanding of the progress in relation to the specific tasks being performed.
 * 
 * Multiple and Hierarchical Tasks Tracking:
 * For tracking multiple tasks or tasks with a hierarchical structure, the component can be instantiated multiple times, each instance representing a different task or a level in the task hierarchy. This approach allows for a granular and dynamic view of progress across individual tasks or stages.
 * Additionally, for a collective view, the component can aggregate the progress of multiple tasks, offering a unified progress measure. This is particularly useful in scenarios where the completion of several sub-tasks contributes to the completion of a larger, overarching task.
 * 
 * Styles:
 * This component utilizes Tailwind CSS classes for spinner animation (animate-spin), progress bar styling,and other utility classes for layout and design. The color, size, and margin classes can be adjusted to meet the specific design needs of your project.
 */

// PROBLEM IF THE TOTAL OF TASK IS NOT PASSED AND THE COMPONENT ITS A SPINNER HOW WILL IT LEARN ONCE THE WORK ITS DONE AND IT CAN STOP SHOWING THE SPINNER?

export const Progress = ({
  tasksCompleted,
  totalOfTasks,
  isInBar = false,
  taskInformation,
}: ProgressProps) => {
  if(!totalOfTasks) {
    return <div className="w-16 h-16 border-4 border-gray-200 rounded-full border-t-4 border-t-white animate-spin"></div>
 
  }
  const progressMade = (tasksCompleted / totalOfTasks) * 100;

  const displayProgress = isInBar ? (
    <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
  <div
    className="bg-blue-600 h-4 rounded-full"
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
    <div>
      {displayProgress}
      {taskInformation && <p>{taskInformation}</p>}
    </div>
  )  
}
