import { render, screen, waitFor } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";

import * as stories from "./locationPin.stories";
import { composeStories } from "@storybook/react";

const { Default, WithCustomMessages } = composeStories(stories);

vi.stubGlobal('navigator', {
  geolocation: {
    getCurrentPosition: vi.fn().mockImplementation((success) => {
      success({ coords: { latitude: 12.34, longitude: 56.78 } });
    }),
  },
});

const mockResponse = (body: string) => {
  return new Response(body, {
    status: 200,
    statusText: "OK",
    headers: {
      'Content-type': 'application/json'
    }
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
global.fetch = vi.fn().mockImplementation((_url) =>
  Promise.resolve(mockResponse(JSON.stringify({ address: { city: 'Test City' } })))
);

describe("Location Pin tests ", () => {
  it("should render default loading message if we dont wait for location fecth to resolve", async () => {
    render(<Default />);

    expect(screen.getByText("Searching location...")).toBeTruthy();
  });
  it("should render custom loading message if we dont wait for location fecth to resolve", async () => {
    render(<WithCustomMessages />);

    expect(screen.getByText("Loading message from props")).toBeTruthy();
  }); 
  it("should render the location name after fetching", async () => {
    render(<Default />);

    await waitFor(() => {
      expect(screen.getByText("Test City")).toBeTruthy();
    });
  });


});
