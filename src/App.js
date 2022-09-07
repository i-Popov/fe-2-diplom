import React from 'react';
import { Route } from 'react-router-dom';
import Main from './components/Main';
import OrderConfirmed from './components/Confirmed';
import Header from './components/Header';
import Footer from './components/Footer';
import { Dashboard } from './components/Dashboard';
import SearchTickets from './components/SearchTickets';
import SeatSelection from './components/SeatSelection';
import SectionPassengers from './components/Passengers';
import Payment from './components/Payment';
import CheckOrder from './components/CheckOrder';

function App() {
  return (
    <>
      <Header />
      <Route exact path="/" component={Main} />
      <Route path="/dashboard">
        <Dashboard>
          <Route path="/dashboard/tickets" component={SearchTickets} />
          <Route path="/dashboard/seats" component={SeatSelection} />
          <Route path="/dashboard/passengers" component={SectionPassengers} />
          <Route path="/dashboard/payment" component={Payment} />
          <Route path="/dashboard/check" render={() => <CheckOrder />} />
        </Dashboard>
      </Route>
      <Route path="/confirmed" render={() => <OrderConfirmed />} />
      <Footer />
    </>
  );
}

export default App;
