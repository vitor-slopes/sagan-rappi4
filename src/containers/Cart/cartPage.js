import React from "react";
import { connect } from "react-redux";
import { getAddress, placeOrder } from "../../Actions/cartPageAction"
import { push } from "connected-react-router";
import TopBar from '../../Components/TopBar'
import BottomNavigationBar from '../../Components/BottomNavigation'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

//COLOCAR TOKEN DO LOCALSTORAGE GERADO PELO LOGIN
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlgwVGV0S0tkeVRoOW4zSFR6TENrIiwibmFtZSI6IkFuZHJpdXMiLCJlbWFpbCI6ImFuZHJpdXMucm9jaGFsYXphcmlub0BnbWFpbC5jb20iLCJjcGYiOiIxMTEuMTIxLjExMS0xMSIsImhhc0FkZHJlc3MiOnRydWUsImFkZHJlc3MiOiJBdi4gRHVxdWUgZGUgY2F4aWFzLCAxNzcsIDcxIC0gVmlsYSBOLiBDb25jZWnDp8OjbyIsImlhdCI6MTU4Njg2NjU2N30.erQsTxDL6Q6vDx8zGA1fIONJQVqNkLg-Qlz9VBfn4oM"

class cartPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            payment: undefined,
            showTopBar: true,
            showTextField: true,
            showFilterBar: true,
            showBottomNavigation: true,
            showTopBarTitle: 'Meu carrinho',
            showSearchPage: true,
            showBackButton: false
        }
    }

    componentDidMount() {
        this.props.getAddress(token)
    }

    showAdress = () => {
        if (this.props.address !== undefined) {
            return (<p>
                {this.props.address.street},{this.props.address.number}
            </p>)
        } else {
            return (
                <div>Carregando...</div>
            )
        }
    }

    handlePaymentChange = (payment) => {
        this.setState({payment: payment})
    }

    handleConfirmOrder = (e) => {
        e.preventDefault()

        //COLOCAR ID DO RESTAURANTE E PRODUTOS QUE VEM DO REDUCER
        const restaurantId= "20JaUo9ipUqat5EqZ3ww"
        const products= [{
            id: "FEVccOBAzKOxM4LM2Jj3",
            quantity: 3
        }, {
            id: "20JaUo9ipUqat5EqZ3ww",
            quantity: 6
        }]

        this.props.placeOrder(token, restaurantId, products, this.state.payment)

    }

    render() {
        const topBar = (
            <TopBar
                title={this.state.showTopBarTitle}
                returnButton={this.state.showBackButton ? <ArrowBackIosIcon onClick={this.renderFeedPage} fontSize='small' /> : ''}
            />
        )
        const bottomNavigation = (
            <BottomNavigationBar
              showCart={this.renderCartPage}
              showFeed={this.renderFeedPage}
              showProfile={this.renderProfilePage}
            />
          )
        return (
            <div>
                {this.state.showTopBar ? topBar : ""}
                <div>
                    <p>Endereço de entrega</p>
                    {this.showAdress()}
                </div>
                <div>
                    Carrinho vazio
                </div>
                <div>
                    SUBTOTAL Frete R$0,00 R$00,00
                </div>
                <form onSubmit={this.handleConfirmOrder}>
                    <p>Forma de pagamento</p>
                    <input type="radio" name="pagamento" required={true} value="dinheiro" onClick={()=>{this.handlePaymentChange("dinheiro")}} />Dinheiro
                    <input type="radio" name="pagamento" required={true} value="cartao" onClick={()=>{this.handlePaymentChange("cartao")}} />Cartão de crédito
                    <button type="submit">Confirmar</button>
                </form>
                {this.state.showBottomNavigation ? bottomNavigation : ""}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        address: state.cart.address
    }
}

const mapDispatchToProps = dispatch => ({
    getAddress: (token, restaurantId, products, paymentMethod) => dispatch(getAddress(token, restaurantId, products, paymentMethod)),
    placeOrder: (token, restaurantId, products, paymentMethod) => dispatch(placeOrder(token, restaurantId, products, paymentMethod))
})

export default connect(mapStateToProps, mapDispatchToProps)(cartPage);