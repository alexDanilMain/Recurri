import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts: string[] = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

function App() {

  return (
    <>
      <Home></Home>
    </>
  )

}

export default App
