"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface TrainerReview {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  date: string;
  comment: string;
}

interface TrainerAvailability {
  day: string;
  slots: string[];
}

interface Trainer {
  id: string;
  name: string;
  image: string;
  specialty: string;
  bio: string;
  experience: string;
  certifications: string[];
  rating: number;
  reviewCount: number;
  price: number;
  availability: TrainerAvailability[];
  reviews: TrainerReview[];
}

interface TrainerProfileProps {
  trainer: Trainer;
}

const TrainerProfile: React.FC<TrainerProfileProps> = ({ trainer }) => {
  const [activeTab, setActiveTab] = useState('about');
  
  // This would be replaced with actual data from API
  const reviews = trainer.reviews || [];
  const availability = trainer.availability || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-6 bg-indigo-50">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img src={trainer.image || '/images/default-trainer.jpg'} alt={trainer.name} className="w-full h-full object-cover" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">{trainer.name}</h1>
              <p className="text-indigo-600 mb-2">{trainer.specialty}</p>
              <div className="flex items-center justify-center mb-4">
                <div className="flex text-yellow-400 mr-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(trainer.rating) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">({trainer.reviewCount} reviews)</span>
              </div>
              <p className="text-xl font-bold text-indigo-600 mb-4">${trainer.price}/hr</p>
              <Link href={`/booking/${trainer.id}`} className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                Book a Session
              </Link>
            </div>
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="border-b mb-4">
              <div className="flex">
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'about' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
                  onClick={() => setActiveTab('about')}
                >
                  About
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'reviews' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'availability' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
                  onClick={() => setActiveTab('availability')}
                >
                  Availability
                </button>
              </div>
            </div>
            
            {activeTab === 'about' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">About Me</h2>
                <p className="text-gray-600 mb-4">{trainer.bio}</p>
                
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Experience</h2>
                <p className="text-gray-600 mb-4">{trainer.experience}</p>
                
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Certifications</h2>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  {trainer.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Client Reviews</h2>
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                            <img src={review.userImage || '/images/default-profile.jpg'} alt={review.userName} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium text-gray-800 mr-2">{review.userName}</h3>
                              <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex text-yellow-400 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i}>
                                  {i < Math.floor(review.rating) ? '★' : '☆'}
                                </span>
                              ))}
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No reviews yet.</p>
                )}
              </div>
            )}
            
            {activeTab === 'availability' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Weekly Availability</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availability.map((day) => (
                    <div key={day.day} className="border rounded-lg p-3">
                      <h3 className="font-medium text-gray-800 mb-2">{day.day}</h3>
                      {day.slots.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {day.slots.map((slot, index) => (
                            <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">
                              {slot}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">Not available</p>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  * All times are in your local timezone. Book a session to confirm availability.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
