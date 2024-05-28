import React, { useState } from 'react';
import './CreditCardForm.css';

const CreditCardForm = ({ onCardSubmit, previousCards, onSelectCard, selectedCard }) => {
  // store card information
  const [cardInfo, setCardInfo] = useState({
    index: '',
    cardNumber: '',
    cardHolder: '',
    expirationMonth: '',
    expirationYear: '',
    cvv: ''
  });

  // function to format numbers in XXXX XXXX XXXX XXXX format with spaces
  const formatCardNumber = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');

    setCardInfo({ ...cardInfo, cardNumber: formattedValue });
  };

  // stores previous card data
  const handleSubmit = (e) => {
    e.preventDefault();
    onCardSubmit({ ...cardInfo, index: previousCards.length });
    setCardInfo({
      index: '',
      cardNumber: '',
      cardHolder: '',
      expirationMonth: '',
      expirationYear: '',
      cvv: ''
    });
  };

  return (
    <div className="credit-card-container">
      <form onSubmit={handleSubmit} className="credit-card-form">
        <text>Card Number:</text>
        <input
          type="text"
          inputMode='numeric'
          pattern="[0-9]{13-19}"
          maxlength="19"
          name="cardNumber"
          placeholder="XXXX XXXX XXXX XXXX"
          value={cardInfo.cardNumber}
          onChange={formatCardNumber}
        /><br />
        <text>Card Holder:</text>
        <input
          type="text"
          name="cardHolder"
          placeholder="Card Holder"
          value={cardInfo.cardHolder}
          onChange={(e) => setCardInfo({ ...cardInfo, cardHolder: e.target.value })}
        /><br />
        <text>Expiration:</text>
        <div className='expiration-date'>
          <input 
            type="text"
            inputMode='numeric'
            pattern="^(0[1-9]|1[0-2])$"
            name="month"
            placeholder="MM" 
            maxlength="2"
            size="2"
            value={cardInfo.expirationMonth}
            onChange={(e) => setCardInfo({ ...cardInfo, expirationMonth: e.target.value })}
          />
          <span className='divider'>/</span>
          <input 
            type="text"
            inputMode='numeric'
            pattern="[0-9]*"
            name="year"
            placeholder="YY" 
            maxlength="2"
            size="2"
            value={cardInfo.expirationYear}
            onChange={(e) => setCardInfo({ ...cardInfo, expirationYear: e.target.value })}
          />
        </div>
        <text>CVV:</text>
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          size="3"
          maxlength="3"
          value={cardInfo.cvv}
          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
        /><br />
        <button type="submit">Submit</button>
      </form>
      {/* display selected card data for testing purposes */}
      <div className="credit-card-data">
        <label htmlFor="cardDropdown">Cardholder:</label>
        <select id="cardDropdown" value={selectedCard.cardHolder || ''} onChange={onSelectCard}>
          <option value="">Select cardholder</option>
          {previousCards.map(card => (
            <option key={card.index} value={card.cardHolder}>{card.cardHolder}</option>
          ))}
        </select>
        {selectedCard.cardHolder && (
          <div>
            <p>Selected Cardholder: {selectedCard.cardHolder}</p>
            <p>Card Number: {selectedCard.cardNumber}</p>
            <p>Expiration Date: {selectedCard.expirationDate}</p>
            <p>CVV: {selectedCard.cvv}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditCardForm;
