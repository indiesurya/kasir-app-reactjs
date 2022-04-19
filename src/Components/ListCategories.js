import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCoffee, faCheese } from "@fortawesome/free-solid-svg-icons";

const Icon = ({nama}) => {
    if(nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
    if(nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} className="mr-5" />
    if(nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="mr-5" />
}
export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const {categories} = this.state
    const {changeCategory, categoryChoose} = this.props
    return (
      <Col md={2} mt="3">
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <ListGroup className="mt-3">
            {categories && categories.map((category) => (
                <ListGroup.Item key={category.id} onClick={()=>changeCategory(category.nama)} className={categoryChoose === category.nama && "category-active"} style={{ cursor:'pointer' }}>
                    <Icon nama={category.nama}/> {category.nama}
                </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
