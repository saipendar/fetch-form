// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const UserForm = () => {
  const [occupations, setOccupations] = useState([]);
  const [states, setStates] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { data } = await axios.get(
          'https://frontend-take-home.fetchrewards.com/form',
          { withCredentials: true }
        );
        setOccupations(data.occupations);
        setStates(data.states);
      } catch (err) {
        console.error('Failed to fetch form options:', err);
      }
    };
    fetchOptions();
  }, []);

  const onSubmit = async (formData) => {
    try {
      await axios.post(
        'https://frontend-take-home.fetchrewards.com/form',
        formData,
        { withCredentials: true }
      );
      alert('User submitted successfully!');
    } catch (err) {
      console.error('Form submission error:', err);
      alert('Failed to submit form.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>User Registration</h2>

      <input {...register('name', { required: true })} placeholder="Name" />
      {errors.name && <p>Name is required</p>}

      <input {...register('email', { required: true })} placeholder="Email" />
      {errors.email && <p>Email is required</p>}

      <input
        type="password"
        {...register('password', { required: true })}
        placeholder="Password"
      />
      {errors.password && <p>Password is required</p>}

      <select {...register('occupation', { required: true })}>
        <option value="">Select Occupation</option>
        {occupations.map((occ, idx) => (
          <option key={idx} value={occ}>{occ}</option>
        ))}
      </select>
      {errors.occupation && <p>Occupation is required</p>}

      <select {...register('state', { required: true })}>
        <option value="">Select State</option>
        {states.map((st, idx) => (
          <option key={idx} value={st.abbreviation}>{st.name}</option>
        ))}
      </select>
      {errors.state && <p>State is required</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
