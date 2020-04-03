import React, { FunctionComponentElement, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

function NavigationBar(): FunctionComponentElement<{}> {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = (): void => setIsOpen(!isOpen)

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">Zombie RPG 3000</NavbarBrand>
      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Encounters
            </DropdownToggle>
            <DropdownMenu right>
              <NavLink to="/encounters">
                <DropdownItem>List</DropdownItem>
              </NavLink>
              <NavLink to="/create-encounter">
                <DropdownItem>Create</DropdownItem>
              </NavLink>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default NavigationBar
