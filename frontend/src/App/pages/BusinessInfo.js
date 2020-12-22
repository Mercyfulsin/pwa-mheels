import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Container, Card, CardBody, CardHeader } from 'reactstrap';
import { Redirect } from "react-router-dom";
import Category from '../components/Category';
import API from '../utils/API';

class BusinessInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth0: this.props.user,
            owner: '',
            storeName: '',
            categories: '',
            city: '',
            state: '',
            items: [],
            status: 0,
            vendor: [],
            isupdate: false
        }
    }

    componentDidMount() {
        this.setState({ items: Category });
        if (this.props.vendorId) {
            this.setState({ isupdate: true });
            API.getVendor(this.props.vendorId)
                .then(result => {
                    console.log(result)
                    if (result.data && result.data.length) {
                        const vendorInfo = result.data[0] != null ? result.data[0] : null;

                        this.setState({ vendor: vendorInfo });
                        this.setState({ owner: this.state.vendor.owner });
                        this.setState({ storeName: this.state.vendor.storeName });
                        this.setState({ categories: this.state.vendor.categories });
                        this.setState({ city: this.state.vendor.city });
                        this.setState({ state: this.state.vendor.state });
                        this.setState({ menu: this.state.vendor.menu });
                    }
                })
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = e => {
        if (this.state.isupdate) {
            this.updateVendor(e);
        } else {
            this.createVendor(e);
        }

    }

    // Create a new Vendor
    createVendor = () => {
        const menuObj = { menuName: this.state.storeName, food: [] };

        // All Vendors need a Menu, create one and save it's _ID as ref for Vendor
        API.createMenu(menuObj)
            .then(reply => {

                // Checking the ID and what type, should be ObjectId (MongoDB)
                console.log("This is the reply: ", reply, reply.data._id);
                console.log("Type of ID", typeof (reply.data._id));

                API.createTweetTable({ tweet: [] })
                    .then(table => {
                        let newVendor = {
                            storeName: this.state.storeName,
                            owner: this.state.owner,
                            ownerId: this.state.auth0,
                            location: [0, 0],
                            status: false,
                            tweetTable: table.data._id,
                            categories: [this.state.categories],
                            city: this.state.city ? this.state.city : '',
                            state: this.state.state ? this.state.state : '',
                            menu: reply.data._id
                        }
                        console.log("Object to be Submitted: ", newVendor);
                        API.createVendor(newVendor)
                            .then(reply => {
                                console.log(reply);
                                this.setState({ status: 1 });
                            }).catch(err => console.log("Vendor err: ", err));
                    })

            }).catch(err => console.log(err));
    }

    updateVendor = e => {
        e.preventDefault();
        this.props.toggler();
        let updatedVendor = {
            id: this.state.vendor._id,
            storeName: this.state.storeName,
            owner: this.state.owner,
            ownerId: this.state.auth0,
            categories: [this.state.categories],
            city: this.state.city ? this.state.city : '',
            state: this.state.state ? this.state.state : '',
            menu: this.state.vendor.menu
        }
        API.updateVendor(updatedVendor)
            .then(reply => {
                this.setState({ status: 0 });
                this.props.setIsUpdated(false);
            }).catch(err => console.log("Vendor err: ", err));
    }

    render() {
        switch (this.state.status) {
            case 0:
                return (
                    <Container className="mb-3">
                        <Row>
                            <Col sm="12">
                                <Card>
                                    <CardHeader ><strong>Business Information</strong> </CardHeader>
                                    <CardBody>
                                        <Form>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    name="owner"
                                                    id="contact"
                                                    onChange={this.handleInputChange}
                                                    placeholder="Owner"
                                                    defaultValue={this.state.vendor.owner ? this.state.vendor.owner : ""}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    name="storeName"
                                                    id="business-name"
                                                    onChange={this.handleInputChange}
                                                    placeholder="Business name"
                                                    defaultValue={this.state.vendor.storeName ? this.state.vendor.storeName : ""}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    name="city"
                                                    onChange={this.handleInputChange}
                                                    placeholder="City (optional)"
                                                    defaultValue={this.state.vendor.city ? this.state.vendor.city : ""}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    name="state"
                                                    onChange={this.handleInputChange}
                                                    placeholder="State (optional)"
                                                    defaultValue={this.state.vendor.state ? this.state.vendor.state : ""}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="category-list">Category</Label>
                                                <Input
                                                    type="select"
                                                    name="categories"
                                                    id="category-list"
                                                    onChange={this.handleInputChange}
                                                    placeholder="Select Business Category"
                                                >
                                                    <option>{this.state.vendor.categories ? this.state.vendor.categories : "Select Category"}</option>
                                                    {this.state.items.map(choice =>
                                                        <option key={choice}>
                                                            {choice}
                                                        </option>
                                                    )}
                                                </Input>
                                            </FormGroup>
                                        </Form>
                                        <Button
                                            color="success"
                                            disabled={!(this.state.owner && this.state.storeName)}
                                            onClick={this.handleFormSubmit}
                                        >
                                            Submit
                                    </Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                )
            case 1:
                return <Redirect to='/menu' />
            case 2:
                return (<div>
                    <Redirect to='/profile' /></div>)
        }
    }
}
export default BusinessInfo;