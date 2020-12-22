import React, { Component } from "react";
import { Card, Col, Row, Container, Form, FormGroup, ListGroup, ListGroupItem, Input, Button } from 'reactstrap';
import API from '../../utils/API';
import "./menu.css";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuitems: [],
      menuStatus: "Loading...",
      menu: '',
      foodName: "",
      price: "",
      description: "",
      auth0: props.user
    }
  }

  componentDidMount() {
    this.getMenu();
  }

  // Removes Food from Menu then Deletes Food from FoodDB
  deleteFood(foodId, ref) {
    this.setState({
      menuitems: this.state.menuitems.filter(obj => {
        return obj._id !== foodId;
      })
    });
    API.removeFood({ id: this.state.menu._id, foodId: foodId })
      .then(function (reply) {
        console.log("This is reply", reply, foodId);
        API.deleteFood(foodId)
          .then(reply => {
            console.log("Food:", reply);
            ref.getMenu();
          })
          .catch(err=> console.log(err));
      });
  }

  // Grabs Vendor obj, if they have a menu then grab it, else set status to no menu found
  getMenu() {
    API.getVendor(this.state.auth0)
      .then(result => {
        console.log("Getting Menu", result);
        const menu = result.data[0].menu;
        console.log("Menu: ", menu);
        menu ? this.getFood(menu) : this.setState({ menuStatus: "No Menu Found" });
      });
  }

  // Gets Menu Food Items by passing MenuID from VendorObj
  getFood(foodId) {
    console.log("Getting Food");
    API.getMenu(foodId)
      .then(data => {
        data.data.food.length ?
          this.setState({ menu: data.data, menuitems: data.data.food }) :
          this.setState({ menu: data.data, menuitems: [], menuStatus: "No Menu Found" });
      });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.foodName && this.state.price) {
      const newFood = {
        foodName: this.state.foodName,
        price: this.state.price,
        description: this.state.description != null ? this.state.description : ""
      };
      API.createFood(newFood, this.state.menu._id)
        .then(reply => {
          let newMenu = this.state.menuitems;
          newMenu.push(reply.data);
          this.setState({ foodName: "", price: "", description: "", menuitems: newMenu });
        });
    }
  };

  render() {
    return (
      <Container >
        <Row>
          <Col md="4">
            <h2>Add Menu Items</h2>
            <Form>
              <FormGroup>
                <Input
                  value={this.state.foodName}
                  onChange={this.handleInputChange}
                  name="foodName"
                  placeholder="item name (required)"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  value={this.state.price}
                  onChange={this.handleInputChange}
                  name="price"
                  placeholder="price (required)"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                  name="description"
                  placeholder="description (Optional)"
                />
              </FormGroup>
              <Button
                color="success"
                className="add-menu-item"
                disabled={!(this.state.price && this.state.foodName)}
                onClick={this.handleFormSubmit}
              >
                Add Menu Item
              </Button>
            </Form>
          </Col>
          <Col md={{ size: 8 }} sm="12">
            <h2 className="text-center">Menu</h2>
            <Card className="menu-display text-center">
              {this.state.menuitems.length ? (
                <ListGroup>
                  {this.state.menuitems.map(item => (
                    <ListGroupItem key={item._id} >
                      <strong>
                        {item.foodName}
                      </strong>
                      {" . . . . . . . . . . . . . . . "} ${item.price}
                      <span className="delete-btn" role="button" tabIndex="0" onClick={() => { this.deleteFood(item._id, this) }}>
                        ✗
                    </span> <br />
                      <p>
                        {item.description}
                      </p>

                    </ListGroupItem>
                  ))}
                </ListGroup>
              ) : (
                  <p className="text-center">{this.state.menuitems.length ? '' : this.state.menuStatus}</p>
                )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Menu;
