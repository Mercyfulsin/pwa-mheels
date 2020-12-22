import React, { useState, useEffect } from "react";
import { Card, Collapse, CardFooter, CardText, CardBody, CardHeader, Container, Row, Col } from 'reactstrap';
import Loading from "../components/Loading";
import { useAuth0 } from "../../react-auth0-spa";
import BusinessInfo from "../pages/BusinessInfo";
import API from "../utils/API"

const Profile = (prop) => {
  const { loading, user } = useAuth0();
  const [isUpdated, setIsUpdated] = useState(false);
  const [vendorData, setVendorData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!isUpdated) {
      getVendorInfo();
      setIsUpdated(true);
    }
  });

  function getVendorInfo() {
    API.getVendor(user.sub)
      .then(result => {
        console.log(result)
        if (result.data && result.data.length) {
          const vendorInfo = result.data[0] != null ? result.data[0] : null;
          setVendorData(vendorInfo);
        }
      })
  }
  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div>
      <Container className="mb-5">
        <Row>
          <Col sm="12">
            <Card >
              <CardHeader tag="h5" className="text-center" style={{ color: '#FA783F' }}>
                Business Info Summary
                </CardHeader>
              <CardBody>
                <CardText>Owner Name: {vendorData ? vendorData.owner : ""}</CardText><hr></hr>
                <CardText>Business Name: {vendorData ? vendorData.storeName : ""}</CardText><hr></hr>
                <CardText>Category: {vendorData ? vendorData.categories : ""}</CardText><hr></hr>
                <CardText>City: {vendorData ? vendorData.city : ""}</CardText><hr></hr>
                <CardText>State: {vendorData ? vendorData.state : ""}</CardText>
              </CardBody>
              <CardFooter tag="h5" className="text-center" style={{ color: '#FA783F' }} onClick={toggle}>Update Business Information</CardFooter>
              <Collapse isOpen={isOpen}>
                <BusinessInfo vendorId={user.sub} toggler={toggle} setIsUpdated={setIsUpdated} />
              </Collapse>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
