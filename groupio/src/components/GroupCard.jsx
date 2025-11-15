import { useNavigate } from 'react-router-dom';
import { useGroups } from '../context/GroupsContext';
import './GroupCard.css';

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
    <div className="group-card" onClick={() => navigate(`/group/${group.id}`)}>
      <div
        className="group-card-cover"
        style={{ backgroundImage: `url(${group.coverImage})` }}
      />
      <div className="group-card-content">
        <h3>{group.name}</h3>
        <p className="group-card-description">{group.description}</p>
        <div className="group-card-meta">
          <span className="privacy-badge">
            {group.privacy === 'public' ? 'Public' : 'Private'}
          </span>
          <span>{group.members.length} members</span>
        </div>
        {!isMember && (
          <button
            className="btn btn-primary btn-sm"
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
