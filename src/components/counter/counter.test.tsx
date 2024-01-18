import { fireEvent, render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import * as stories from "./counter.stories";
import { composeStories } from "@storybook/react";

const { Default, WithCustomInitialValue } = composeStories(stories);

describe("Counter", () => {
  it("should render with default value", () => {
    render(<Default />);
    const counterValue = screen.getByText("1");

    expect(counterValue).toBeTruthy();
  });

  it("should render with custom value", () => {
    render(<WithCustomInitialValue />);
    const counterValue = screen.getByText("10");

    expect(counterValue).toBeTruthy();
  });

  it("should increment counter", () => {
    render(<Default />);
    const incrementButton = screen.getByText("plus");

    fireEvent.click(incrementButton);

    const counterValue = screen.getByText("2");

    expect(counterValue).toBeTruthy();
  });

  it("should decrement counter", () => {
    render(<WithCustomInitialValue />);
    const decrementButton = screen.getByText("minus");

    fireEvent.click(decrementButton);

    const counterValue = screen.getByText("9");

    expect(counterValue).toBeTruthy();
  });
  it("should enable the edit of number manually", () => {
    render(<Default />);
    const displayElement = screen.getByText("1")
    fireEvent.click(displayElement)

    const inputElement = screen.getByRole('spinbutton')
    fireEvent.change(inputElement, {target: {value: "99"}})

    fireEvent.blur(inputElement)

    const counterValue = screen.getByText("99");

    expect(counterValue).toBeTruthy()
  })
  it("should not be able to insert anything other than a number", () => {
    render(<Default />);
    const displayElement = screen.getByText("1")
    fireEvent.click(displayElement)

    const inputElement = screen.getByRole('spinbutton')
    fireEvent.change(inputElement, {target: {value: "this is not a number"}})

    fireEvent.blur(inputElement)

    const counterValue = screen.getByText("1");

    expect(counterValue).toBeTruthy()
  })
  it("should not be able to decrement past 1 using button", () => {
    render(<Default />);
    const decrementButton = screen.getByText("minus");

    fireEvent.click(decrementButton);

    const counterValue = screen.getByText("1");

    expect(counterValue).toBeTruthy();
  })
  it("should not be able to edit counter to zero", () => {
    render(<Default />);

    const displayElement = screen.getByText("1")
    fireEvent.click(displayElement)

    const inputElement = screen.getByRole('spinbutton')
    fireEvent.change(inputElement, {target: {value: "0"}})
    fireEvent.blur(inputElement)

    const counterValue = screen.getByText("1");

    expect(counterValue).toBeTruthy();
  })
  it("should not be able to edit counter to negative values", () => {
    render(<Default />);

    const displayElement = screen.getByText("1")
    fireEvent.click(displayElement)

    const inputElement = screen.getByRole('spinbutton')

    fireEvent.change(inputElement, {target: {value: "-2"}})
    fireEvent.blur(inputElement)

    const counterValue = screen.getByText("1");

    expect(counterValue).toBeTruthy();
  })
  it("should be able to acept multiple intercations sequencially", () => {
    render(<Default />);

    let displayElement = screen.getByText("1")
    fireEvent.click(displayElement)

    let inputElement = screen.getByRole('spinbutton')

    fireEvent.change(inputElement, {target: {value: "-2"}})
    fireEvent.blur(inputElement)
    expect(screen.getByText("1")).toBeTruthy();
   
    displayElement = screen.getByText("1")  // for some reason vitest get confused and the test fail if I dont redeclare this variables
    fireEvent.click(displayElement)

    inputElement = screen.getByRole('spinbutton') // for some reason vitest get confused and the test fail if I dont redeclare this variables
    fireEvent.change(inputElement, {target: {value: "3"}})
    fireEvent.blur(inputElement)
    expect(screen.getByText("3")).toBeTruthy();

    const decrementButton = screen.getByText("minus");

    fireEvent.click(decrementButton);

    expect(screen.getByText("2")).toBeTruthy();
  })
  it("should render 1 if props is negative number", () => {
    render(<Default index={-2} />);

    const counterValue = screen.getByText("1");

    expect(counterValue).toBeTruthy();
  })
  it("should render 1 if props zero", () => {
    render(<Default index={0} />);

    const counterValue = screen.getByText("1");

    expect(counterValue).toBeTruthy();
  })
 });


 