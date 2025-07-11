import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileList from './FileList.jsx';
import TestScreen from './TestScreen.jsx';
import QuestionScreen from './QuestionScreen.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileList />} />
        <Route path="/question/:file" element={<QuestionScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
