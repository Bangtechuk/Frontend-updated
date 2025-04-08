"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface BookingFormProps {
  trainerId: string;
  trainerProfileId: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ trainerId, trainerProfileId }) => {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [sessionType, setSessionType] = useState('virtual');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, we would make an API call to create the booking
      // For now, we'll simulate it with localStorage
      
      const bookingData = {
        id: Math.random().toString(36).substr(2, 9),
        trainerId,
        trainerName: "John Doe", // This would come from API in real app
        date,
        time: startTime,
        duration: parseInt(duration),
        sessionType,
        notes,
        price: sessionType === 'virtual' ? 50 : 75,
        status: 'pending'
      };
      
      // Store booking data in localStorage
      localStorage.setItem('bookingData', JSON.stringify(bookingData));
      
      // Redirect to confirmation page
      router.push('/booking/confirmation');
      
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to create booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Book a Session</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 text-sm font-medium mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700 text-sm font-medium mb-2">
            Time
          </label>
          <select
            id="time"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          >
            <option value="">Select a time</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="duration" className="block text-gray-700 text-sm font-medium mb-2">
            Duration (minutes)
          </label>
          <select
            id="duration"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          >
            <option value="30">30 minutes</option>
            <option value="60">60 minutes</option>
            <option value="90">90 minutes</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Session Type
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sessionType"
                value="virtual"
                checked={sessionType === 'virtual'}
                onChange={() => setSessionType('virtual')}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2 text-gray-700">Virtual ($50)</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sessionType"
                value="in-person"
                checked={sessionType === 'in-person'}
                onChange={() => setSessionType('in-person')}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2 text-gray-700">In-Person ($75)</span>
            </label>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="notes" className="block text-gray-700 text-sm font-medium mb-2">
            Notes for Trainer (Optional)
          </label>
          <textarea
            id="notes"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Book Session'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
