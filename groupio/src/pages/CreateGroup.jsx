import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGroups } from '../context/GroupsContext';
import Navbar from '../components/Navbar';
import './CreateGroup.css';

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
    <div className="page-container">
      <Navbar />

      <div className="create-group-container">
        <div className="create-group-card">
          <h1>Create a New Group</h1>
          <p className="subtitle">Build a community around your interests</p>

          <form onSubmit={handleSubmit} className="create-group-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="name">Group Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Photography Enthusiasts"
                maxLength={100}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell people what your group is about..."
                rows={4}
                maxLength={500}
              />
            </div>

            <div className="form-group">
              <label htmlFor="privacy">Privacy</label>
              <select
                id="privacy"
                name="privacy"
                value={formData.privacy}
                onChange={handleChange}
              >
                <option value="public">Public - Anyone can join</option>
                <option value="private">Private - Invite only</option>
              </select>
            </div>

            <div className="form-group">
              <label>Cover Image</label>
              <div className="cover-image-preview">
                <img src={formData.coverImage} alt="Cover preview" />
              </div>
              <div className="cover-image-options">
                {coverImageOptions.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Option ${index + 1}`}
                    className={formData.coverImage === image ? 'selected' : ''}
                    onClick={() => setFormData(prev => ({ ...prev, coverImage: image }))}
                  />
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
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
