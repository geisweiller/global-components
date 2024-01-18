import type { Meta, StoryObj } from "@storybook/react";

import { Counter } from "./counter";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Counter",
  component: Counter,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component : "Counter component that alow to increment or decrement using buttons or edit number directly. It does not allow the value to go below 1 based on the assumption that counts for negative numbers or zero are not needed but this can be changed following the instructions on the Counter component file "
      }
    }
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    index: {
      control: "number",
      description: "Initial value of counter",
    },
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
};

export const WithCustomInitialValue: Story = {
  args: {
    index: 10,
  },
};
