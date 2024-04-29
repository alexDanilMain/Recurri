import Calendar from "react-calendar";
import Home from "./components/Home/Home";
import Overview from "./components/Home/Overview/Overview";
import Login from "./components/Login/Login";
import CustomCalendar from "./components/TemplatePage/Calendar";
import { useState } from "react";
import "./App.css";


export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts: string[] = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

function App() {
  const [date, setDate] = useState<any>(new Date());
  const [selectRange, setSelectRange] = useState<boolean>(false);
  return (
    <>
      <div className="App" style={{ display: "grid", placeItems: "center" }}>
      <Calendar
        date={date}
        setDate={setDate}
        selectRange={selectRange}
        setSelectRange={setSelectRange}
      />
    </div>
    </>
  )

}

export default App