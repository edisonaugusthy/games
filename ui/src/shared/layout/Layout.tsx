import React from 'react';
import Helmet from 'react-helmet';
import './Layout.scss';
import { siteMetaData } from '../../config/siteMetaData';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>{siteMetaData.title}</title>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,400i,500,700,700i&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {children}
    </>
  );
};

export default Layout;
