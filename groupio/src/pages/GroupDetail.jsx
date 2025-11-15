import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGroups } from '../context/GroupsContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';
import './GroupDetail.css';

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { getGroup, joinGroup, leaveGroup } = useGroups();
  const { currentUser } = useAuth();
  const [group, setGroup] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    const groupData = getGroup(groupId);
    if (!groupData) {
      navigate('/');
      return;
    }
    setGroup(groupData);
  }, [groupId, getGroup, navigate]);

  const handleJoinLeave = () => {
    if (isMember) {
      leaveGroup(groupId);
    } else {
      joinGroup(groupId);
    }
    // Refresh group data
    setGroup(getGroup(groupId));
  };

  if (!group) {
    return <div>Loading...</div>;
  }

  const isMember = group.members.includes(currentUser.id);
  const isAdmin = group.admins.includes(currentUser.id);

  return (
    <div className="page-container">
      <Navbar />

      <div className="group-detail-container">
        <div className="group-header">
          <div
            className="group-cover"
            style={{ backgroundImage: `url(${group.coverImage})` }}
          >
            <div className="group-cover-overlay">
              <h1>{group.name}</h1>
              <div className="group-meta">
                <span>{group.privacy === 'public' ? 'Public' : 'Private'} Group</span>
                <span>•</span>
                <span>{group.members.length} members</span>
              </div>
            </div>
          </div>

          <div className="group-actions">
            <p className="group-description">{group.description}</p>
            <button
              className={`btn ${isMember ? 'btn-secondary' : 'btn-primary'}`}
              onClick={handleJoinLeave}
            >
              {isMember ? 'Leave Group' : 'Join Group'}
            </button>
          </div>
        </div>

        {isMember && (
          <div className="group-content">
            <div className="create-post-trigger">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="avatar-small"
              />
              <button
                className="post-input-trigger"
                onClick={() => setShowCreatePost(true)}
              >
                What's on your mind, {currentUser.name.split(' ')[0]}?
              </button>
            </div>

            {showCreatePost && (
              <CreatePost
                groupId={groupId}
                onClose={() => setShowCreatePost(false)}
                onPostCreated={() => {
                  setShowCreatePost(false);
                  setGroup(getGroup(groupId));
                }}
              />
            )}

            <div className="posts-feed">
              {group.posts && group.posts.length > 0 ? (
                group.posts.map(post => (
                  <Post
                    key={post.id}
                    post={post}
                    groupId={groupId}
                    onUpdate={() => setGroup(getGroup(groupId))}
                  />
                ))
              ) : (
                <div className="empty-state">
                  <h3>No posts yet</h3>
                  <p>Be the first to share something with this group!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {!isMember && (
          <div className="join-prompt">
            <h3>Join this group to see posts and participate</h3>
            <button className="btn btn-primary" onClick={handleJoinLeave}>
              Join Group
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;
