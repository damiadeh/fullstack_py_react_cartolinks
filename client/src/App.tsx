import React, {} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import FileList from './pages/Filelist';
import { GlobalStyle } from './styles/GlobalStyles';
import { GlobalProvider } from './context/GlobalContext';
import PrivateRoute from './routes/PrivateRoute';
import Home from './pages/Home';


// Main App component
const App: React.FC = () => {

  return (
    <GlobalProvider>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/files" element={<PrivateRoute>
            <FileList />
          </PrivateRoute>} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
};

export default App;
