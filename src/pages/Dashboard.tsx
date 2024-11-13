import { Link } from 'react-router-dom';
import '../App.css';
import Logo from '../components/Logo';

function Dashboard() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo fill="white" height="15rem" />
        <p>
          Dashboard page
        </p>
        <Link to="/about">About</Link>
      </header>
    </div>
  );
}

export default Dashboard;
