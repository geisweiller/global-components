import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import * as stories from "./progress.stories";
import { composeStories } from "@storybook/react";

const { Default, InBar, InBarAnTaskInformation, IndeterminateTaskWithCompletion, TaskInformation } = composeStories(stories);

describe("Progress components tests", () => {
  it("should render Primary", () => {
    render(<Primary />);

    expect(screen.getByText("bar")).toBeTruthy();
  });
});
