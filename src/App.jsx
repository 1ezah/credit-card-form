import React, { useState } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CreditCardForm from './components/CreditCardForm';
import PayPalPayment from './components/PayPalForm';
import WeChatPayment from './components/WeChatForm';
import './App.css';

function App() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [previousCards, setPreviousCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const payPalID = process.env.REACT_APP_PAYPAL_CLIENT_ID;

  const handleCardSubmit = (newCard) => {
    setPreviousCards([...previousCards, newCard]);
  };

  const handleSelectCard = (e) => {
    const selectedName = e.target.value;
    const selectedCardObj = previousCards.find(card => card.cardHolder === selectedName);
    setSelectedCard(selectedCardObj || {});
  };

  return (
    <PayPalScriptProvider options={{ "client-id": payPalID }}>
      <div className="container">
        <Tabs selectedIndex={selectedTabIndex} onSelect={index => setSelectedTabIndex(index)}>
          <TabList>
            <Tab>Credit Card</Tab>
            <Tab>PayPal</Tab>
            <Tab>WeChat</Tab>
          </TabList>

          <TabPanel>
            <CreditCardForm 
              onCardSubmit={handleCardSubmit} 
              previousCards={previousCards} 
              onSelectCard={handleSelectCard} 
              selectedCard={selectedCard} 
            />
          </TabPanel>
          <TabPanel>
            <PayPalPayment />
          </TabPanel>
          <TabPanel>
            <WeChatPayment />
          </TabPanel>
        </Tabs>
      </div>
    </PayPalScriptProvider>
  );
}

export default App;