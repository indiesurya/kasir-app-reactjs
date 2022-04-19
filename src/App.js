import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavbarComponent, ListCategories, Hasil, Menus } from "./Components";
import { API_URL } from "./utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoryChoose: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoryChoose)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
    
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //apabila ada update dihalaman hasil maka dilakukan pengecekan perubahan pada isi keranjang sebelumnya
  componentDidUpdate(prevState){
    if(this.state.keranjangs !== prevState.keranjangs){
      axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  changeCategory = (value) => {
    this.setState({
      categoryChoose: value,
      menus: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  menuKeranjang = (value) => {
    //get data di API
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            totalHarga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang!",
                text: keranjang.product.nama + " Sukses Masuk Keranjang!",
                icon: "success",
                button: false,
                timer:1500
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
        else{
          const keranjang = {
          jumlah: res.data[0].jumlah+1,
          totalHarga: res.data[0].totalHarga+value.harga,
          product: value
          };
          //update data jika lebih dari 0
          axios
            .put(API_URL + "keranjangs/"+res.data[0].id, keranjang )
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang!",
                text: keranjang.product.nama + " Sukses Masuk Keranjang!",
                icon: "success",
                button: false,
                timer:1500
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { menus, categoryChoose, keranjangs } = this.state;
    return (
      <div className="App">
        <NavbarComponent />
        <div className="mt-2">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                categoryChoose={categoryChoose}
              />
              <Col>
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <Row className="mt-2">
                  {menus &&
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        keranjang={this.menuKeranjang}
                      />
                    ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs}/>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
