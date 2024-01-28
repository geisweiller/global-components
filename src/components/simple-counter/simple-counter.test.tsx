import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import * as stories from "./simple-counter.stories";
import { composeStories } from "@storybook/react";


const { Default, SimpleCounterWithClick, SimpleCounterWithTimer } = composeStories(stories);

describe("Simple Counter tests", () => {

  it("should render Default", () => {
    render(<Default index={3} />);

    expect(screen.getByText("3")).toBeTruthy();
  });

  it("should increment index by useState on parent component", () => {
    render(<SimpleCounterWithClick index={1}/>)

    const displayElement = screen.getByText("+");
    fireEvent.click(displayElement);

    expect(screen.getByText("2")).toBeTruthy();
  })

  it("should change index by useEffect on parent component", async ()=>{
    render(<SimpleCounterWithTimer index={1}/>)


    await waitFor(() => {
      expect(screen.getByText("2")).toBeTruthy();
    });
  })
});
