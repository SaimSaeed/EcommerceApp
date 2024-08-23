import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
function Header() {
  const CartItem = useSelector(state => state.cart.cartItems)
  const {userInfo} = useSelector(state=>state.auth)

  const logoutHandler = ()=>{
    console.log("Logout")
  }
  return (
    <header>

      <Navbar bg='dark' variant='dark' expand="md" collapseOnSelect >
        <Container>
          <Navbar.Brand href="#home">ProShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link><Link to={"/cart"}><FaShoppingCart />{CartItem?.length > 0 &&
                <Badge pill bg='success' style={{marginLeft:"5px"}} >
    
                    {CartItem.reduce((a,c)=> a+= c.qty,0)}

                </Badge>}
                </Link>
              </Nav.Link>
              {
              
              userInfo ?   (<NavDropdown title={userInfo.name}  id="basic-nav-dropdown">
                
              <NavDropdown.Item ><Link to={"/profile"}>Profile</Link></NavDropdown.Item>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>) :  (<Nav.Link href="#home"><FaUser /> Sign In</Nav.Link>)
              }

             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    </header>
  )
}

export default Header