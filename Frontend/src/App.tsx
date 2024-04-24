import { TokenResponse, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { addHours } from "date-fns";
import { useState } from "react";

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts: string[] = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

function App() {
  const [profile, setProfile] = useState<any>(null);

  const events = [
    {
      "summary": "Sprint Planning",
      "location": "Conference Room A, Office",
      "start": {
        "dateTime": "2024-09-04T09:00:00+02:00",
        "timeZone": "Europe/Stockholm"
      },
      "end": {
        "dateTime": "2024-09-04T11:00:00+02:00",
        "timeZone": "Europe/Stockholm"
      },
      "recurrence": [
        "RRULE:FREQ=WEEKLY;COUNT=2;BYDAY=TU" // Occurs first Tuesday of the Sprint
      ]
    },
    {
      "summary": "Daily Stand-up",
      "location": "Conference Room A, Office",
      "start": {
        "dateTime": "2024-09-04T10:00:00+02:00",
        "timeZone": "Europe/Stockholm"
      },
      "end": {
        "dateTime": "2024-09-04T10:15:00+02:00",
        "timeZone": "Europe/Stockholm"
      },
      "recurrence": [
        "RRULE:FREQ=DAILY;COUNT=10;BYDAY=MO,TU,WE,TH,FR" // Weekdays for two weeks excluding weekends
      ]
    },
    {
      "summary": "Sprint Review",
      "location": "Conference Room A, Office",
      "start": {
        "dateTime": "2024-09-15T15:00:00+02:00",
        "timeZone": "Europe/Stockholm"
      },
      "end": {
        "dateTime": "2024-09-15T16:00:00+02:00",
        "timeZone": "Europe/Stockholm"
      },
      "recurrence": [
        "RRULE:FREQ=WEEKLY;COUNT=2;BYDAY=FR" // Last Friday of the Sprint
      ]
    },
    {
      "summary": "Sprint Retrospective",
      "location": "Conference Room A, Office",
      "start": {
        "dateTime": "2024-09-15T16:00:00+02:00",
        "timeZone": "Europe/Stockholm"
      },
      "end": {
        "dateTime": "2024-09-15T17:00:00+02:00",
        "timeZone": "Europe/Stockholm"
      },
      "recurrence": [
        "RRULE:FREQ=WEEKLY;COUNT=2;BYDAY=FR" // Last Friday of the Sprint, following the Review
      ]
    }
  ];

  const B_events = [
    {
      "summary": "Coding Bootcamp Demo",
      "location": "Bootcamp Venue, Stockholm",
      "start": {
        "dateTime": "2024-09-02T15:00:00+02:00",
        "timeZone": "Europe/Stockholm"
      },
      "end": {
        "dateTime": "2024-09-02T16:00:00+02:00",
        "timeZone": "Europe/Stockholm"
      },
      "recurrence": [
        "RRULE:FREQ=WEEKLY;COUNT=11;BYDAY=MO"
      ]
    },
    {
      "summary": "Coding Bootcamp Lecture",
      "location": "Bootcamp Venue, Stockholm",
      "start": {
        "dateTime": "2024-09-03T09:00:00+02:00",
        "timeZone": "Europe/Stockholm"
      },
      "end": {
        "dateTime": "2024-09-03T10:00:00+02:00",
        "timeZone": "Europe/Stockholm"
      },
      "recurrence": [
        "RRULE:FREQ=WEEKLY;COUNT=11;BYDAY=TU,WE,TH,FR"
      ]
    }
  ];

  async function createCalendarEvents() {
    console.log("Creating multiple calendar events");

    const accessToken = location.hash.slice(1).split("&")[1].split("=")[1];

    const promises = events.map(event => {
      return fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        method: "POST",
        headers: {
          'Content-type': "application/json; charset=UTF-8",
          'Authorization': `Bearer ${accessToken}` // Access token for Google
        },
        body: JSON.stringify(event)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data;
      });
    });

    try {
      const results = await Promise.all(promises);
      alert("All events created, check your Google Calendar!");
      console.log(results);
    } catch (error) {
      console.error("Error creating events", error);
      alert("Failed to create events");
    }
  }

  const login = () => {
    location.href = 'https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/calendar&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=http://localhost:5173&client_id=1021052820543-fm1vrkkpkq1idpvckttevn0ir9d9qdc2.apps.googleusercontent.com';
  }

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <>
      <div>
        <h2>React Google Login</h2>
        <br />
        {profile ? (
          <div>
            <img src={profile.picture} alt="user image" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <button onClick={logOut}>Log out</button>
          </div>
        ) : (
          <button onClick={login}>Sign in with Google 🚀</button>
        )}
        <br />
        <button onClick={createCalendarEvents}>Post Multiple Events</button>
      </div>
    </>
  );
}

export default App;
