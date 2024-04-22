import { GoogleLogin } from "@react-oauth/google";
import ApiCalendar from "react-google-calendar-api";

function App() {


  const config = {
    clientId: "1021052820543-fm1vrkkpkq1idpvckttevn0ir9d9qdc2.apps.googleusercontent.com",
    apiKey: import.meta.env.REACT_APP_API_KEY as string,
    scope: "https://www.googleapis.com/auth/calendar",
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    ],
  }

  const apiCalendar = new ApiCalendar(config);

  return (
    <GoogleLogin
    onSuccess={credentialResponse => {
        const expirationDate = new Date();
        console.log("entered")
        document.cookie = `test_key=${credentialResponse.credential};`
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  />
  )
  
}

export default App
