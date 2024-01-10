import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import * as stories from "./Button.stories";

const { Primary } = composeStories(stories);

describe("Linkbutton", () => {
  it("should render a Primary button", () => {
    render(<Primary />);

    expect(screen.getByText("Button")).toBeTruthy();
  });
});
