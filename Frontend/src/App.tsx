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
  const newTime = addHours(now, 2);

  async function createCalendarEvent() {
    console.log("Creating calendar event");
    const event = {
      'summary': "hejhejhej",
      'description': "Testing calendar api",
      'start': {
        'dateTime': now.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      'end': {
        'dateTime': newTime.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    };

    const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${getCookie("test_key")}`
      },
      body: JSON.stringify(event)
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      alert("Event created, check your Google Calendar!");
    } else {
      console.error("Failed to create event:", data);
      alert("Failed to create event. Check console for more information.");
    }
  }

  console.log("test_key", getCookie("test_key"));

  return (
    <>
      <GoogleLogin
  onSuccess={async (credentialResponse) => {
    console.log("Received credentials:", credentialResponse);
    const authCode = credentialResponse.credential;
    console.log("Authorization Code to exchange:", authCode);

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: authCode,
        client_id: '1021052820543-fm1vrkkpkq1idpvckttevn0ir9d9qdc2.apps.googleusercontent.com',
        client_secret: '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',
        redirect_uri: 'http://localhost:5173',
        grant_type: 'authorization_code'
      })
    });

    const responseBody = await tokenResponse.text(); // To log raw response body
    console.log("Token exchange response body:", responseBody);

    if (tokenResponse.ok) {
      const data = JSON.parse(responseBody);
      const accessToken = data.access_token;
      console.log('Access Token:', accessToken);
      document.cookie = `test_key=${accessToken};`;
    } else {
      console.error("Token exchange failed:", responseBody);
    }
  }}
  onError={(error) => {
    console.log('Login Failed:', error);
  }}
/>


      <p>Start of your event</p>
      <p>End of your event</p>

      <button onClick={() => createCalendarEvent()}> Post </button>
    </>
  )
}

export default App;
