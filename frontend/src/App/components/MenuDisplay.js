import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem } from 'reactstrap';
import API from '../utils/API';

class MenuDisplay extends Component {
  constructor(props) {
    console.log("Menu Props");
    console.log(props);
    super(props);
    this.state = {
      menuId: props.menu,
      menuitems: [],
      menu: '',
      vendorId: this.props.vendorId
    }
  }


  componentDidMount() {
    console.log("First Mount");
    console.log(this.state.menuId);
    this.getFood(this.state.menuId);
  }

  getMenu() {
    API.getVendor(this.state.vendorId)
      .then(result => {
        console.log("Getting Menu", result);
        if (result.data && result.data.length) {
          const menu = result.data[0].menu != null ? result.data[0].menu : null;
          console.log("Menu: ", menu);
          menu ? this.getFood(menu) : this.setState({ menuStatus: "No Menu Found" });
        } else {
          this.setState({ menuStatus: "No Menu Found" });
        }
      });
  }

  getFood(foodId) {
    console.log("Getting Food");
    API.getMenu(foodId)
      .then(data => {
        console.log(data);
        data.data.food.length ?
          this.setState({ menu: data.data, menuitems: data.data.food }) :
          this.setState({ menu: data.data, menuitems: [], menuStatus: "No Menu Found" });
        console.log(this.state.menu);
        console.log("menu items");
        console.log(this.state.menuitems);
      });
  }

  render() {
    return (
      <div>
        <h3 className="text-center">Menu</h3>
        <Card className="menu-display" style={{ backgroundColor: 'rgb(249, 105, 42)' }}>

          <ListGroup>
            {this.state.menuitems.map(item => (
              <ListGroupItem key={item._id} >
                <strong>
                  {item.foodName}
                </strong>
                <span className="price text-right" style={{ float: 'right' }}>
                  ${item.price}
                </span><br />
                <p>
                  {item.description}
                </p>

              </ListGroupItem>
            ))}
          </ListGroup>

        </Card>
      </div>
    )
  }
}


export default MenuDisplay;
