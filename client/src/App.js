// import logo from './logo.svg';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NotificationForm from './components/blocks/NotificationForm';
import NotificationList from './components/blocks/NotificationList';
import NotificationDetails from './components/blocks/NotificationDetails';
// import Test from './components/blocks/Test';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        {/* < Test /> */}
        {/* < NotificationForm /> */}
        <Router>
            <Routes>
                <Route path="/" element={<NotificationForm />} />
                <Route path="/lists" element={<NotificationList />} />
                <Route path="/notification/:id" element={<NotificationDetails />} />
            </Routes>
        </Router>
      </header>
    </div>
    
  );
}

export default App;
