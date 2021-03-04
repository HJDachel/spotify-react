import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from "reactstrap";

export default function Header() {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);
    
    return (
        <div>
            <Navbar className="navbar navbar-dark" expand="md">
                <NavbarBrand href="/">app</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}
