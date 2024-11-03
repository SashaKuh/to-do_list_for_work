import { Suspense } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import Login from '../page/Login/Login';
import Register from '../page/Register/Register';
import Home from '../page/Home/Home';
import NotFound from '../page/NotFound/NotFound';
import Profile from '../page/Profile/Profile';

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="signin">SignIn</NavLink>
          <NavLink to="signup">SignUp</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
