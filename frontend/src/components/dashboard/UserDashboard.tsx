"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  credits: number;
  memberSince: string;
}

interface BookingData {
  id: string;
  trainerName: string;
  trainerImage: string;
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

interface PaymentData {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: string;
}

const UserDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [bookings, setBookings] = useState<BookingData[] | null>(null);
  const [notifications, setNotifications] = useState<NotificationData[] | null>(null);
  const [payments, setPayments] = useState<PaymentData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For now, we'll use mock data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    const mockUserData: UserData = {
      id: '123',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      profileImage: '/images/user-profile.jpg',
      credits: 150,
      memberSince: '2022-05-10'
    };

    const mockBookings: BookingData[] = [
      {
        id: '1',
        trainerName: 'John Smith',
        trainerImage: '/images/trainer1.jpg',
        date: '2023-06-15',
        time: '10:00 AM',
        duration: 60,
        type: 'Virtual',
        status: 'upcoming',
        amount: 75
      },
      {
        id: '2',
        trainerName: 'Sarah Johnson',
        trainerImage: '/images/trainer2.jpg',
        date: '2023-06-18',
        time: '2:00 PM',
        duration: 60,
        type: 'In-Person',
        status: 'upcoming',
        amount: 75
      },
      {
        id: '3',
        trainerName: 'Michael Brown',
        trainerImage: '/images/trainer3.jpg',
        date: '2023-06-10',
        time: '11:00 AM',
        duration: 60,
        type: 'Virtual',
        status: 'completed',
        amount: 75
      },
      {
        id: '4',
        trainerName: 'Emily Davis',
        trainerImage: '/images/trainer4.jpg',
        date: '2023-06-05',
        time: '3:00 PM',
        duration: 60,
        type: 'In-Person',
        status: 'completed',
        amount: 75
      },
      {
        id: '5',
        trainerName: 'David Wilson',
        trainerImage: '/images/trainer5.jpg',
        date: '2023-06-01',
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
        message: 'Your session with John Smith is scheduled for tomorrow at 10:00 AM',
        date: '2023-06-14',
        read: false
      },
      {
        id: '2',
        type: 'payment',
        message: 'Payment of $75 for session with Sarah Johnson was successful',
        date: '2023-06-12',
        read: false
      },
      {
        id: '3',
        type: 'system',
        message: 'You have earned 10 loyalty points from your last session',
        date: '2023-06-10',
        read: true
      },
      {
        id: '4',
        type: 'promotion',
        message: 'Special offer: 20% off your next booking with code SUMMER20',
        date: '2023-06-08',
        read: true
      },
      {
        id: '5',
        type: 'booking',
        message: 'Your session with Michael Brown has been completed',
        date: '2023-06-10',
        read: true
      }
    ];

    const mockPayments: PaymentData[] = [
      {
        id: '1',
        date: '2023-06-12',
        description: 'Session with Sarah Johnson',
        amount: 75,
        status: 'completed'
      },
      {
        id: '2',
        date: '2023-06-10',
        description: 'Session with Michael Brown',
        amount: 75,
        status: 'completed'
      },
      {
        id: '3',
        date: '2023-06-05',
        description: 'Session with Emily Davis',
        amount: 75,
        status: 'completed'
      },
      {
        id: '4',
        date: '2023-06-01',
        description: 'Session with David Wilson',
        amount: 75,
        status: 'refunded'
      },
      {
        id: '5',
        date: '2023-05-28',
        description: 'Credit purchase',
        amount: 200,
        status: 'completed'
      }
    ];

    setLoading(true);
    setTimeout(() => {
      setUserData(mockUserData);
      setBookings(mockBookings);
      setNotifications(mockNotifications);
      setPayments(mockPayments);
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Dashboard</h1>
      
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
            My Bookings
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'payments' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setActiveTab('payments')}
          >
            Payment History
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'profile' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile Settings
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' && userData && (
            <div>
              <div className="flex flex-col md:flex-row mb-8">
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <div className="bg-indigo-50 p-6 rounded-lg text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                      <img src={userData.profileImage || '/images/default-profile.jpg'} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">{userData.firstName} {userData.lastName}</h2>
                    <p className="text-gray-600 mb-2">{userData.email}</p>
                    <p className="text-sm text-gray-500">Member since {new Date(userData.memberSince).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="md:w-2/3 md:pl-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-1">Credits</h3>
                      <p className="text-2xl font-bold text-indigo-600">{userData.credits}</p>
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
                  
                  <div className="flex space-x-3">
                    <button 
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                      onClick={() => router.push('/trainers')}
                    >
                      Book a Session
                    </button>
                    <button 
                      className="bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50"
                      onClick={() => router.push('/credits')}
                    >
                      Buy Credits
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Upcoming Sessions</h3>
                {bookings && bookings.filter(b => b.status === 'upcoming').length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookings.filter(b => b.status === 'upcoming').slice(0, 2).map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img src={booking.trainerImage || '/images/default-profile.jpg'} alt={booking.trainerName} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{booking.trainerName}</h4>
                            <p className="text-gray-600">{new Date(booking.date).toLocaleDateString()} at {booking.time}</p>
                            <p className="text-gray-600">{booking.duration} min {booking.type} Session</p>
                            <div className="mt-2">
                              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mr-3">
                                View Details
                              </button>
                              <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">You have no upcoming sessions. <a href="/trainers" className="text-indigo-600 hover:text-indigo-800">Book a session</a> with one of our trainers.</p>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Notifications</h3>
                {notifications && notifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className={`p-4 mb-3 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-indigo-50'}`}>
                    <div className="flex items-start">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        notification.type === 'booking' ? 'bg-blue-100 text-blue-500' :
                        notification.type === 'payment' ? 'bg-green-100 text-green-500' :
                        notification.type === 'promotion' ? 'bg-yellow-100 text-yellow-500' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {notification.type === 'booking' ? '📅' :
                         notification.type === 'payment' ? '💰' :
                         notification.type === 'promotion' ? '🎁' : '🔔'}
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
                <h2 className="text-xl font-semibold text-gray-800">My Bookings</h2>
                <div>
                  <select className="border rounded-md px-3 py-2 mr-2">
                    <option value="all">All Bookings</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button 
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    onClick={() => router.push('/trainers')}
                  >
                    Book New Session
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Trainer</th>
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
                              <img src={booking.trainerImage || '/images/default-profile.jpg'} alt={booking.trainerName} className="w-full h-full object-cover" />
                            </div>
                            <span className="font-medium">{booking.trainerName}</span>
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
                          {booking.status === 'completed' && (
                            <button className="text-yellow-600 hover:text-yellow-900">Review</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'payments' && payments && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Payment History</h2>
                <button 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  onClick={() => router.push('/credits')}
                >
                  Buy Credits
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Date</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Description</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Amount</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b">
                        <td className="py-3 px-4 text-sm">{new Date(payment.date).toLocaleDateString()}</td>
                        <td className="py-3 px-4 text-sm">{payment.description}</td>
                        <td className="py-3 px-4 text-sm">${payment.amount}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            payment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <button className="text-indigo-600 hover:text-indigo-900">Receipt</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'profile' && userData && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Personal Information</h3>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        First Name
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        defaultValue={userData.firstName}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        defaultValue={userData.lastName}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        defaultValue={userData.email}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        defaultValue="(555) 123-4567"
                      />
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                      Save Changes
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Account Settings</h3>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Profile Picture
                      </label>
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                          <img src={userData.profileImage || '/images/default-profile.jpg'} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300">
                          Change
                        </button>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Password
                      </label>
                      <button className="text-indigo-600 hover:text-indigo-800">
                        Change Password
                      </button>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Notification Preferences
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" defaultChecked />
                          <span className="ml-2 text-gray-700">Email notifications</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" defaultChecked />
                          <span className="ml-2 text-gray-700">SMS notifications</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" defaultChecked />
                          <span className="ml-2 text-gray-700">Promotional emails</span>
                        </label>
                      </div>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                      Save Preferences
                    </button>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Payment Methods</h3>
                    <div className="mb-4">
                      <div className="flex items-center justify-between p-3 border rounded-md mb-2">
                        <div className="flex items-center">
                          <div className="mr-3">💳</div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-gray-500">Expires 12/25</p>
                          </div>
                        </div>
                        <div>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Default</span>
                        </div>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800">
                        + Add Payment Method
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
