import React, { useState } from 'react';
import { registerUser } from '../../Permissions/AuthService';

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: '', firstName: '', lastName: '', 
    phone: '', email: '', password: '', confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match!");
    }
    registerUser(form);
    window.location.href = '/';
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={e => setForm({...form, username: e.target.value})} required />
        <input type="text" placeholder="First Name" onChange={e => setForm({...form, firstName: e.target.value})} required />
        <input type="text" placeholder="Last Name" onChange={e => setForm({...form, lastName: e.target.value})} required />
        <input type="tel" placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} required />
        <input type="email" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} required />
        <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} required />
        <input type="password" placeholder="Confirm Password" onChange={e => setForm({...form, confirmPassword: e.target.value})} required />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default RegisterPage;