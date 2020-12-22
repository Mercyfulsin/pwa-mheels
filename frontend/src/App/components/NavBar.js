import React, { useState, useEffect } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VendorGeo from "./VendorLocation"
import API from "../utils/API";

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import logo from "../assets/tortaLogo_transparent.png";

import { useAuth0 } from "../../react-auth0-spa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  let [storeOpen, setStoreOpen] = useState(false);
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const grabStatus = () => {
      API.getVendor(user.sub)
        .then(vendor => {
          setStoreOpen(storeOpen = vendor.data[0].status);
        })
        .catch(err => console.log(err));
    };
    isAuthenticated ? grabStatus() : console.log("");
  });

  const shopStatus = (prop) => {
    console.log("I have received ", prop);
    API.getVendor(user.sub)
      .then(vendor => {
        setStoreOpen(storeOpen = !storeOpen);

        const newLocation = {
          id: vendor.data[0]._id, location: { location: prop }
        };
        API.setVendorLocation(newLocation)
          .then(completed => { })
          .catch(err => console.log("Location Err:", err));

        const newStatus = { id: vendor.data[0]._id, status: storeOpen }
        API.updateStatus(newStatus)
          .then(updated => { })
          .catch(err => console.log("Updated Err:", err));
      })
      .catch(err => console.log(err));
  }

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  return (
    <div className="nav-container">
      <Navbar style={{ backgroundColor: '#fc0' }} light expand="md">
        <Container>
          <NavLink
            tag={RouterNavLink}
            to="/"
          >
            <img height='50px' width='60px' style={{ marginRight: '10px' }} src={logo} alt="Mheels logo"></img>
          </NavLink>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
            </Nav>
            {/* Actually display on the screen */}
            <Nav className="d-none d-md-block" navbar>
              {/* if the user IS logged in, display the circle drop down menu */}
              {isAuthenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{user.name}</DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/profile"
                      className="dropdown-profile"
                      activeClassName="router-link-exact-active"
                    >
                      <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                    </DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/twitter"
                      className="dropdown-profile"
                    >
                      <FontAwesomeIcon icon="comment" className="mr-3" /> Social Media
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-profile"
                    >{storeOpen && (
                      <VendorGeo icon="map-marker-alt" func={shopStatus} className="mr-3">Close Up</VendorGeo>)}
                      {!storeOpen && (
                        <VendorGeo icon="map-marker-alt" func={shopStatus} className="mr-3">Go Live</VendorGeo>)}
                    </DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/menu"
                      className="dropdown-profile"
                    >
                      <FontAwesomeIcon icon="utensils" className="mr-3" /> Menu
                    </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                      out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {/* This is the Link to Route */}
            {isAuthenticated && (
              <Nav
                className="d-md-none justify-content-between"
                navbar
                style={{ minHeight: 170 }}
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                    />
                    <h6 className="d-inline-block">{user.name}</h6>
                  </span>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="user" className="mr-3" />
                  <RouterNavLink
                    to="/profile"
                  >
                    Profile
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="comment" className="mr-3" />
                  <RouterNavLink
                    to="/twitter"
                  >
                    Social Media
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  {storeOpen && (
                    <VendorGeo icon="map-marker-alt" func={shopStatus} className="mr-3">Close Up</VendorGeo>)}
                  {!storeOpen && (
                    <VendorGeo icon="map-marker-alt" func={shopStatus} className="mr-3">Go Live</VendorGeo>)}
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="utensils" className="mr-3" />
                  <RouterNavLink
                    to="/menu"
                  >
                    Menu
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="power-off" className="mr-3" />
                  <RouterNavLink
                    to="#"
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  >
                    Log out
                  </RouterNavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
