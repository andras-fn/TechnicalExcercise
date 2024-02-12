import { useEffect, useState } from 'react';

type CarePlan = {
    id: string;
    title: string;
    patientName: string;
    userName: string;
    actualStartDateTime: string;
    targetStartDateTime: string;
    reason: string;
    action: string;
    completed: boolean | null;
    endDateTime: string | null;
    outcome: string| null;
}

type Error = string | null

function App() {
    const [careplans, setCareplans] = useState<CarePlan[]>();
    const [error, setError] = useState<Error>();

    async function getCareplanData() {
        const response = await fetch('api/careplan');
        const data = await response.json();
 
        setCareplans(data);
    }

    function splitOnT(value: string, timeOrDate: string) {
        if (timeOrDate === "date") {
            return value.split("T")[0]
        }
        if (timeOrDate === "time") {
            return value.split("T")[1]
        }
    }

    useEffect(() => {
        try {
            getCareplanData();
            setError(null)
        } catch (e: any) {
            console.log(e)
            setError(e)
        }
    }, []);

    const contents = careplans === undefined
        ? <p><em>Loading... a refresh may be required</em></p>
        : <table className="table table-striped bg-sky-500" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Patient Name</th>
                    <th>Users Name</th>
                    <th>Target Start Date</th>
                    <th>Target State Time</th>
                    <th>Actual Start Date</th>
                    <th>Actual State Time</th>
                    <th>Reason</th>
                    <th>Action</th>
                    <th>Completed</th>
                    <th>End Date</th>
                    <th>End Time</th>
                    <th>Outcome</th>
                </tr>
            </thead>
            <tbody>
                {careplans.map(careplan =>
                    <tr key={careplan.id}>
                        <td>{careplan.id}</td>
                        <td>{careplan.title}</td>
                        <td>{careplan.patientName}</td>
                        <td>{careplan.userName}</td>
                        <td>{splitOnT(careplan.targetStartDateTime, "date")}</td>
                        <td>{splitOnT(careplan.targetStartDateTime, "time")}</td>
                        <td>{splitOnT(careplan.actualStartDateTime, "date")}</td>
                        <td>{splitOnT(careplan.actualStartDateTime, "time")}</td>
                        <td>{careplan.reason}</td>
                        <td>{careplan.action}</td>
                        <td>{careplan.completed ? "Yes" : "No"}</td>
                        <td>{careplan.endDateTime ? splitOnT(careplan.endDateTime, "date") : ""}</td>
                        <td>{careplan.endDateTime ? splitOnT(careplan.endDateTime, "time") : ""}</td>
                        <td>{careplan.outcome}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 className="text-3xl font-bold underline text-white">
                Hello world!
            </h1>
            <h1 id="tabelLabel">Care Plan</h1>
            {error && <span>{ JSON.stringify(error)}</span>}
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    
}

export default App;