import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const GroupsContext = createContext();

export const useGroups = () => {
  const context = useContext(GroupsContext);
  if (!context) {
    throw new Error('useGroups must be used within GroupsProvider');
  }
  return context;
};

// Initial sample data
const initialGroups = [
  {
    id: '1',
    name: 'React Developers',
    description: 'A community for React developers to share knowledge and best practices',
    privacy: 'public',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=300&fit=crop',
    members: ['1'],
    admins: ['1'],
    posts: []
  },
  {
    id: '2',
    name: 'Web Design Enthusiasts',
    description: 'Share your latest web designs, get feedback, and learn from others',
    privacy: 'public',
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=300&fit=crop',
    members: ['1'],
    admins: ['1'],
    posts: []
  }
];

export const GroupsProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Load groups from localStorage or use initial data
    const storedGroups = localStorage.getItem('groupio_groups');
    if (storedGroups) {
      setGroups(JSON.parse(storedGroups));
    } else {
      setGroups(initialGroups);
      localStorage.setItem('groupio_groups', JSON.stringify(initialGroups));
    }
  }, []);

  const saveGroups = (updatedGroups) => {
    setGroups(updatedGroups);
    localStorage.setItem('groupio_groups', JSON.stringify(updatedGroups));
  };

  const createGroup = (groupData) => {
    const newGroup = {
      id: Date.now().toString(),
      ...groupData,
      members: [currentUser.id],
      admins: [currentUser.id],
      posts: [],
      createdAt: new Date().toISOString()
    };
    const updatedGroups = [...groups, newGroup];
    saveGroups(updatedGroups);
    return newGroup;
  };

  const joinGroup = (groupId) => {
    const updatedGroups = groups.map(group => {
      if (group.id === groupId && !group.members.includes(currentUser.id)) {
        return { ...group, members: [...group.members, currentUser.id] };
      }
      return group;
    });
    saveGroups(updatedGroups);
  };

  const leaveGroup = (groupId) => {
    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        return { ...group, members: group.members.filter(id => id !== currentUser.id) };
      }
      return group;
    });
    saveGroups(updatedGroups);
  };

  const createPost = (groupId, postData) => {
    const newPost = {
      id: Date.now().toString(),
      ...postData,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      createdAt: new Date().toISOString(),
      likes: [],
      comments: []
    };

    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        return { ...group, posts: [newPost, ...group.posts] };
      }
      return group;
    });
    saveGroups(updatedGroups);
    return newPost;
  };

  const likePost = (groupId, postId) => {
    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          posts: group.posts.map(post => {
            if (post.id === postId) {
              const likes = post.likes.includes(currentUser.id)
                ? post.likes.filter(id => id !== currentUser.id)
                : [...post.likes, currentUser.id];
              return { ...post, likes };
            }
            return post;
          })
        };
      }
      return group;
    });
    saveGroups(updatedGroups);
  };

  const addComment = (groupId, postId, content) => {
    const newComment = {
      id: Date.now().toString(),
      content,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      createdAt: new Date().toISOString()
    };

    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          posts: group.posts.map(post => {
            if (post.id === postId) {
              return { ...post, comments: [...post.comments, newComment] };
            }
            return post;
          })
        };
      }
      return group;
    });
    saveGroups(updatedGroups);
  };

  const getGroup = (groupId) => {
    return groups.find(g => g.id === groupId);
  };

  const getUserGroups = () => {
    if (!currentUser) return [];
    return groups.filter(group => group.members.includes(currentUser.id));
  };

  const getDiscoverGroups = () => {
    if (!currentUser) return groups.filter(g => g.privacy === 'public');
    return groups.filter(group =>
      !group.members.includes(currentUser.id) && group.privacy === 'public'
    );
  };

  const value = {
    groups,
    createGroup,
    joinGroup,
    leaveGroup,
    createPost,
    likePost,
    addComment,
    getGroup,
    getUserGroups,
    getDiscoverGroups
  };

  return (
    <GroupsContext.Provider value={value}>
      {children}
    </GroupsContext.Provider>
  );
};
