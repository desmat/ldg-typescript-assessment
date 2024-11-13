import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import '../index.css';

function About() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="ldg-logo" alt="logo" />
        <p>
          About page
        </p>
        <Link to="/">Back</Link>
      </header>
    </div>
  );
}

export default About;
