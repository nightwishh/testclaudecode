import { useState } from 'react';
import { useGroups } from '../context/GroupsContext';
import { useAuth } from '../context/AuthContext';

const Post = ({ post, groupId, onUpdate }) => {
  const { likePost, addComment } = useGroups();
  const { currentUser } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const isLiked = post.likes.includes(currentUser.id);

  const handleLike = () => {
    likePost(groupId, post.id);
    onUpdate();
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(groupId, post.id, commentText);
      setCommentText('');
      onUpdate();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `\${diffInMins}m ago`;
    if (diffInHours < 24) return `\${diffInHours}h ago`;
    if (diffInDays < 7) return `\${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 flex items-center gap-3">
        <img
          src={post.authorAvatar}
          alt={post.authorName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h4 className="text-text-primary text-base font-semibold">{post.authorName}</h4>
          <span className="text-text-secondary text-sm">{formatDate(post.createdAt)}</span>
        </div>
      </div>

      <div className="px-4 pb-3">
        <p className="text-text-primary text-base leading-relaxed mb-3 whitespace-pre-wrap">
          {post.content}
        </p>
        {post.image && (
          <img src={post.image} alt="Post content" className="w-full max-h-[500px] object-cover mt-3 rounded" />
        )}
      </div>

      <div className="px-4 py-2 flex justify-between border-t border-b border-secondary text-text-secondary text-sm">
        <span>{post.likes.length} likes</span>
        <span>{post.comments.length} comments</span>
      </div>

      <div className="px-2 py-1 flex gap-1">
        <button
          className={`flex-1 py-2 px-2 bg-transparent border-none text-text-secondary text-base font-semibold cursor-pointer rounded-md transition-colors hover:bg-bg-primary \${
            isLiked ? 'text-danger' : ''
          }`}
          onClick={handleLike}
        >
          {isLiked ? '❤️' : '🤍'} Like
        </button>
        <button
          className="flex-1 py-2 px-2 bg-transparent border-none text-text-secondary text-base font-semibold cursor-pointer rounded-md transition-colors hover:bg-bg-primary"
          onClick={() => setShowComments(!showComments)}
        >
          💬 Comment
        </button>
      </div>

      {showComments && (
        <div className="px-4 py-4 bg-bg-primary">
          <form onSubmit={handleComment} className="flex items-center gap-2 mb-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover"
            />
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 py-2.5 px-3 border-none rounded-full bg-white text-sm focus:outline-none"
            />
            <button type="submit" className="bg-primary text-white py-1.5 px-3 rounded-md text-sm font-semibold hover:bg-primary-hover transition-colors">
              Post
            </button>
          </form>

          <div className="flex flex-col gap-3">
            {post.comments.map(comment => (
              <div key={comment.id} className="flex gap-2">
                <img
                  src={comment.authorAvatar}
                  alt={comment.authorName}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="bg-white py-2.5 px-3 rounded-xl mb-1">
                    <h5 className="text-text-primary text-sm font-semibold mb-1">{comment.authorName}</h5>
                    <p className="text-text-primary text-sm leading-snug">{comment.content}</p>
                  </div>
                  <span className="text-text-secondary text-xs pl-3">{formatDate(comment.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
