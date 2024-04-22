import { GoogleLogin } from "@react-oauth/google";
import { addHours } from "date-fns";
import { useState } from "react";

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts: string[] = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

function App() {
 
  const now = new Date();
  const newTime = addHours(now , 2)
  async function createCalendarEvent() {
    console.log("Creating calendar event");
    const event = {
      'summary': "Testing calendar api",
      'description': "testing calendar api",
      'start': {
        'dateTime': now.toISOString(), // Date.toISOString() ->
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
      },
      'end': {
        'dateTime': newTime.toISOString(), // Date.toISOString() ->
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
      }
    }

    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        'Content-type' : "application/json; charset=UTF-8",
        'Authorization':`Bearer ${getCookie("test_key")}` // Access token for google
      },
      body: JSON.stringify(event)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      alert("Event created, check your Google Calendar!");
    });
  }
  console.log("test_key", getCookie("test_key"))
  return (
    <>
    <GoogleLogin
    onSuccess={credentialResponse => {
        document.cookie = `test_key=${credentialResponse.credential};`
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  />

  <p>Start of your event</p>
  
  <p>End of your event</p>

  <button onClick={()=> createCalendarEvent()}> Post </button>
  </>
  )
  
}

export default App
