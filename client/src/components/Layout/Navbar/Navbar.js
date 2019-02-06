import React, { Component } from 'react'
import './Navbar.css'

class Navbar extends Component {
    render() {
      return(
    <div className="nav-background">
        <div className="container">
            <div class="d-flex">
                <div class="p-2">Buy</div>
                <div class="p-2">Sell</div>
                <div class="ml-auto p-2">List Your home</div>
                <div class="p-2">Sign Up</div>
                <div class="p-2">Sign In</div>
            </div>
        </div>
    </div>
      )
    }
}

export default Navbar;