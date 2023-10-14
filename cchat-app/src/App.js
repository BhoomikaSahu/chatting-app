import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./component/Join/Join.js";
import Chat from "./component/Chat/Chat.js";

// const ENDPOINT = 'http://localhost:5000/';
// const socket = socketIO(ENDPOINT, {transports: ['websocket']});

function App() {
  // socket.on("connect", () => {

  // })

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Join />} />
          <Route exact path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
