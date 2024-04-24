import { addHours } from "date-fns";
import { useState } from "react";
import getUser, { User } from "./api/UserApi";
import { useQuery } from "@tanstack/react-query";

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts: string[] = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

export const deleteCookie = (name: string) => {
  document.cookie = name + '=; Max-Age=-9999999999;';
}

// Access token from url ${location.hash.slice(1).split("&")[1].split("=")[1]} 

function App() {
  const [profile, setProfile] = useState<User>();

  console.log("Api key: ", import.meta.env.VITE_APP_API_KEY);

  const now = new Date();
  const newTime = addHours(now, 2)

  if (location.hash) {
    const params = new URLSearchParams(location.hash);
    const accessToken = params.get('access_token');

    setCookie('access_token', accessToken!, 1);
    location.href = 'http://localhost:5173'
  };


  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUser
  })


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
        'Authorization': `Bearer ${getCookie("access_token")}` // Access token for google
      },
      body: JSON.stringify(event)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      alert("Event created, check your Google Calendar!");
    });
  }

  const createProfile = () => {
    const user: User = {
      picture: data.photos[0].url,
      name: data.names[0].displayName,
      email: data.emailAddresses[0].value
    }
    console.log(user);

    setProfile(user);
  }

  const login = () => {
    location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/calendar&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=http://localhost:5173&client_id=${import.meta.env.VITE_APP_CLIENT_ID}`;
  }

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    setProfile(undefined);
    deleteCookie("access_token");
    window.location.reload();
  };

  if (isLoading) {
    return <p>Loading ...</p>
  }

  if (data && !profile) {
    createProfile();
  }

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
