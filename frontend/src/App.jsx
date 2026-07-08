import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './components/Splash';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Story from './pages/Story';
import Questionnaire from './pages/Questionnaire';
import Result from './pages/Result';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/signup" element={<Navigate to="/register" replace />} />

        {/* Protected Routes */}
        <Route 
          path="/story" 
          element={
            <ProtectedRoute>
              <Story />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/questionnaire" 
          element={
            <ProtectedRoute>
              <Questionnaire />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/result" 
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />

        {/* Catch All Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;