"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface TrainerData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  specialties: string[];
  bio: string;
  hourlyRate: number;
  averageRating: number;
  totalReviews: number;
  memberSince: string;
  availabilitySettings: {
    monday: { available: boolean; slots: string[] };
    tuesday: { available: boolean; slots: string[] };
    wednesday: { available: boolean; slots: string[] };
    thursday: { available: boolean; slots: string[] };
    friday: { available: boolean; slots: string[] };
    saturday: { available: boolean; slots: string[] };
    sunday: { available: boolean; slots: string[] };
  };
}

interface BookingData {
  id: string;
  clientName: string;
  clientImage: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: string;
  amount: number;
}

interface NotificationData {
  id: string;
  type: string;
  message: string;
  date: string;
  read: boolean;
}

interface EarningsData {
  totalEarnings: number;
  pendingPayouts: number;
  lastPayout: number;
  lastPayoutDate: string;
  monthlyEarnings: { month: string; amount: number }[];
}

const TrainerDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [trainerData, setTrainerData] = useState<TrainerData | null>(null);
  const [bookings, setBookings] = useState<BookingData[] | null>(null);
  const [notifications, setNotifications] = useState<NotificationData[] | null>(null);
  const [earnings, setEarnings] = useState<EarningsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For now, we'll use mock data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    const mockTrainerData: TrainerData = {
      id: '123',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      profileImage: '/images/trainer-profile.jpg',
      specialties: ['Yoga', 'Pilates', 'Strength Training'],
      bio: 'Certified personal trainer with 5+ years of experience specializing in yoga and strength training.',
      hourlyRate: 75,
      averageRating: 4.8,
      totalReviews: 42,
      memberSince: '2022-03-15',
      availabilitySettings: {
        monday: { available: true, slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'] },
        tuesday: { available: true, slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'] },
        wednesday: { available: true, slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'] },
        thursday: { available: true, slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'] },
        friday: { available: true, slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'] },
        saturday: { available: true, slots: ['10:00 AM', '11:00 AM', '12:00 PM'] },
        sunday: { available: false, slots: [] }
      }
    };

    const mockBookings: BookingData[] = [
      {
        id: '1',
        clientName: 'Sarah Johnson',
        clientImage: '/images/client1.jpg',
        date: '2023-06-15',
        time: '10:00 AM',
        duration: 60,
        type: 'Virtual',
        status: 'upcoming',
        amount: 75
      },
      {
        id: '2',
        clientName: 'Michael Brown',
        clientImage: '/images/client2.jpg',
        date: '2023-06-16',
        time: '2:00 PM',
        duration: 60,
        type: 'In-Person',
        status: 'upcoming',
        amount: 75
      },
      {
        id: '3',
        clientName: 'Emily Davis',
        clientImage: '/images/client3.jpg',
        date: '2023-06-14',
        time: '11:00 AM',
        duration: 60,
        type: 'Virtual',
        status: 'completed',
        amount: 75
      },
      {
        id: '4',
        clientName: 'David Wilson',
        clientImage: '/images/client4.jpg',
        date: '2023-06-13',
        time: '3:00 PM',
        duration: 60,
        type: 'In-Person',
        status: 'completed',
        amount: 75
      },
      {
        id: '5',
        clientName: 'Jessica Martinez',
        clientImage: '/images/client5.jpg',
        date: '2023-06-12',
        time: '9:00 AM',
        duration: 60,
        type: 'Virtual',
        status: 'cancelled',
        amount: 75
      }
    ];

    const mockNotifications: NotificationData[] = [
      {
        id: '1',
        type: 'booking',
        message: 'New booking request from Sarah Johnson for June 15, 10:00 AM',
        date: '2023-06-10',
        read: false
      },
      {
        id: '2',
        type: 'payment',
        message: 'Payment of $75 received for session with Michael Brown',
        date: '2023-06-09',
        read: false
      },
      {
        id: '3',
        type: 'review',
        message: 'Emily Davis left a 5-star review for your session',
        date: '2023-06-08',
        read: true
      },
      {
        id: '4',
        type: 'system',
        message: 'Your profile has been verified successfully',
        date: '2023-06-07',
        read: true
      },
      {
        id: '5',
        type: 'booking',
        message: 'Jessica Martinez cancelled their booking for June 12',
        date: '2023-06-06',
        read: true
      }
    ];

    const mockEarnings: EarningsData = {
      totalEarnings: 3750,
      pendingPayouts: 450,
      lastPayout: 1200,
      lastPayoutDate: '2023-05-31',
      monthlyEarnings: [
        { month: 'Jan', amount: 1050 },
        { month: 'Feb', amount: 1125 },
        { month: 'Mar', amount: 975 },
        { month: 'Apr', amount: 1350 },
        { month: 'May', amount: 1200 },
        { month: 'Jun', amount: 450 }
      ]
    };

    setLoading(true);
    setTimeout(() => {
      setTrainerData(mockTrainerData);
      setBookings(mockBookings);
      setNotifications(mockNotifications);
      setEarnings(mockEarnings);
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Trainer Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="flex border-b">
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'bookings' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'availability' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setActiveTab('availability')}
          >
            Availability
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'earnings' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setActiveTab('earnings')}
          >
            Earnings
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' && trainerData && (
            <div>
              <div className="flex flex-col md:flex-row mb-8">
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <div className="bg-indigo-50 p-6 rounded-lg text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                      <img src={trainerData.profileImage || '/images/default-profile.jpg'} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">{trainerData.firstName} {trainerData.lastName}</h2>
                    <p className="text-gray-600 mb-2">{trainerData.email}</p>
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="font-medium">{trainerData.averageRating}</span>
                      <span className="text-gray-500 ml-1">({trainerData.totalReviews} reviews)</span>
                    </div>
                    <p className="text-sm text-gray-500">Member since {new Date(trainerData.memberSince).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="md:w-2/3 md:pl-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-1">Hourly Rate</h3>
                      <p className="text-2xl font-bold text-indigo-600">${trainerData.hourlyRate}</p>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-1">Upcoming Sessions</h3>
                      <p className="text-2xl font-bold text-indigo-600">{bookings?.filter(b => b.status === 'upcoming').length || 0}</p>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-1">Unread Notifications</h3>
                      <p className="text-2xl font-bold text-indigo-600">{notifications?.filter(n => !n.read).length || 0}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Specialties</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {trainerData.specialties.map((specialty, index) => (
                        <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Bio</h3>
                    <p className="text-gray-600 mb-4">{trainerData.bio}</p>
                    
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Notifications</h3>
                {notifications && notifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className={`p-4 mb-3 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-indigo-50'}`}>
                    <div className="flex items-start">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        notification.type === 'booking' ? 'bg-blue-100 text-blue-500' :
                        notification.type === 'payment' ? 'bg-green-100 text-green-500' :
                        notification.type === 'review' ? 'bg-yellow-100 text-yellow-500' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {notification.type === 'booking' ? '📅' :
                         notification.type === 'payment' ? '💰' :
                         notification.type === 'review' ? '⭐' : '🔔'}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800">{notification.message}</p>
                        <p className="text-sm text-gray-500 mt-1">{new Date(notification.date).toLocaleDateString()}</p>
                      </div>
                      {!notification.read && (
                        <span className="bg-indigo-600 w-2 h-2 rounded-full"></span>
                      )}
                    </div>
                  </div>
                ))}
                <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'bookings' && bookings && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Your Bookings</h2>
                <div>
                  <select className="border rounded-md px-3 py-2">
                    <option value="all">All Bookings</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Client</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Date</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Time</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Duration</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Type</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Amount</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                              <img src={booking.clientImage || '/images/default-profile.jpg'} alt={booking.clientName} className="w-full h-full object-cover" />
                            </div>
                            <span className="font-medium">{booking.clientName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">{new Date(booking.date).toLocaleDateString()}</td>
                        <td className="py-3 px-4 text-sm">{booking.time}</td>
                        <td className="py-3 px-4 text-sm">{booking.duration} min</td>
                        <td className="py-3 px-4 text-sm">{booking.type}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            booking.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            booking.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">${booking.amount}</td>
                        <td className="py-3 px-4 text-sm">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-2">View</button>
                          {booking.status === 'upcoming' && (
                            <button className="text-red-600 hover:text-red-900">Cancel</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'availability' && trainerData && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Manage Availability</h2>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Save Changes
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(trainerData.availabilitySettings).map(([day, settings]) => (
                  <div key={day} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-gray-800 capitalize">{day}</h3>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={settings.available} readOnly />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    
                    {settings.available && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Available time slots:</p>
                        <div className="flex flex-wrap gap-2">
                          {settings.slots.map((slot, index) => (
                            <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm flex items-center">
                              {slot}
                              <button className="ml-1 text-indigo-600 hover:text-indigo-900">×</button>
                            </span>
                          ))}
                          <button className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm hover:bg-gray-200">
                            + Add
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'earnings' && earnings && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Total Earnings</h3>
                  <p className="text-3xl font-bold text-indigo-600">${earnings.totalEarnings}</p>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Pending Payout</h3>
                  <p className="text-3xl font-bold text-indigo-600">${earnings.pendingPayouts}</p>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Last Payout</h3>
                  <p className="text-3xl font-bold text-indigo-600">${earnings.lastPayout}</p>
                  <p className="text-sm text-gray-500 mt-1">on {new Date(earnings.lastPayoutDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Monthly Earnings</h3>
                <div className="h-64 flex items-end space-x-2">
                  {earnings.monthlyEarnings.map((item) => (
                    <div key={item.month} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-indigo-500 rounded-t"
                        style={{ height: `${(item.amount / 1500) * 100}%` }}
                      ></div>
                      <p className="text-xs mt-1">{item.month}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Payout Settings</h3>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Payout Method
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Bank Transfer</option>
                    <option>PayPal</option>
                    <option>Venmo</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Account Number
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value="XXXX-XXXX-XXXX-1234"
                    readOnly
                  />
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Update Payout Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
