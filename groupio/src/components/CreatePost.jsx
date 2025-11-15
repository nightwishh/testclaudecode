import { useState } from 'react';
import { useGroups } from '../context/GroupsContext';
import { useAuth } from '../context/AuthContext';
import './CreatePost.css';

const CreatePost = ({ groupId, onClose, onPostCreated }) => {
  const { createPost } = useGroups();
  const { currentUser } = useAuth();
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      createPost(groupId, { content, image: image || undefined });
      onPostCreated();
    }
  };

  const sampleImages = [
    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop'
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="create-post-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Create Post</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="post-author">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="avatar-medium"
            />
            <h4>{currentUser.name}</h4>
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={5}
              autoFocus
            />

            {showImageInput && (
              <div className="image-section">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Enter image URL or choose from below"
                  className="image-url-input"
                />
                <div className="sample-images">
                  {sampleImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Sample ${index + 1}`}
                      className={`sample-image ${image === img ? 'selected' : ''}`}
                      onClick={() => setImage(img)}
                    />
                  ))}
                </div>
                {image && (
                  <div className="image-preview">
                    <img src={image} alt="Preview" />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => setImage('')}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="post-options">
              <button
                type="button"
                className="option-btn"
                onClick={() => setShowImageInput(!showImageInput)}
              >
                🖼️ {showImageInput ? 'Hide' : 'Add'} Image
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={!content.trim()}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
