import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../features/userApiSlice'
import { logout } from '../features/authSlice'
import {toast} from "react-toastify"
function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const CartItem = useSelector(state => state.cart.cartItems)
  const {userInfo} = useSelector(state=>state.auth)
  const [logoutApiCall] = useLogoutMutation()
  const logoutHandler =async ()=>{
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate("/login")
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
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
              
              userInfo ?   (<NavDropdown title={userInfo.username}  id="basic-nav-dropdown">
                
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