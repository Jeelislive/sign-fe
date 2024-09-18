import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';
import toast from 'react-hot-toast';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        dispatch(signInFailure(data));
        return;
      }
      toast.success('Signed in successfully!');
      dispatch(signInSuccess(data));
      navigate('/signpad');
    } catch (error) {
      toast.error('Something went wrong!');
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            className="block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 rounded-md shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center">
          <OAuth />
        </div>

        <div className="text-center">
          <p className="mt-2">
            Don't have an account?{' '}
            <Link
              to="/sign-up"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
        {error && (
          <p className="text-red-700 mt-5">
            
          </p>
        )}
      </div>
    </div>
  );
}