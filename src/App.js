import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import {
  HomeScreen,
  ProductScreen,
  CartScreen, 
  LoginScreen, 
  RegisterScreen, 
  ProfileScreen, 
  ConfirmEmailScreen, 
  PasswordResetScreen, 
  ShippingScreen,
  PaymentScreen,
  PlaceOrderScreen,
  OrderScreen,
} from 'screens'

import { Header, Footer } from './components'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/confirm-email/' component={ConfirmEmailScreen} />
          <Route path='/password-reset-email/:email?' component={PasswordResetScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />




        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
