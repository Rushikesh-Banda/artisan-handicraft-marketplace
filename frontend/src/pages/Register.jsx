import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
  e.preventDefault();

  if (!name.trim()) {
    setErrorMsg("Name is required");
    return;
  }

  if (!email.trim()) {
    setErrorMsg("Email is required");
    return;
  }

  if (!password.trim()) {
    setErrorMsg("Password is required");
    return;
  }

  setLoading(true);
  setErrorMsg('');

  try {
    await registerUser({
      name,
      email,
      password,
    });

    alert(
      "Registration successful! Please login."
    );

    navigate('/login');

  } catch (error) {

    setErrorMsg(
      error?.response?.data?.message ||
      'Failed to register. Please check your details.'
    );

  } finally {
    setLoading(false);
  }
};
  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
      <div
        className="glass-card"
        style={{
          padding: '3rem',
          width: '100%',
          maxWidth: '400px',
          borderRadius: '12px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-primary)' }}>
          Create Account
        </h2>
        {errorMsg && (
          <p style={{ color: 'var(--error-color)', textAlign: 'center', marginBottom: '1rem' }}>{errorMsg}</p>
        )}
        <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-color)',
              color: 'var(--text-primary)',
            }}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-color)',
              color: 'var(--text-primary)',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-color)',
              color: 'var(--text-primary)',
            }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ marginTop: '1rem', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary-color)' }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
