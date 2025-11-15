import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGroups } from '../context/GroupsContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';

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
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const isMember = group.members.includes(currentUser.id);
  const isAdmin = group.admins.includes(currentUser.id);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg overflow-hidden my-6 mx-5 shadow-sm">
          <div
            className="h-80 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${group.coverImage})` }}
          >
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
              <h1 className="text-4xl mb-2 font-bold drop-shadow-md">{group.name}</h1>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <span>{group.privacy === 'public' ? 'Public' : 'Private'} Group</span>
                <span>•</span>
                <span>{group.members.length} members</span>
              </div>
            </div>
          </div>

          <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
            <p className="text-text-secondary flex-1">{group.description}</p>
            <button
              className={`${
                isMember
                  ? 'bg-secondary text-gray-900 hover:bg-secondary-hover'
                  : 'bg-primary text-white hover:bg-primary-hover'
              } py-2.5 px-5 rounded-md text-base font-semibold transition-colors whitespace-nowrap`}
              onClick={handleJoinLeave}
            >
              {isMember ? 'Leave Group' : 'Join Group'}
            </button>
          </div>
        </div>

        {isMember && (
          <div className="mx-5">
            <div className="bg-white rounded-lg p-4 flex items-center gap-3 mb-5 shadow-sm">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover"
              />
              <button
                className="flex-1 bg-bg-primary border-none rounded-full py-3 px-4 text-left text-text-secondary cursor-pointer text-base hover:bg-secondary transition-colors"
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

            <div className="flex flex-col gap-4 mb-6">
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
                <div className="text-center py-16 px-5 bg-white rounded-lg">
                  <h3 className="text-text-primary mb-2 text-xl font-semibold">No posts yet</h3>
                  <p className="text-text-secondary">Be the first to share something with this group!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {!isMember && (
          <div className="bg-white rounded-lg py-16 px-5 text-center my-6 mx-5 shadow-sm">
            <h3 className="text-text-primary mb-4 text-xl font-semibold">
              Join this group to see posts and participate
            </h3>
            <button
              className="bg-primary text-white py-2.5 px-5 rounded-md text-base font-semibold hover:bg-primary-hover transition-colors"
              onClick={handleJoinLeave}
            >
              Join Group
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;
