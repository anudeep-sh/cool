import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import RootReducer from './Redux/Index';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignInSignUp/SignIn';
// created a store and imported a rootReducer file
const store = createStore(RootReducer);

// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // redux store provider
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
