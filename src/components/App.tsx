import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Header from '../components/Header/Header';
import RegisterPage from '../page/RegisterPage/RegisterPage';
import LoginPage from '../page/LoginPage/LoginPage';
import TasksPage from '../page/TasksPage/TasksPage';
import useAuthRedirect from '../hooks/useAuthRedirect';
import { getAccessToken } from '../services/auth';
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = getAccessToken();
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => {
  useAuthRedirect();

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route
              path="todolists"
              element={
                <ProtectedRoute>
                  <TasksPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
};

export default App;
