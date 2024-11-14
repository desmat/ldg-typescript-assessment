import Stack from 'react-bootstrap/Stack';
import NavFooter from './NavFooter';
import NavHeader from './NavHeader';

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
      <div className="Page-body p-2">
        {children}
      </div>
      <div className="Page-footer p-2">
        <NavFooter />
      </div>
    </Stack>
  );
}
