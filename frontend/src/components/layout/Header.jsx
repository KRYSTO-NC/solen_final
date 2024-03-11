import { Navbar, Nav, Container } from 'react-bootstrap'

import {

  FaProductHunt,
  FaSolarPanel,
  FaUser,
  FaPlusCircle,

} from 'react-icons/fa'

import { LinkContainer } from 'react-router-bootstrap'

import logo from '../../assets/logo.png'
const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to={'/'}>
            <Navbar.Brand>
              <img className="header-logo" src={logo} alt="" /> SOLLEN
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navabar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/sollen-products">
                <Nav.Link>
                  <FaProductHunt /> Produits sollen
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/simulations">
                <Nav.Link>
                  <FaSolarPanel /> Simulations
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/creer-simulation">
                <Nav.Link>
                  <FaPlusCircle/> Créer simulation
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/userlist">
                <Nav.Link>
                  <FaPlusCircle/> Gestions des utilisateur
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Connection
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
