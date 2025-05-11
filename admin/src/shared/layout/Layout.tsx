import React from 'react';
import Helmet from 'react-helmet';
import './Layout.scss';
import { siteMetaData } from '../../config/siteMetaData';

interface LayoutProps {
  children?: React.ReactNode;
}

class Layout extends React.Component<LayoutProps> {
  constructor(props: LayoutProps) {
    super(props);
  }

  render() {
    return (
      <div className="app-layout">
        <div className="app-layout-inner">
          {
            <Helmet>
              <title>{siteMetaData.title}</title>
              {/* TODO: The rest */}
              <link
                href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,400i,500,700,700i&display=swap"
                rel="stylesheet"
              ></link>
            </Helmet>
          }
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
