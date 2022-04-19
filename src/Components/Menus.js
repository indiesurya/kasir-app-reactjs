import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from '../utils/utils'

const Menus = ({ menu, keranjang }) => {
  return (
    <Col className="mt-2 mb-2" md={4} xs={6}>
      <Card className="shadow"style={{ width: "18rem" }} onClick={()=>keranjang(menu)}>
        <Card.Img variant="top" src={"assets/images/"+menu.category.nama.toLowerCase()+"/"+menu.gambar} />
        <Card.Body>
          <Card.Title><strong>{menu.nama}</strong> ({menu.kode})</Card.Title>
          <Card.Text>
           Rp.{numberWithCommas(menu.harga)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
