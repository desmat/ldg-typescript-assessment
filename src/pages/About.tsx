import Logo from '../components/Logo';

export default function About() {
  return (
    <div className="About p-2">
      <p className="p-4">
        <Logo fill="#282c34" height="8rem" />
      </p>
      <p className="p-2">
        This is my submission to LegionDevelopmentGroup's Typescript Assessment.
      </p>
      <p className="p-2">
        This is based on create-react-app and per instructions uses react-boostrap as its UI framework.
        I used react-query to manage external data access and to a minor extent state management.
      </p>
      <p className="p-2">
        Assessment instructions: XXX
        <br />
        Submission repo: XXX
        <br />
        Deployed: XXX
      </p>
      <p className="p-2">
        Submitted by: Mathieu Desjarlais
        <br />
        Github: XXX
        <br />
        Website: XXX
        <br />
        Email: XXX
      </p>
      <p className="p-4">
        <Logo fill="#282c34" height="8rem" />
      </p>
    </div>
  );
}
