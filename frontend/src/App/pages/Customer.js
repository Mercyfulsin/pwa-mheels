import React, { useState, useEffect } from 'react';
import Searchbar from '../components/Searchbar';
import MenuDisplay from '../components/MenuDisplay';
import GoogleApiWrapper from '../components/MapApp';
import { Container, Row, Col } from 'reactstrap';


const Customer = () => {

  const [active, setActive] = useState({ state: false });
  const [menu, setMenu] = useState({ id: 0 });
  const [query, setQuery] = useState({ term: null });
  const changeState = bool => setActive({ state: bool });
  const updateMenu = menuId => { setMenu({ id: menuId }) };
  const updateQuery = term => { setQuery({ term: term }) };

  return (
    <Container className="mb-3">
      <Row>
        <Col lg={4}>
          {console.log("Customer Update:", query)}
          <Searchbar search={updateQuery} />
          {active.state && (<MenuDisplay menu={menu.id} />)}
        </Col>
        <Col lg={8}>
          <GoogleApiWrapper update={query} menu={updateMenu} active={changeState} />
        </Col>
      </Row>
    </Container>
  )
}

export default Customer;
