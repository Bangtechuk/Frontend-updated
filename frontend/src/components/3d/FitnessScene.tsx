"use client";

import React, { useRef } from 'react';
// Remove the problematic import and component that requires react-three-fiber
// We'll create a simpler component that doesn't require 3D libraries

const FitnessScene = () => {
  return (
    <div className="h-96 w-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center rounded-lg shadow-lg my-8">
      <div className="text-center text-white p-8">
        <h3 className="text-2xl font-bold mb-4">Interactive Fitness Experience</h3>
        <p className="mb-6">Experience virtual training sessions with our certified trainers</p>
        <button className="bg-white text-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-50 transition-colors">
          Try Virtual Training
        </button>
      </div>
    </div>
  );
};

export default FitnessScene;
