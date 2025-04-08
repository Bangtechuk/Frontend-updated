"use client";

import React from 'react';
import FitnessScene from '../components/3d/FitnessScene';
import Hero from '../components/common/Hero';
import HowItWorks from '../components/common/HowItWorks';
import FeaturedTrainers from '../components/trainers/FeaturedTrainers';
import Testimonials from '../components/common/Testimonials';
import FeatureSection from '../components/common/FeatureSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <FeaturedTrainers />
      <FeatureSection />
      <Testimonials />
      <FitnessScene />
    </main>
  );
}
