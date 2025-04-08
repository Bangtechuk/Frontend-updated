"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface StatsData {
  totalUsers: number;
  totalTrainers: number;
  totalBookings: number;
  totalRevenue: number;
  platformFees: number;
  activeUsers: number;
  newUsersThisMonth: number;
  newTrainersThisMonth: number;
  completedBookings: number;
  cancelledBookings: number;
  pendingBookings: number;
  averageRating: number;
  monthlyRevenue: { month: string; revenue: number }[];
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  bookings: number;
  status: string;
}

interface TrainerData {
  id: string;
  name: string;
  email: string;
  specialization: string;
  rating: number;
  bookings: number;
  revenue: number;
  status: string;
}

interface BookingData {
  id: string;
  userId: string;
  userName: string;
  trainerId: string;
  trainerName: string;
  date: string;
  time: string;
  status: string;
  amount: number;
  paymentStatus: string;
}

const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<StatsData | null>(null);
  const [users, setUsers] = useState<UserData[] | null>(null);
  const [trainers, setTrainers] = useState<TrainerData[] | null>(null);
  const [bookings, setBookings] = useState<BookingData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For now, we'll use mock data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    const mockStats: StatsData = {
      totalUsers: 1245,
      totalTrainers: 87,
      totalBookings: 3567,
      totalRevenue: 128750,
      platformFees: 25750,
      activeUsers: 876,
      newUsersThisMonth: 124,
      newTrainersThisMonth: 8,
      completedBookings: 2890,
      cancelledBookings: 234,
      pendingBookings: 443,
      averageRating: 4.7,
      monthlyRevenue: [
        { month: 'Jan', revenue: 8750 },
        { month: 'Feb', revenue: 9200 },
        { month: 'Mar', revenue: 10500 },
        { month: 'Apr', revenue: 11200 },
        { month: 'May', revenue: 12500 },
        { month: 'Jun', revenue: 13800 },
        { month: 'Jul', revenue: 14200 },
        { month: 'Aug', revenue: 15600 },
        { month: 'Sep', revenue: 16200 },
        { month: 'Oct', revenue: 17800 },
        { month: 'Nov', revenue: 18500 },
        { month: 'Dec', revenue: 19500 }
      ]
    };

    const mockUsers: UserData[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'client',
        joinDate: '2023-01-15',
        bookings: 12,
        status: 'active'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'client',
        joinDate: '2023-02-20',
        bookings: 8,
        status: 'active'
      },
      {
        id: '3',
        name: 'Robert Johnson',
        email: 'robert@example.com',
        role: 'client',
        joinDate: '2023-03-10',
        bookings: 5,
        status: 'inactive'
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily@example.com',
        role: 'client',
        joinDate: '2023-04-05',
        bookings: 15,
        status: 'active'
      },
      {
        id: '5',
        name: 'Michael Wilson',
        email: 'michael@example.com',
        role: 'client',
        joinDate: '2023-05-12',
        bookings: 3,
        status: 'active'
      }
    ];

    const mockTrainers: TrainerData[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        specialization: 'Yoga',
        rating: 4.8,
        bookings: 45,
        revenue: 3375,
        status: 'active'
      },
      {
        id: '2',
        name: 'David Brown',
        email: 'david@example.com',
        specialization: 'Weight Training',
        rating: 4.9,
        bookings: 62,
        revenue: 4650,
        status: 'active'
      },
      {
        id: '3',
        name: 'Lisa Martinez',
        email: 'lisa@example.com',
        specialization: 'Pilates',
        rating: 4.7,
        bookings: 38,
        revenue: 2850,
        status: 'active'
      },
      {
        id: '4',
        name: 'James Wilson',
        email: 'james@example.com',
        specialization: 'Cardio',
        rating: 4.6,
        bookings: 29,
        revenue: 2175,
        status: 'inactive'
      },
      {
        id: '5',
        name: 'Maria Garcia',
        email: 'maria@example.com',
        specialization: 'Nutrition',
        rating: 4.9,
        bookings: 51,
        revenue: 3825,
        status: 'active'
      }
    ];

    const mockBookings: BookingData[] = [
      {
        id: '1',
        userId: '1',
        userName: 'John Doe',
        trainerId: '1',
        trainerName: 'Sarah Johnson',
        date: '2023-06-15',
        time: '10:00 AM',
        status: 'completed',
        amount: 75,
        paymentStatus: 'paid'
      },
      {
        id: '2',
        userId: '2',
        userName: 'Jane Smith',
        trainerId: '2',
        trainerName: 'David Brown',
        date: '2023-06-16',
        time: '2:00 PM',
        status: 'upcoming',
        amount: 75,
        paymentStatus: 'paid'
      },
      {
        id: '3',
        userId: '3',
        userName: 'Robert Johnson',
        trainerId: '3',
        trainerName: 'Lisa Martinez',
        date: '2023-06-17',
        time: '11:00 AM',
        status: 'cancelled',
        amount: 75,
        paymentStatus: 'refunded'
      },
      {
        id: '4',
        userId: '4',
        userName: 'Emily Davis',
        trainerId: '4',
        trainerName: 'James Wilson',
        date: '2023-06-18',
        time: '3:00 PM',
        status: 'upcoming',
        amount: 75,
        paymentStatus: 'paid'
      },
      {
        id: '5',
        userId: '5',
        userName: 'Michael Wilson',
        trainerId: '5',
        trainerName: 'Maria Garcia',
        date: '2023-06-19',
        time: '9:00 AM',
        status: 'upcoming',
        amount: 75,
        paymentStatus: 'pending'
      }
    ];

    setLoading(true);
    setTimeout(() => {
      setStats(mockStats);
      setUsers(mockUsers);
      setTrainers(mockTrainers);
      setBookings(mockBookings);
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="flex border-b">
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'users' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'trainers' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setActiveTab('trainers')}
          >
            Trainers
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'bookings' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' && stats && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Total Users</h3>
                  <p className="text-3xl font-bold text-indigo-600">{stats.totalUsers}</p>
                  <p className="text-sm text-gray-600 mt-2">+{stats.newUsersThisMonth} this month</p>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Total Trainers</h3>
                  <p className="text-3xl font-bold text-indigo-600">{stats.totalTrainers}</p>
                  <p className="text-sm text-gray-600 mt-2">+{stats.newTrainersThisMonth} this month</p>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Total Bookings</h3>
                  <p className="text-3xl font-bold text-indigo-600">{stats.totalBookings}</p>
                  <p className="text-sm text-gray-600 mt-2">{stats.pendingBookings} pending</p>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Total Revenue</h3>
                  <p className="text-3xl font-bold text-indigo-600">${stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-2">${stats.platformFees.toLocaleString()} platform fees</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Monthly Revenue</h3>
                  <div className="h-64 flex items-end space-x-2">
                    {stats.monthlyRevenue.map((item) => (
                      <div key={item.month} className="flex flex-col items-center flex-1">
                        <div 
                          className="w-full bg-indigo-500 rounded-t"
                          style={{ height: `${(item.revenue / 20000) * 100}%` }}
                        ></div>
                        <p className="text-xs mt-1">{item.month}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Booking Status</h3>
                  <div className="flex items-center justify-center h-64">
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="bg-green-100 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-600">Completed</h4>
                        <p className="text-2xl font-bold text-green-600">{stats.completedBookings}</p>
                        <p className="text-xs text-gray-500 mt-1">{Math.round((stats.completedBookings / stats.totalBookings) * 100)}%</p>
                      </div>
                      <div className="bg-yellow-100 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-600">Pending</h4>
                        <p className="text-2xl font-bold text-yellow-600">{stats.pendingBookings}</p>
                        <p className="text-xs text-gray-500 mt-1">{Math.round((stats.pendingBookings / stats.totalBookings) * 100)}%</p>
                      </div>
                      <div className="bg-red-100 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-600">Cancelled</h4>
                        <p className="text-2xl font-bold text-red-600">{stats.cancelledBookings}</p>
                        <p className="text-xs text-gray-500 mt-1">{Math.round((stats.cancelledBookings / stats.totalBookings) * 100)}%</p>
                      </div>
                      <div className="bg-blue-100 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-600">Avg. Rating</h4>
                        <p className="text-2xl font-bold text-blue-600">{stats.averageRating}</p>
                        <p className="text-xs text-gray-500 mt-1">out of 5.0</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'users' && users && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Add New User
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Name</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Email</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Role</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Join Date</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Bookings</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="py-3 px-4 text-sm">{user.name}</td>
                        <td className="py-3 px-4 text-sm">{user.email}</td>
                        <td className="py-3 px-4 text-sm capitalize">{user.role}</td>
                        <td className="py-3 px-4 text-sm">{user.joinDate}</td>
                        <td className="py-3 px-4 text-sm">{user.bookings}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'trainers' && trainers && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Trainer Management</h2>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Add New Trainer
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Name</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Email</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Specialization</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Rating</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Bookings</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Revenue</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainers.map((trainer) => (
                      <tr key={trainer.id} className="border-b">
                        <td className="py-3 px-4 text-sm">{trainer.name}</td>
                        <td className="py-3 px-4 text-sm">{trainer.email}</td>
                        <td className="py-3 px-4 text-sm">{trainer.specialization}</td>
                        <td className="py-3 px-4 text-sm">{trainer.rating}</td>
                        <td className="py-3 px-4 text-sm">{trainer.bookings}</td>
                        <td className="py-3 px-4 text-sm">${trainer.revenue}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            trainer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {trainer.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'bookings' && bookings && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Booking Management</h2>
                <div>
                  <select className="border rounded-md px-3 py-2 mr-2">
                    <option value="all">All Statuses</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                    Create Booking
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">ID</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">User</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Trainer</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Date</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Time</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Amount</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Payment</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b">
                        <td className="py-3 px-4 text-sm">{booking.id}</td>
                        <td className="py-3 px-4 text-sm">{booking.userName}</td>
                        <td className="py-3 px-4 text-sm">{booking.trainerName}</td>
                        <td className="py-3 px-4 text-sm">{booking.date}</td>
                        <td className="py-3 px-4 text-sm">{booking.time}</td>
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
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 
                            booking.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-2">View</button>
                          <button className="text-red-600 hover:text-red-900">Cancel</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
