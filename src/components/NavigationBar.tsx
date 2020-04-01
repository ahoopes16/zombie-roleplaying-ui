import React, { FunctionComponentElement, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
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
          <NavItem>
            <NavLink>
              <Link to="/">Create Encounter</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link to="/encounters">List Encounters</Link>
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default NavigationBar
