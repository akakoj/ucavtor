/*!
 * Vendor
 */

import axios from 'axios';
import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Row, Col, Button, Icon } from 'antd';

/*!
 * Components
 */

import Site from '../components/layout';

const Devider = styled.hr`
  width: 15%;
  margin: 30px auto;
  border-color: #999;
`;

const OrderButton = styled(Button)`
  width: 100%;
  margin: 0 20px;
`;

/*!
 * Expo
 */

const Course = ({
  course: { title, description, name, content, thumb, duration, price }, settings,
}) => (
  <Site title={title} description={description} settings={settings}>
    <section className="uc-container">
      <div className="article">
        <header className="article__header" style={{ textAlign: 'center' }}>
          <h1 className="article__title">{name}</h1>
          <Devider />
        </header>
         <Row className="article__body">
          <Col span={18} className="article__content" style={{ borderRight: '1px solid #eee' }}>
            <figure className="article__img-container">
              <img src={thumb} style={{ maxWidth: 800, width: '100%' }} />
            </figure>
            <section dangerouslySetInnerHTML={{ __html: content }} />
          </Col>
          <Col span={6} className="article__properties">
            <ul className="params" style={{ listStyle: 'none' }}>
              <li className="params__item">
                <Icon type="clock-circle-o" className="params__icon" />
                <span className="params__text">{duration} ч.</span>
              </li>
              <li className="params__item">
                <Icon type="shopping-cart" className="params__icon" />
                <span className="params__text">{price} руб.</span>
              </li>
            </ul>
            <Link href="/auth">
              <OrderButton type="primary" size="large">Заказать</OrderButton>
            </Link>
          </Col>
        </Row>
      </div>
    </section>
  </Site>
);

Course.getInitialProps = async ({ query }) => {
  try {
    const [courseRes, settingsRes] = await Promise.all([
      axios.get(`http://api.ucavtor.ru/courses/${query.slug}`),
      axios.get('http://api.ucavtor.ru/settings'),
    ]);

    const settings = {};

    if (Array.isArray(settingsRes.data) && !!settingsRes.data.length) {
      settingsRes.data.forEach(({ value, slug }) => settings[slug] = value);
    }

    return {
      settings,
      course: courseRes.data,
    };
  } catch (e) {
    return {};
  }
};

export default Course;
