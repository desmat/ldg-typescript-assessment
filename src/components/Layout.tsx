import { useEffect, useRef } from 'react';
import Stack from 'react-bootstrap/Stack';
import { useLocation } from 'react-router';
import NavFooter from './NavFooter';
import NavHeader from './NavHeader';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const pageBodyRef = useRef();
  const { pathname } = useLocation();

  // scroll page body to top when navigating
  useEffect(() => {
    // @ts-ignore
    pageBodyRef.current && pageBodyRef.current.scrollTo(0, 0);
  }, [pathname]);
    
  return (
    <Stack gap={0} className="Page mx-auto">
      <div className="Page-header px-2">
        <NavHeader />
      </div>
      {/* @ts-ignore */}
      <div className="Page-body p-2" ref={pageBodyRef}>
        {children}
      </div>
      <div className="Page-footer p-2">
        <NavFooter />
      </div>
    </Stack>
  );
}
