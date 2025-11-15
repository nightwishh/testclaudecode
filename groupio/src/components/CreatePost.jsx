import { useState } from 'react';
import { useGroups } from '../context/GroupsContext';
import { useAuth } from '../context/AuthContext';

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
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/60 flex items-center justify-center z-[1000] p-5" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-[500px] w-full max-h-[90vh] overflow-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 pr-5 border-b border-secondary flex justify-between items-center">
          <h3 className="text-text-primary text-xl font-semibold">Create Post</h3>
          <button className="w-9 h-9 rounded-full border-none bg-secondary text-2xl cursor-pointer flex items-center justify-center text-text-secondary leading-none hover:bg-secondary-hover transition-colors" onClick={onClose}>×</button>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <h4 className="text-text-primary text-base font-semibold">{currentUser.name}</h4>
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={5}
              autoFocus
              className="w-full border-none text-base resize-none p-0 mb-4 min-h-[120px] focus:outline-none"
            />

            {showImageInput && (
              <div className="mb-4">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Enter image URL or choose from below"
                  className="w-full py-2.5 px-3 border border-gray-300 rounded-md text-sm mb-3 focus:outline-none focus:border-primary transition-colors"
                />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  {sampleImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Sample \${index + 1}`}
                      className={`w-full h-20 object-cover rounded cursor-pointer border-2 transition-all \${
                        image === img ? 'border-primary' : 'border-transparent hover:opacity-80'
                      }`}
                      onClick={() => setImage(img)}
                    />
                  ))}
                </div>
                {image && (
                  <div className="relative w-full rounded-lg overflow-hidden">
                    <img src={image} alt="Preview" className="w-full max-h-[300px] object-cover" />
                    <button
                      type="button"
                      className="absolute top-2 right-2 w-8 h-8 rounded-full border-none bg-white/90 text-2xl cursor-pointer flex items-center justify-center text-gray-900 leading-none shadow-md hover:bg-white transition-colors"
                      onClick={() => setImage('')}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="p-3 border border-secondary rounded-lg mb-4">
              <button
                type="button"
                className="bg-transparent border-none text-text-secondary text-base cursor-pointer py-2 px-2 rounded-md hover:bg-bg-primary transition-colors"
                onClick={() => setShowImageInput(!showImageInput)}
              >
                🖼️ {showImageInput ? 'Hide' : 'Add'} Image
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2.5 px-5 rounded-md text-base font-semibold hover:bg-primary-hover transition-colors disabled:bg-secondary disabled:text-gray-400 disabled:cursor-not-allowed"
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
