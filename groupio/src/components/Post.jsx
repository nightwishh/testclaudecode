import { useState } from 'react';
import { useGroups } from '../context/GroupsContext';
import { useAuth } from '../context/AuthContext';
import './Post.css';

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
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="post">
      <div className="post-header">
        <img
          src={post.authorAvatar}
          alt={post.authorName}
          className="avatar-medium"
        />
        <div className="post-author-info">
          <h4>{post.authorName}</h4>
          <span className="post-time">{formatDate(post.createdAt)}</span>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.image && (
          <img src={post.image} alt="Post content" className="post-image" />
        )}
      </div>

      <div className="post-stats">
        <span>{post.likes.length} likes</span>
        <span>{post.comments.length} comments</span>
      </div>

      <div className="post-actions">
        <button
          className={`post-action-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          {isLiked ? '❤️' : '🤍'} Like
        </button>
        <button
          className="post-action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          💬 Comment
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <form onSubmit={handleComment} className="comment-form">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="avatar-small"
            />
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="comment-input"
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Post
            </button>
          </form>

          <div className="comments-list">
            {post.comments.map(comment => (
              <div key={comment.id} className="comment">
                <img
                  src={comment.authorAvatar}
                  alt={comment.authorName}
                  className="avatar-small"
                />
                <div className="comment-content">
                  <div className="comment-bubble">
                    <h5>{comment.authorName}</h5>
                    <p>{comment.content}</p>
                  </div>
                  <span className="comment-time">{formatDate(comment.createdAt)}</span>
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
