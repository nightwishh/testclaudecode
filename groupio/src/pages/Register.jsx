import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const result = register(name, email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800 p-5">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-10 px-5 text-center">
          <h1 className="text-5xl font-bold mb-2 tracking-tight">Groupio</h1>
          <p className="text-purple-100">Join communities and connect with people</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="mb-6 text-text-primary text-2xl font-semibold">Create your account</h2>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 border border-red-200">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-text-primary font-semibold text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-text-primary font-semibold text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-text-primary font-semibold text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="confirmPassword" className="block mb-2 text-text-primary font-semibold text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-3 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2.5 px-5 rounded-md text-base font-semibold hover:bg-primary-hover transition-colors"
          >
            Register
          </button>

          <p className="mt-5 text-center text-text-secondary text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
