import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileList from './FileList.jsx';
import TestScreen from './TestScreen.jsx';
import QuestionScreen from './QuestionScreen.jsx';

const base = import.meta.env.BASE_URL;

function App() {
  return (
    <Router basename={base}>
      <Routes>
        <Route path="/" element={<FileList />} />
        <Route path="/question/:file" element={<QuestionScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
