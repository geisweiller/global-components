import { fireEvent, render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import * as stories from "./counter.stories";
import { composeStories } from "@storybook/react";

const { Default, WithCustomInitialValue } = composeStories(stories);

describe("Counter", () => {
  it("should render with default value", () => {
    render(<Default />);
    const counterValue = screen.getByText("1")

    expect(counterValue).toBeTruthy();
  });

  it("should render with custom value", () => {
    render(<WithCustomInitialValue />)
    const counterValue = screen.getByText("10")

    expect(counterValue).toBeTruthy();
  })

  it("should increment counter", () => {
    render(<Default />);
    const incrementButton = screen.getByText("plus")

    fireEvent.click(incrementButton)

    const counterValue = screen.getByText("2")

    expect(counterValue).toBeTruthy();

  })

  it("should decrement counter", () => {
    render(<WithCustomInitialValue />)
    const decrementButton = screen.getByText("minus")

    fireEvent.click(decrementButton)

    const counterValue = screen.getByText("9")

    expect(counterValue).toBeTruthy()
  })
});
