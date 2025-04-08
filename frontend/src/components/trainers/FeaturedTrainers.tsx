"use client";

import React from 'react';
import Link from 'next/link';

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  price: number;
  image: string;
}

interface TrainerCardProps {
  trainer: Trainer;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-48 bg-gray-200">
        <img 
          src={trainer.image || '/images/default-trainer.jpg'} 
          alt={trainer.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{trainer.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{trainer.specialty}</p>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 mr-1">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(trainer.rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600">({trainer.reviewCount} reviews)</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-indigo-600 font-bold">${trainer.price}/hr</span>
          <Link href={`/trainers/${trainer.id}`} className="text-sm text-indigo-600 hover:text-indigo-800">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeaturedTrainers: React.FC = () => {
  // Mock data for featured trainers
  const trainers: Trainer[] = [
    {
      id: '1',
      name: 'John Smith',
      specialty: 'Yoga & Meditation',
      rating: 4.8,
      reviewCount: 124,
      price: 75,
      image: '/images/trainer1.jpg'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      specialty: 'HIIT & Strength Training',
      rating: 4.9,
      reviewCount: 98,
      price: 85,
      image: '/images/trainer2.jpg'
    },
    {
      id: '3',
      name: 'Michael Brown',
      specialty: 'Nutrition & Weight Loss',
      rating: 4.7,
      reviewCount: 76,
      price: 70,
      image: '/images/trainer3.jpg'
    },
    {
      id: '4',
      name: 'Emily Davis',
      specialty: 'Pilates & Flexibility',
      rating: 4.9,
      reviewCount: 112,
      price: 80,
      image: '/images/trainer4.jpg'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Trainers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with our top-rated fitness professionals for personalized training sessions
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/trainers" className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors">
            View All Trainers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrainers;
