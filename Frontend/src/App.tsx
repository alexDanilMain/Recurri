import Home from "./components/Home/Home";
import Overview from "./components/Home/Overview/Overview";
import Login from "./components/Login/Login";

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts: string[] = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

function App() {

  return (
    <>
      <Home/>
    </>
  )

}

export default App
