"use client";

import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah J.',
      role: 'Yoga Enthusiast',
      image: '/images/testimonial1.jpg',
      quote: 'Finding the right yoga instructor was so easy with FitTribe. The platform matched me with someone who perfectly understood my goals and limitations. Highly recommend!',
      rating: 5
    },
    {
      id: 2,
      name: 'Marcus T.',
      role: 'Weight Loss Journey',
      image: '/images/testimonial2.jpg',
      quote: 'I have lost 30 pounds in 4 months working with Michael through FitTribe. The personalized training and nutrition guidance has been life-changing. The platform makes scheduling and payments so easy!',
      rating: 5
    },
    {
      id: 3,
      name: 'Elena R.',
      role: 'Marathon Runner',
      image: '/images/testimonial3.jpg',
      quote: 'As a busy professional, finding time for training was always difficult. With FitTribe, I can book sessions that fit my schedule and train from home when needed. My trainer has helped me improve my marathon time by 15 minutes!',
      rating: 4
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
              
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
