// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';
// import AdminPanel from './pages/AdminPanel/AdminPanel';
import LoginForm from './components/Forms/LoginForm';
import { createContext, useReducer } from 'react';
import AuthLayout from './layouts/AuthLayout';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import { initialState, reducer } from './reducer/UseReducer';

// creating userContext
export const UserContext = createContext();

// routes
export const Routing =() => {
    return (
        <Routes>
        <Route element={<MainLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
        </Route>    
        <Route element={<AuthLayout />}>
            <Route path='/admin-panel' element={<AdminPanel />} />
        </Route>    
      </Routes>
    )
}

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
        <UserContext.Provider value={{state, dispatch}}>
            <Routing />
        </UserContext.Provider>
    </>
  );
};

export default App;
