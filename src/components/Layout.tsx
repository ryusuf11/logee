import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="container">
      <div className="headerContainer">
        <div className="titleContainer">Telkom</div>
      </div>
      <div className="content">
        <div className="sidebarContainer">Menu</div>
        <div className="pageContainer">{children}</div>
      </div>
      <div className="footerContainer">footer</div>
    </div>
  );
};

export default Layout;
