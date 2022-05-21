import Login from "./components/Login";

import Home from "./pages/Home";

import { useStateValue } from "./StaterProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return <div>{!user ? <Login /> : <Home />}</div>;
}

export default App;
