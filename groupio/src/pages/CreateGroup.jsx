import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGroups } from '../context/GroupsContext';
import Navbar from '../components/Navbar';

const CreateGroup = () => {
  const navigate = useNavigate();
  const { createGroup } = useGroups();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    privacy: 'public',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=300&fit=crop'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Group name is required');
      return;
    }

    if (!formData.description.trim()) {
      setError('Group description is required');
      return;
    }

    const newGroup = createGroup(formData);
    navigate(`/group/${newGroup.id}`);
  };

  const coverImageOptions = [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800&h=300&fit=crop',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&h=300&fit=crop'
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />

      <div className="max-w-3xl mx-auto px-5 py-6">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h1 className="text-3xl text-text-primary font-bold mb-2">Create a New Group</h1>
          <p className="text-text-secondary mb-8">Build a community around your interests</p>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 border border-red-200">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-text-primary font-semibold text-base">
                Group Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Photography Enthusiasts"
                maxLength={100}
                className="w-full px-3 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block mb-2 text-text-primary font-semibold text-base">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell people what your group is about..."
                rows={4}
                maxLength={500}
                className="w-full px-3 py-3 border border-gray-300 rounded-md text-base resize-y min-h-[100px] focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="privacy" className="block mb-2 text-text-primary font-semibold text-base">
                Privacy
              </label>
              <select
                id="privacy"
                name="privacy"
                value={formData.privacy}
                onChange={handleChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-primary transition-colors"
              >
                <option value="public">Public - Anyone can join</option>
                <option value="private">Private - Invite only</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-text-primary font-semibold text-base">Cover Image</label>
              <div className="w-full h-52 rounded-lg overflow-hidden mb-3">
                <img src={formData.coverImage} alt="Cover preview" className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {coverImageOptions.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Option ${index + 1}`}
                    className={`w-full h-16 object-cover rounded cursor-pointer border-2 transition-all ${
                      formData.coverImage === image ? 'border-primary' : 'border-transparent hover:opacity-80'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, coverImage: image }))}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end mt-8">
              <button
                type="button"
                className="bg-secondary text-gray-900 py-2.5 px-5 rounded-md text-base font-semibold hover:bg-secondary-hover transition-colors"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-white py-2.5 px-5 rounded-md text-base font-semibold hover:bg-primary-hover transition-colors"
              >
                Create Group
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
