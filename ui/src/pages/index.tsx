import React from 'react';
import { Layout } from '../shared/layout';
import Header from '../shared/components/header/Header';

class IndexPage extends React.Component {
  constructor() {
    super({});
  }

  render() {
    return (
      <Layout>
        <div className="header-container flex flex-row flex-center flex-even">
          <Header title="Home" subtitle="see the game list" />
        </div>
      </Layout>
    );
  }
}

export default IndexPage;
