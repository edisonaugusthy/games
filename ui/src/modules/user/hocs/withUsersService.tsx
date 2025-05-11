import React from 'react';

function withUsersInfo(WrappedComponent: any) {
  class HOC extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return HOC;
}

export default withUsersInfo;
