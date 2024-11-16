import Stack from 'react-bootstrap/Stack';
import NavFooter from './NavFooter';
import NavHeader from './NavHeader';
import Logo from './Logo';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Stack gap={0} className="Page mx-auto">
      <div className="Page-header px-2">
        <NavHeader />
      </div>
      <div className="Page-body">
        <div
          style={{
            // background: "pink",
            width: "100vw",
            minHeight: "calc(100vh - 16rem)",
            height: "100%",
            // marginTop: 2
          }}
        >
          {children}
        </div>
        <div style={{ height: "8rem"}}>
          <Logo fill="#282c34" height="4rem" />
        </div>
        <div className="Page-footer">
          <NavFooter />
        </div>
      </div>
    </Stack>
  );
}
