import { Routes, Route } from 'react-router-dom';
import HomePage from '../page/HomePage/HomePage';
import RegisterPage from '../page/RegisterPage/RegisterPage';
import LoginPage from '../page/LoginPage/LoginPage';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='login' element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
