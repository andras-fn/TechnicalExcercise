// Imports
import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

// To Test
import App from "../../src/App";
import Navbar from "../../src/components/Navbar";

// Tests
describe("Renders main page correctly", async () => {
  afterEach(() => {
    cleanup();
  });

  it("Should render the navbar correctly", async () => {
    // Setup
    render(
      <Navbar
        carePlans={[]}
        setCarePlans={() => {}}
        activeCarePlan={{}}
        setActiveCarePlan={() => {}}
      />
    );
    const navbarTitle = await screen.queryByText("Care Plan Creator 3000");

    // Expectations
    expect(navbarTitle).not.toBeNull();
  });

  it("Should not show an error message from the API", async () => {
    // Setup
    render(<App />);
    const navbarTitle = await screen.queryByText("Error fetching Care Plans:");

    // Expectations
    expect(navbarTitle).toBeNull();
  });

  it('Should show the "create" button', async () => {
    // Setup
    await render(<App />);
    const button = await screen.queryByText("Create");

    // Expectations
    expect(button).not.toBeNull();
  });
});
