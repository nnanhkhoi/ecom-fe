import React, { useState, useEffect, useContext } from 'react'
import { CartContext } from 'utils/CartContext'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { MdFingerprint } from 'react-icons/md'
// import { FaBars, FaTimes } from 'react-icons/fa'
import { BiUserCircle } from 'react-icons/bi'
import Badge from '@mui/material/Badge'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import './Navbar.css'

import { menuItems, getCategoryMenu } from './menuItems'
import MenuItems from 'components/MenuItems'
import { useSelector } from 'react-redux'
import { logout } from 'redux/apiRequest'

function Navbar() {
  // const [click, setClick] = useState(false)
  const user = useSelector((state) => state.auth.login.currentUser)
  const [button, setButton] = useState(true)
  const [products, setProducts] = useState([])
  const [menus, setMenus] = useState([])
  const { cartProducts } = useContext(CartContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const handleClick = () => setClick(!click)
  // const closeMobileMenu = () => setClick(false)

  useEffect(() => {
    // if (cartProducts.length > 0) {
    //   cartApi.fetchCartItems(user.id).then((response) => {
    //     setProducts(response)
    //   })
    // } else {
    //   setProducts([])
    // }

    // Call the function
    getCategoryMenu()
      .then((categories) => {
        // Use the categories returned by getCategoryMenu
        setMenus(categories)
      })
      .catch((error) => {
        // Handle any errors that occurred during the API call
        console.error('Error fetching category menu:', error)
      })
  }, [])

  const showButton = () => {
    if (window.innerWidth <= 768) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  useEffect(() => {
    showButton()
    window.addEventListener('resize', showButton)
    return () => {
      window.removeEventListener('resize', showButton)
    }
  }, [])

  async function signout() {
    await logout(dispatch, user.id, navigate)
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container container">
          <Link to="/" className="navbar-logo">
            <MdFingerprint className="navbar-icon" />
            NAK
          </Link>

          <ul className="nav-menu">
            {menus.map((menu, index) => {
              const depthLevel = 0
              return (
                <MenuItems items={menu} key={index} depthLevel={depthLevel} />
              )
            })}
          </ul>

          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/cart" className="navbar-cart">
                <Badge badgeContent={cartProducts.length} color="warning">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </Link>
            </li>
            {!user ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="sign-in-btn navbar-icon">
                    <span>Sign In</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item user-icon navbar-icon">
                  <Link to="/account">
                    <BiUserCircle />
                  </Link>
                </li>
                <p className="navbar-user">
                  Hi, <span>{user.name} </span>{' '}
                </p>
                <p className="nav-item user-icon navbar-icon">
                  <button onClick={signout}> Sign out</button>
                </p>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
