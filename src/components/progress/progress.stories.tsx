import type { Meta, StoryObj } from "@storybook/react";

import { Progress } from "./progress";
import { useEffect, useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  argTypes: {
isInBar: {
  control: "boolean",
  description: "Default set to false. Set to true to display progress in a bar that fills otherwise it will display progress in default manner that is a percentage. "
},
totalOfTasks: {
  control: "number",
  description: "Inform the total number of tasks needed to achive 100% of progress. If this props isin't passed the component will turn into a spinner, symbolizing ongoing work without a known endpoint."
},
tasksCompleted: {
  control: "number",
  description: "Inform the number of tasks already completed so the component can calculate how much of progress its already done. This prop has to be sent in a way that it will update in real time, typicly a useState"
},
taskInformation: {
  control: "string",
  description: "Inform the name of the task beeing done at the moment if ou want it to be shown by the component. This prop has to be sent in a way that it will update in real time, typicly a useState"
}

  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    totalOfTasks: 100,
    tasksCompleted: 0,
  },
  render: (args) => {
    const ProgressWithTimer = () => {
      const [tasksCompleted, setTasksCompleted] = useState(args.tasksCompleted);

      useEffect(() => {
        const interval = setInterval(() => {
          setTasksCompleted((currentProgress) => {
            const updatedProgress = currentProgress + 10;
            return updatedProgress > 100 ? 100 : updatedProgress;
          });
        }, 500);
        
        return () => {
          clearInterval(interval);
        };
      }, []);

      return (
        <Progress
          totalOfTasks={args.totalOfTasks}
          tasksCompleted={tasksCompleted}
          taskInformation={args.taskInformation}
        />
      );
    };
    return <ProgressWithTimer />;
  },
};


export const InBar: Story = {
  args: {
    totalOfTasks: 100,
    tasksCompleted: 0,
    isInBar: true,
  },
  render: (args) => {
    const ProgressWithTimer = () => {
      const [tasksCompleted, setTasksCompleted] = useState(args.tasksCompleted);

      useEffect(() => {
        const interval = setInterval(() => {
          setTasksCompleted((currentProgress) => {
            const updatedProgress = currentProgress + 10;
            return updatedProgress > 100 ? 100 : updatedProgress;
          });
        }, 500);
        
        return () => {
          clearInterval(interval);
        };
      }, []);

      return (
        <Progress
          totalOfTasks={args.totalOfTasks}
          tasksCompleted={tasksCompleted}
          isInBar={args.isInBar}
        />
      );
    };
    return <ProgressWithTimer />;
  },
};


export const TaskInformation: Story = {
  args: {
    totalOfTasks: 100,
    tasksCompleted: 0,
    taskInformation: "Task 1",
  },
  render: (args) => {
    const ProgressWithDynamicTasks = () => {
      const [tasksCompleted, setTasksCompleted] = useState(args.tasksCompleted);
      const [taskInformation, setTaskInformation] = useState(args.taskInformation);
      const taskNames = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"];

      useEffect(() => {
        
        const interval = setInterval(() => {
          setTasksCompleted((currentProgress) => {
            const updatedProgress = currentProgress + 20;
            if (updatedProgress <= 100) {
              const taskIndex = updatedProgress / 20;
              setTaskInformation(taskNames[taskIndex]);
            }
            return updatedProgress > 100 ? 100 : updatedProgress;
          });
        }, 1000);
        
        return () => {
          clearInterval(interval);
        };
      }, []);

      return (
        <Progress
          totalOfTasks={args.totalOfTasks}
          tasksCompleted={tasksCompleted}
          taskInformation={taskInformation}
        />
      );
    };
    return <ProgressWithDynamicTasks />;
  },
};


export const IndeterminateTaskWithCompletion: Story = {
  args: {
    tasksCompleted: 0, 
    },
  render: (args) => {
    const TaskWithSpinnerAndCompletion = () => {
      const [tasksCompleted, setTasksCompleted] = useState(args.tasksCompleted);
      const [totalOfTasks, setTotalOfTasks] = useState<number | undefined>(args.totalOfTasks); 

      useEffect(() => {
        
        setTimeout(() => {
          setTasksCompleted(100);
          setTotalOfTasks(100); 
             }, 5000);
      }, []);

      return (
        <Progress
          totalOfTasks={totalOfTasks}
          tasksCompleted={tasksCompleted}
        />
      );
    };
    return <TaskWithSpinnerAndCompletion />;
  },
};


export const InBarAnTaskInformation: Story = {
  args: {
    totalOfTasks: 100,
    tasksCompleted: 0,
    isInBar: true,
    taskInformation: "Task 1",
  },
  render: (args) => {
    const ProgressWithDynamicTasks = () => {
      const [tasksCompleted, setTasksCompleted] = useState(args.tasksCompleted);
      const [taskInformation, setTaskInformation] = useState(args.taskInformation);
      const taskNames = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"];

      useEffect(() => {
        const interval = setInterval(() => {
          setTasksCompleted((currentProgress) => {
            const updatedProgress = currentProgress + 20;
            if (updatedProgress <= 100) {
              const taskIndex = updatedProgress / 20;
              setTaskInformation(taskNames[taskIndex]);
            }
            return updatedProgress > 100 ? 100 : updatedProgress;
          });
        }, 1000);
        
        return () => {
          clearInterval(interval);
        };
      }, []);

      return (
        <Progress
          totalOfTasks={args.totalOfTasks}
          tasksCompleted={tasksCompleted}
          isInBar={args.isInBar}
          taskInformation={taskInformation}
        />
      );
    };
    return <ProgressWithDynamicTasks />;
  },
};


