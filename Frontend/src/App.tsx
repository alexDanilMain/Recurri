import { TokenResponse, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { addHours } from "date-fns";
import { useState } from "react";

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts: string[] = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

function App() {
  const [profile, setProfile] = useState<any>([]);

  const now = new Date();
  const newTime = addHours(now, 2)
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
        'Content-type': "application/json; charset=UTF-8",
        'Authorization': `Bearer ${location.hash.slice(1).split("&")[1].split("=")[1]}` // Access token for google
      },
      body: JSON.stringify(event)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      alert("Event created, check your Google Calendar!");
    });
  }

  const login = () => {
    location.href = 'https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/calendar&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=http://localhost:5173&client_id=1021052820543-fm1vrkkpkq1idpvckttevn0ir9d9qdc2.apps.googleusercontent.com';
  }

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };
  return (
    <>
      <div>
        <h2>React Google Login</h2>
        <br />
        <br />
        {profile ? (
          <div>
            <img src={profile.picture} alt="user image" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <button onClick={logOut}>Log out</button>
          </div>
        ) : (
          <button onClick={login}>Sign in with Google 🚀 </button>
        )}
      </div>

      <button onClick={() => createCalendarEvent()}> Post </button>
    </>
  )

}

export default App
