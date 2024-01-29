import type { Meta, StoryObj } from "@storybook/react";

import { LocationPin, LocationType } from "./location-pin";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Location-pin",
  component: LocationPin,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component: `
        LocationPin is a React component that retrieves the user's location based on their IP address 
        and displays location information. It uses an API fetch to determine the user's location and can 
        display the name of the city or town they are in. The component is highly customizable, allowing 
        users to specify default messages for loading, error, and the default location. Additionally, 
        users can follow instructions on the component file to modify the response data to display more specific location information beyond just 
        the city or town.
      `,
      },
    },
  },

  argTypes: {
    defaultLocation: {
      control: "string",
      description:
        "A default location to be shown if a precise location cannot be found.",
    },
    errorMessage: {
      control: "string",
      description:
        "A custom error message to be displayed if there is an error fetching the location.",
    },
    loadingMessage: {
      control: "string",
      description:
        "A custom loading message to be displayed while the location is being fetched.",
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof LocationPin>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Default behavior of LocationPin component.",
      },
    },
  },
};
export const WithCustomMessages: Story = {
  args: {
    defaultLocation: "Default location from props",
    errorMessage: "Error message from props",
    loadingMessage: "Loading message from props",
  },
  parameters: {
    docs: {
      description: {
        story:
          "LocationPin component with custom loading, error, and default location messages. Customize these messages to suit your application's needs.",
      },
    },
  },
};

export const WithSelectedPlaces: Story = {
  args: {
    locationType: [LocationType.CITY, LocationType.STATE],
  },
  parameters: {
    docs: {
      description: {
        story: "LocationPin component to display selected city and state",
      },
    },
  },
};
