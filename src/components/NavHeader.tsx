import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function NavHeader() {
  return (
    <div className="Nav NavHeader">
      <Stack direction="horizontal" gap={0}>
        <div className="p-2 flex ">
          <Link to="/">
            <Stack direction="horizontal" gap={2}>
              <Logo fill="white" height="3rem" />
              <div><b>LDG Typescript Assessement</b></div>
            </Stack>
          </Link>
        </div>
        <div className="ms-auto"></div> {/* spacer */}
        <div className="p-2"><Link to="/"><b>Dashboard</b></Link></div>
        <div className="p-2"><Link to="/about"><b>About</b></Link></div>
      </Stack>
    </div>
  );
}
