import { useState } from "react";
import { User } from "./api/UserApi";
import { deleteCookie } from "./helpers/CookieHelpers";
import Home from "./components/home/Home";
import Overview from "./components/overview/Overview";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";



// const LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/calendar&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=http://localhost:5173&client_id=`;


function App() {
  const [profile, setProfile] = useState<User>();

  if (profile) {
    sessionStorage.setItem("email", profile!.email);
  }

  // if (location.hash) {
  //   const params = new URLSearchParams(location.hash);
  //   const accessToken = params.get('access_token');

  //   setCookie('access_token', accessToken!, 1);
  //   location.href = import.meta.env.BASE_URL;
  // };

  // if (location.search) {
  //   const params = new URLSearchParams(location.search);
  //   const code = params.get('code');

  //   setCookie('code', code!, 1);
  //   getJsonWebToken();
  // };


  // const { data, isLoading } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: getUser
  // })


  // const createProfile = () => {
  //   const user: User = {
  //     picture: data.photos[0].url,
  //     name: data.names[0].displayName,
  //     email: data.emailAddresses[0].value
  //   }
  //   setProfile(user);
  // }

  // const login = () => {
  //   location.href = LOGIN_URL + import.meta.env.VITE_APP_CLIENT_ID;
  // }

  const logOut = () => {
    setProfile(undefined);
    deleteCookie("access_token");
    window.location.reload();
  };

  // const getJWT = async () => {
  //   location.href = "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?redirect_uri=http://localhost:5173&prompt=consent&response_type=code&client_id=1021052820543-fm1vrkkpkq1idpvckttevn0ir9d9qdc2.apps.googleusercontent.com&scope=openid&access_type=offline&service=lso&o2v=2&ddm=0&flowName=GeneralOAuthFlow";
  // }


  // if (data && !profile) {
  //   createProfile();
  // }

  return (
    <>
      <div>
        {/* {isLoading && <p>Loading ...</p>} */}
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
            {/* <button onClick={getJWT}>Get JWT</button> */}

            <Home />
            <Overview />
          </div>
        ) : (
          <div>
            {/* <Login handleClick={login} /> */}
            <GoogleLogin
              onSuccess={credentialResponse => {
                document.cookie = `google_login_key = ${credentialResponse.credential}`
                console.log(jwtDecode(credentialResponse.credential as string));
                setProfile(jwtDecode(credentialResponse.credential as string));
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        )}
      </div>
    </>
  )

}

export default App
