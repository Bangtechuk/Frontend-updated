"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface BookingData {
  id: string;
  trainerId: string;
  trainerName: string;
  date: string;
  time: string;
  duration: number;
  sessionType: string;
  notes?: string;
  price: number;
  status: string;
}

const PaymentSuccess = () => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        setIsLoading(true);
        const storedBookingData = localStorage.getItem('bookingData');
        
        if (storedBookingData) {
          setBookingData(JSON.parse(storedBookingData));
        } else {
          setError('Payment data not found. Please check your bookings for confirmation.');
        }
      } catch (err) {
        setError('Error retrieving payment data. Please check your bookings for confirmation.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingData();
  }, []);

  const handleViewBookings = () => {
    router.push('/dashboard');
  };

  const handleBookAnother = () => {
    localStorage.removeItem('bookingData');
    router.push('/trainers');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto my-10">
        <div className="text-red-500 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Error</h2>
        <p className="text-center text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto my-10">
      <div className="text-green-500 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Payment Successful!</h2>
      <p className="text-center text-gray-600 mb-6">Your payment has been processed successfully.</p>
      
      {bookingData && (
        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Trainer:</span>
            <span className="font-medium">{bookingData.trainerName}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{new Date(bookingData.date).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">{bookingData.time}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Session Type:</span>
            <span className="font-medium">{bookingData.sessionType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount Paid:</span>
            <span className="font-medium">${bookingData.price}</span>
          </div>
        </div>
      )}
      
      <div className="flex flex-col space-y-3">
        <button
          onClick={handleViewBookings}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          View My Bookings
        </button>
        <button
          onClick={handleBookAnother}
          className="bg-white text-indigo-600 border border-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Book Another Session
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
