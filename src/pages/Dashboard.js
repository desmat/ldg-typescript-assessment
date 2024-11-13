import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';

function Dashboard() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="ldg-logo" alt="logo" />
        <p>
          Dashboard page
        </p>
        <Link to="/about">About</Link>
      </header>
    </div>
  );
}

export default Dashboard;
