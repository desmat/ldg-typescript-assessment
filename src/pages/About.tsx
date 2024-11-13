import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import '../index.css';

function About() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo fill="white" height="15rem" />
        <p>
          About page
        </p>
        <Link to="/">Back</Link>
      </header>
    </div>
  );
}

export default About;
