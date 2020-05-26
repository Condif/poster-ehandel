import React, { createContext, Component } from "react";
export const UserContext = createContext();

class UserContextProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // Allt här kommer vi åt med consumer
            isCartOpen: false,
            openCart: this.openCart
        }
    }

    //State för cartModal
    openCart = () => {   
        this.setState({ isCartOpen: !this.state.isCartOpen})
    }

    // Logga in
    // Logga ut
    // Se senaste beställning

    render() {
        return (
            <UserContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }

}

export default UserContextProvider;