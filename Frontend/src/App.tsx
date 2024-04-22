import { GoogleLogin } from "@react-oauth/google";

function App() {

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
