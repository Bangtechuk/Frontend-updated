"use client";

import React from 'react';
import Image from 'next/image';

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
    <div className="bg-white rounded-xl shadow-soft overflow-hidden transition-transform hover:scale-105 hover:shadow-medium">
      <div className="relative h-48 w-full">
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
          <a href={`/trainers/${trainer.id}`} className="text-sm text-indigo-600 hover:text-indigo-800">
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
