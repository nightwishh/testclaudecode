import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
        <div className="cursor-pointer" onClick={() => navigate('/')}>
          <h2 className="text-primary text-3xl font-bold tracking-tight">Groupio</h2>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="font-semibold text-text-primary hidden sm:block">{currentUser.name}</span>
          <button
            className="bg-secondary text-gray-900 py-1.5 px-3 rounded-md text-sm font-semibold hover:bg-secondary-hover transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
