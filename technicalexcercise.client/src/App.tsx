import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import ViewingArea from "./components/ViewingArea";

import { useState, useEffect } from "react";

import type { CarePlan } from "./types/CarePlan";
import type { ActiveCarePlan } from "./types/ActiveCarePlan";
import type { Error } from "./types/Error";

const App = () => {
  // set up state
  const [carePlans, setCarePlans] = useState<CarePlan[]>([]);
  const [activeCarePlan, setActiveCarePlan] = useState<ActiveCarePlan>({});
  const [error, setError] = useState<Error>();

  // fetch data here
  async function getCarePlanData() {
    const response = await fetch("api/CarePlan");
    const data = await response.json();

    setCarePlans(data);
  }

  useEffect(() => {
    try {
      getCarePlanData();
      setError(null);
    } catch (e: any) {
      setError(e);
    }
  }, []);

  return (
    <div className="max-h-screen h-screen w-screen">
      <Navbar
        carePlans={carePlans}
        setCarePlans={setCarePlans}
        setActiveCarePlan={setActiveCarePlan}
        activeCarePlan={activeCarePlan}
      />
      {/* viewing area */}
      {error !== null ? (
        <div className="max-h-[calc(100%-56px)] h-[calc(100%-56px)] flex divide-x divide-slate-500">
          {/* left hand side bar */}
          <SideBar
            carePlans={carePlans}
            activeCarePlan={activeCarePlan}
            setActiveCarePlan={setActiveCarePlan}
          />
          {/* right hand viewing area */}
          <ViewingArea
            carePlans={carePlans}
            setCarePlans={setCarePlans}
            setActiveCarePlan={setActiveCarePlan}
            activeCarePlan={activeCarePlan}
          />
        </div>
      ) : (
        <div>Error fetching Care Plans: ${error}</div>
      )}
    </div>
  );
};
export default App;
