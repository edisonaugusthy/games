import React from 'react';
import Logo from './Logo';
import './Header.scss';
import { Col, Row } from 'antd';
interface HeaderProps {
  title: string;
  subtitle?: string;
  isLoggedIn?: boolean;
}

const Header: React.FC<HeaderProps> = props => (
  <Row className="header">
    <Col span={2}>
      <Logo />
    </Col>
    <Col span={5}></Col>
    <Col span={8}>
      <div className="title-container">
        <h3 className="title">{props.title}</h3>
        <h6 className="sub-title">{props.subtitle}</h6>
      </div>
    </Col>
  </Row>
);

export default Header;
