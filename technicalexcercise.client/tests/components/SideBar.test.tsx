// Imports
import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// To Test
import SideBar from "../../src/components/SideBar";

describe("Check if the outside div for the sidebar is rendered", async () => {
  it("The outside div in the sidebar should exist", async () => {
    // Setup
    render(
      <SideBar
        carePlans={[]}
        activeCarePlan={{}}
        setActiveCarePlan={() => {}}
      />
    );
    const sidebarId = await document.querySelector("#sidebar-outside-div");

    // Expectations
    expect(sidebarId).not.toBeNull();
  });
});
