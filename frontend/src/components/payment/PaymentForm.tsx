"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface PaymentFormProps {
  amount: number;
  bookingId: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, bookingId }) => {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsProcessing(true);
      setError('');
      
      // In a real app, we would make an API call to process the payment
      // For now, we'll simulate it with a timeout
      
      setTimeout(() => {
        // Redirect to success page
        router.push(`/payment/success?bookingId=${bookingId}`);
      }, 2000);
      
    } catch (err) {
      setError('Payment processing failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    let formatted = '';
    for (let i = 0; i < digits.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += digits[i];
    }
    
    return formatted.slice(0, 19); // Limit to 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    } else {
      return digits;
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Payment Details</h2>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Amount:</span>
          <span className="text-xl font-bold text-indigo-600">${amount}</span>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="cardName" className="block text-gray-700 text-sm font-medium mb-2">
            Name on Card
          </label>
          <input
            id="cardName"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-medium mb-2">
            Card Number
          </label>
          <input
            id="cardNumber"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-medium mb-2">
              Expiry Date
            </label>
            <input
              id="expiryDate"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={expiryDate}
              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-gray-700 text-sm font-medium mb-2">
              CVV
            </label>
            <input
              id="cvv"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
              placeholder="123"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : `Pay $${amount}`}
        </button>
      </form>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Your payment information is secure and encrypted.</p>
        <div className="flex justify-center mt-2 space-x-2">
          <span>🔒 Secure Payment</span>
          <span>💳 Credit/Debit Cards</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
