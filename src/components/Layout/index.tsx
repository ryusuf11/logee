import Link from 'next/link';
import React, { useMemo } from 'react';
import { MdLogout } from 'react-icons/md';
import { SiConfluence } from 'react-icons/si';
import { AiOutlineUser } from 'react-icons/ai';
import { useStoreUser } from '@/modules/user/userProvider';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { user } = useStoreUser();
  const router = useRouter();

  const title = useMemo(() => {
    return router.pathname === '/dashboard/account'
      ? 'Akun PPJK'
      : router.pathname == '/dashboard'
      ? 'Dashboard'
      : '';
  }, [router]);

  return (
    <div className="container">
      <aside className="sidebarContainer">
        <div className="leftContainer">
          <div>
            <SiConfluence size={24} />
          </div>
          <div>
            <MdLogout
              size={24}
              onClick={() => {
                deleteCookie('token');
                router.push('/');
              }}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            paddingRight: '0.75rem',
          }}
        >
          <div className="logoContainer">
            <div className="logoContainer__avatar">
              <AiOutlineUser size={36} />
            </div>
            <div className="logoContainer__user">
              <p>{user?.name}</p>
              <span>{user?.email}</span>
            </div>
          </div>
          <nav className="sidebarContainer__menu">
            <ul>
              <li className={router.pathname === '/dashboard' ? 'active' : ''}>
                <Link href="/dashboard" title="Dashboard">
                  Dashboard
                </Link>
              </li>
              <li
                className={
                  router.pathname === '/dashboard/account' ? 'active' : ''
                }
              >
                <Link href="/dashboard/account" title="Akun PPJK">
                  Akun PPJK
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <div className="contentContainer">
        <header className="headerContainer">
          <div className="titleContainer">{title}</div>
        </header>
        <main className="content">
          <div className="pageContainer">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
