import React, { Component } from "react";
import { Col, ListGroup,Row, Badge } from "react-bootstrap";
import { numberWithCommas } from '../utils/utils'

export default class Hasil extends Component {
  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} mt="3">
        <h4>
          <strong>Hasil</strong>
        </h4>
          <ListGroup variant="flush">
            {keranjangs.map((menu) => (
              <ListGroup.Item>
                <Row>
                  <Col md={2}>
                    <Badge pill bg="success">
                      {menu.jumlah}
                    </Badge>
                  </Col>
                  <Col>
                    <h5>{menu.product.nama}</h5>
                    <p>Rp.{numberWithCommas(menu.product.harga)}</p>
                  </Col>
                  <Col md={3}>
                    <p><strong>Rp.{numberWithCommas(menu.totalHarga)}</strong></p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
      </Col>
    );
  }
}
