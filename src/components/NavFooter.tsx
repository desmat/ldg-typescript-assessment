import GitHubLogo from "./GitHubLogo";

export default function NavFooter() {
  return (
    <div className="Nav NavFooter">
      <div className="NavFooterContent">
        <a href="https://www.desmat.ca" target="_blank" rel="noreferrer">www.desmat.ca</a>
        <a href="mailto:resume@desmat.ca" target="_blank" rel="noreferrer">@desmat.ca</a>
        <a href="https://github.com/desmat" target="_blank" rel="noreferrer" className="github">
          <GitHubLogo width="1.2rem" height="1.2rem" />
          desmat
        </a>
      </div>
    </div>
  );
}
