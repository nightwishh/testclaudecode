import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGroups } from '../context/GroupsContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import GroupCard from '../components/GroupCard';
import './Home.css';

const Home = () => {
  const { getUserGroups, getDiscoverGroups } = useGroups();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my-groups');

  const myGroups = getUserGroups();
  const discoverGroups = getDiscoverGroups();

  return (
    <div className="page-container">
      <Navbar />

      <div className="home-container">
        <div className="home-header">
          <h1>Groups</h1>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/create-group')}
          >
            + Create Group
          </button>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'my-groups' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-groups')}
          >
            My Groups ({myGroups.length})
          </button>
          <button
            className={`tab ${activeTab === 'discover' ? 'active' : ''}`}
            onClick={() => setActiveTab('discover')}
          >
            Discover ({discoverGroups.length})
          </button>
        </div>

        <div className="groups-grid">
          {activeTab === 'my-groups' ? (
            myGroups.length > 0 ? (
              myGroups.map(group => (
                <GroupCard key={group.id} group={group} isMember={true} />
              ))
            ) : (
              <div className="empty-state">
                <h3>You haven't joined any groups yet</h3>
                <p>Discover groups and connect with communities that interest you</p>
                <button
                  className="btn btn-primary"
                  onClick={() => setActiveTab('discover')}
                >
                  Discover Groups
                </button>
              </div>
            )
          ) : (
            discoverGroups.length > 0 ? (
              discoverGroups.map(group => (
                <GroupCard key={group.id} group={group} isMember={false} />
              ))
            ) : (
              <div className="empty-state">
                <h3>No groups to discover</h3>
                <p>You've joined all available public groups!</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
