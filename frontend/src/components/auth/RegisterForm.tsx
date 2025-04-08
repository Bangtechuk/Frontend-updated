"use client";

import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';

const RegisterForm = () => {
  const router = useRouter();
  const { register, error } = useAuth();
  const [registerError, setRegisterError] = React.useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'client',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
      role: Yup.string()
        .oneOf(['client', 'trainer'], 'Invalid role')
        .required('Role is required'),
    }),
    onSubmit: async (values) => {
      try {
        setRegisterError('');
        await register(values.name, values.email, values.password, values.role);
        router.push('/dashboard');
      } catch (err: any) {
        setRegisterError(err?.response?.data?.error || 'Registration failed. Please try again.');
      }
    },
  });

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>
      
      {(registerError || error) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {registerError || error}
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`w-full px-3 py-2 border ${
              formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`w-full px-3 py-2 border ${
              formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={`w-full px-3 py-2 border ${
              formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className={`w-full px-3 py-2 border ${
              formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.confirmPassword}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            I am a:
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="client"
                checked={formik.values.role === 'client'}
                onChange={formik.handleChange}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2 text-gray-700">Client</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="trainer"
                checked={formik.values.role === 'trainer'}
                onChange={formik.handleChange}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2 text-gray-700">Trainer</span>
            </label>
          </div>
          {formik.touched.role && formik.errors.role && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.role}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:text-indigo-800">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
