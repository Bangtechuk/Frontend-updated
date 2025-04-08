"use client";

import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

interface Trainer {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  specialties: string[];
  bio: string;
  hourlyRate: number;
  averageRating: number;
  totalReviews: number;
}

const TrainerSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [trainers, setTrainers] = useState<Trainer[]>([]);

  // Mock data for specialties
  const specialties = [
    'All Specialties',
    'Yoga',
    'Pilates',
    'HIIT',
    'Strength Training',
    'Cardio',
    'Nutrition',
    'Weight Loss',
    'Meditation',
    'Flexibility'
  ];

  useEffect(() => {
    // In a real app, we would fetch trainers from an API
    // For now, we'll use mock data
    setLoading(true);
    
    setTimeout(() => {
      // Mock data for trainers
      const allTrainers: Trainer[] = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Smith',
          profileImage: '/images/trainer1.jpg',
          specialties: ['Yoga', 'Meditation'],
          bio: 'Certified yoga instructor with 5+ years of experience.',
          hourlyRate: 75,
          averageRating: 4.8,
          totalReviews: 124
        },
        {
          id: '2',
          firstName: 'Sarah',
          lastName: 'Johnson',
          profileImage: '/images/trainer2.jpg',
          specialties: ['HIIT', 'Strength Training'],
          bio: 'Passionate about helping clients achieve their fitness goals.',
          hourlyRate: 85,
          averageRating: 4.9,
          totalReviews: 98
        },
        {
          id: '3',
          firstName: 'Michael',
          lastName: 'Brown',
          profileImage: '/images/trainer3.jpg',
          specialties: ['Nutrition', 'Weight Loss'],
          bio: 'Nutrition expert specializing in sustainable weight loss.',
          hourlyRate: 70,
          averageRating: 4.7,
          totalReviews: 76
        },
        {
          id: '4',
          firstName: 'Emily',
          lastName: 'Davis',
          profileImage: '/images/trainer4.jpg',
          specialties: ['Pilates', 'Flexibility'],
          bio: 'Pilates instructor focused on improving core strength and flexibility.',
          hourlyRate: 80,
          averageRating: 4.9,
          totalReviews: 112
        },
        {
          id: '5',
          firstName: 'David',
          lastName: 'Wilson',
          profileImage: '/images/trainer5.jpg',
          specialties: ['Strength Training', 'Cardio'],
          bio: 'Former athlete helping clients build strength and endurance.',
          hourlyRate: 90,
          averageRating: 4.6,
          totalReviews: 85
        },
        {
          id: '6',
          firstName: 'Jessica',
          lastName: 'Martinez',
          profileImage: '/images/trainer6.jpg',
          specialties: ['Yoga', 'Meditation', 'Flexibility'],
          bio: 'Holistic approach to fitness focusing on mind-body connection.',
          hourlyRate: 75,
          averageRating: 4.8,
          totalReviews: 92
        },
        {
          id: '7',
          firstName: 'Robert',
          lastName: 'Taylor',
          profileImage: '/images/trainer7.jpg',
          specialties: ['HIIT', 'Weight Loss', 'Cardio'],
          bio: 'Specializing in high-intensity workouts for maximum results.',
          hourlyRate: 95,
          averageRating: 4.7,
          totalReviews: 78
        },
        {
          id: '8',
          firstName: 'Amanda',
          lastName: 'Clark',
          profileImage: '/images/trainer8.jpg',
          specialties: ['Nutrition', 'Weight Loss', 'Strength Training'],
          bio: 'Comprehensive approach combining nutrition and exercise.',
          hourlyRate: 85,
          averageRating: 4.9,
          totalReviews: 105
        }
      ];
      
      // Filter trainers based on search criteria
      const filteredTrainers = allTrainers.filter(trainer => {
        const fullName = `${trainer.firstName} ${trainer.lastName}`.toLowerCase();
        const searchMatch = searchTerm === '' || fullName.includes(searchTerm.toLowerCase());
        const specialtyMatch = specialty === '' || specialty === 'All Specialties' || trainer.specialties.includes(specialty);
        const ratingMatch = trainer.averageRating >= minRating;
        const priceMatch = trainer.hourlyRate <= maxPrice;
        
        return searchMatch && specialtyMatch && ratingMatch && priceMatch;
      });
      
      setTrainers(filteredTrainers);
      setLoading(false);
    }, 500);
  }, [searchTerm, specialty, minRating, maxPrice]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Find Your Perfect Trainer</h1>
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="flex items-center justify-center bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter className="mr-2" />
            Filters
          </button>
        </div>
        
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialty
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  {specialties.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Rating
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                >
                  <option value="0">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Price ($/hr)
                </label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>$50</span>
                  <span>${maxPrice}</span>
                  <span>$200</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-4">{trainers.length} trainers found</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map((trainer) => (
              <div key={trainer.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={trainer.profileImage || '/images/default-trainer.jpg'} 
                    alt={`${trainer.firstName} ${trainer.lastName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{trainer.firstName} {trainer.lastName}</h2>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(trainer.averageRating) ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({trainer.totalReviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {trainer.specialties.map((spec) => (
                      <span key={spec} className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{trainer.bio}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-600 font-bold">${trainer.hourlyRate}/hr</span>
                    <a href={`/trainers/${trainer.id}`} className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 text-sm">
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {trainers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No trainers found matching your criteria. Try adjusting your filters.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrainerSearch;
