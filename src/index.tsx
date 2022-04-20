import React from "react"; //mehr für den Ansatzt
//import ReactDOM from 'react-dom'; //wichtig für alte version
import App from './App';
import { createRoot } from 'react-dom/client';// wichtig für neue version

//neue version
const container = document.getElementById('root') as Element;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  )
//---------End neue Version -------

//alte version
/*  ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);  */
//----------end alte version-------
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
