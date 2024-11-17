import Logo from '../components/Logo';

export default function About() {
  return (
    <div className="About p-2">
      <p className="Logo p-4">
        <Logo fill="#282c34" height="15rem" />
      </p>
      <p className="p-2 justify">
        Submission to Legion Development Group Inc.'s Typescript Assessment.
      </p>
      <p className="p-2 left">
        Instructions: <a href="https://github.com/LegionDevelopmentGroup/typescript-assessment" target="_blank" rel="noreferrer">LegionDevelopmentGroup/typescript-assessment</a>
        <br />
        Submission: <a href="https://github.com/desmat/ldg-typescript-assessment" target="_blank" rel="noreferrer">desmat/ldg-typescript-assessment</a>
      </p>
      <p className="p-2">
        Submitted by <a href="mailto:resume@desmat.ca" target="_blank" rel="noreferrer">Mathieu Desjarlais</a>
      </p> 
    </div>
  );
}
