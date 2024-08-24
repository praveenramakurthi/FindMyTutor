import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { TutorProvider } from './Components/Context/Context';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <TutorProvider>
        <App />
      </TutorProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
