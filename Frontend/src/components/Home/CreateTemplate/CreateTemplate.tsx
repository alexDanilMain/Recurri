import { useState } from "react";
import WeekTable from "./WeekTable/WeekTable"

type Week = {
    name:string;
    id: string;
}
function CreateTemplate() {
    const [weeks, setWeeks] = useState<Week[]>([]); // State to manage weeks

    const handleAddWeek = () => {
        const newWeek = {name:"test", id:"test"}; // You can initialize your new week with any default values
        setWeeks((prevWeeks) => [...prevWeeks, newWeek]); // Add new week to the weeks array
    };
    return (
        <section className="px-4">
            <form action="">
                <button type="button" onClick={handleAddWeek} className="btn btn-sm">+ Add Week</button>
                <WeekTable />

                <input type="submit" className="btn btn-sm mt-4"  value="Create Template"/>
            </form>

          
        </section>
    )
}

export default CreateTemplate