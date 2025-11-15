import { useNavigate } from 'react-router-dom';
import { useGroups } from '../context/GroupsContext';

const GroupCard = ({ group, isMember }) => {
  const navigate = useNavigate();
  const { joinGroup } = useGroups();

  const handleJoinClick = (e) => {
    e.stopPropagation();
    joinGroup(group.id);
    // Force a re-render by navigating
    window.location.reload();
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl"
      onClick={() => navigate(`/group/${group.id}`)}
    >
      <div
        className="w-full h-40 bg-cover bg-center bg-secondary"
        style={{ backgroundImage: `url(${group.coverImage})` }}
      />
      <div className="p-4">
        <h3 className="text-text-primary text-lg font-semibold mb-2 truncate">{group.name}</h3>
        <p className="text-text-secondary text-sm mb-3 line-clamp-2 leading-relaxed">
          {group.description}
        </p>
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-3">
          <span className="bg-secondary px-2 py-1 rounded text-xs font-semibold">
            {group.privacy === 'public' ? 'Public' : 'Private'}
          </span>
          <span>{group.members.length} members</span>
        </div>
        {!isMember && (
          <button
            className="bg-primary text-white py-1.5 px-3 rounded-md text-sm font-semibold hover:bg-primary-hover transition-colors"
            onClick={handleJoinClick}
          >
            Join Group
          </button>
        )}
      </div>
    </div>
  );
};

export default GroupCard;
