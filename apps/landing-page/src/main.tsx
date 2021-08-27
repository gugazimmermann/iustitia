import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './scroll-to-top';

import App from './app/App';
import './styles.css';

ReactDOM.render(
  <StrictMode>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </StrictMode>,
  document.getElementById('root')
);
