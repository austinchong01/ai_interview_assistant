import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import "./App.css";
import Test from './components/Test';
import Health from './components/Health';
import Form from './components/Form';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/health" element={<Health />} />
        <Route path="/" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
