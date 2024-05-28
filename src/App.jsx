import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import EventsTable from "./components/EventsTable.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/events" element={<EventsTable />} />
      </Routes>
    </Router>
  );
}

export default App;
