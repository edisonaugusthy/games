import { Spin } from 'antd';
import '../styles/FullPageLoader.scss';

const FullPageLoader = () => (
  <div className="full-page-loader">
    <Spin size="large" />
  </div>
);

export default FullPageLoader;
