import { render, screen, waitFor, } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import * as stories from "./progress.stories";
import { composeStories } from "@storybook/react";

const { Default, IndeterminateTaskWithCompletion, InBarAnTaskInformation} = composeStories(stories);

describe("Progress components tests", () => {
  it("should render default starting with some tasks already completed",() => {
    render(<Default tasksCompleted={40}/>);

    
      expect(screen.getByText("40%")).toBeTruthy();
 
  });

  it("should be able to calculate porcentage corectly", () => {
    render(<Default totalOfTasks={180} tasksCompleted={90}/>);

      expect(screen.getByText("50%")).toBeTruthy();
  });

  it("should be able to turn into spinner if totalOfTasks is not provided", () => {
   
    render(<IndeterminateTaskWithCompletion tasksCompleted={90} totalOfTasks={undefined}/>);

  
    const spinnerElement = document.querySelector(".animate-spin");
    expect(spinnerElement).toBeTruthy();
  });

  it("should display Completed when progress reaches the End", async ()=>{
    const {rerender} = render(<Default tasksCompleted={0}/>);

    setTimeout(()=>{
      rerender(<Default tasksCompleted={100} totalOfTasks={100}/>)
    },300)

    await waitFor(() => {
      expect(screen.getByText("Completed!")).toBeTruthy();
    });
  })

  it("should render the progress bar with correct width when isInBar is true", () => {
        render(<InBarAnTaskInformation tasksCompleted={30} />);
        
        const totalBar = document.querySelector(".bg-gray");
        expect(totalBar).toBeTruthy();

        const progressBar = document.querySelector('.bg-blue-600');
        if (progressBar) {
          const progressBarStyle = window.getComputedStyle(progressBar);
          expect(progressBarStyle.width).toBe(30)
        }
    })

    it("should display the tasks when tasksInformation is provided", ()=> {
      render(<Default taskInformation="Task 1"  />);

      expect(screen.getByText("Task 1")).toBeTruthy();
    })
});
