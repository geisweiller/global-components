import type { Meta, StoryObj } from "@storybook/react";
import { SimpleCounter } from "./simple-counter";
import { useEffect, useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/SimpleCounter",
  component: SimpleCounter,

  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "Simple Counter is a component that displays the number it receives through props. It's impossible to manipulate the number within the component itself. Its use is best suited for displaying values, such as the number of visits on a page. It's important to manage the props in a way that reflects updates, which can be achieved by using useState or useEffect, for example (simple uses of both are shown here through the different stories).",
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    index: {
      control: "number",
      description:
        "The index will be the number provided to be displayed on this simple counter.",
    },
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof SimpleCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    index: 1,
  },
};

export const SimpleCounterWithClick: Story = {
  args: {
    index: 1,
  },
  render: (args) => {
    const CounterWithButton = () => {
      const [index, setIndex] = useState(args.index);
      const handleIncrement = () => {
        setIndex(index + 1);
      };
      return (
        <>
          <button onClick={handleIncrement}>+</button>

          <SimpleCounter index={index} />
        </>
      );
    };
    return <CounterWithButton />;
  },
};

export const SimpleCounterWithTimer: Story = {
  args: {
    index: 1,
  },
  render: (args) => {
    const CounterWithTimmer = () => {
      const [index, setIndex] = useState(args.index);
      useEffect(() => {
        const interval = setInterval(() => {
          setIndex((curentIndex) => curentIndex + 1);
        }, 500);
        return () => {
          clearInterval(interval);
        };
      }, []);
      return (
        <>
          <SimpleCounter index={index} />
        </>
      );
    };
    return <CounterWithTimmer />;
  },
};
