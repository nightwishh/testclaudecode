import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGroups } from '../context/GroupsContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import GroupCard from '../components/GroupCard';

const Home = () => {
  const { getUserGroups, getDiscoverGroups } = useGroups();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my-groups');

  const myGroups = getUserGroups();
  const discoverGroups = getDiscoverGroups();

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-4xl text-text-primary font-bold">Groups</h1>
          <button
            className="bg-primary text-white py-2.5 px-5 rounded-md text-base font-semibold hover:bg-primary-hover transition-colors"
            onClick={() => navigate('/create-group')}
          >
            + Create Group
          </button>
        </div>

        <div className="flex gap-2 mb-6 border-b-2 border-secondary">
          <button
            className={`py-3 px-6 text-base font-semibold border-b-4 -mb-0.5 transition-all ${
              activeTab === 'my-groups'
                ? 'text-primary border-primary'
                : 'text-text-secondary border-transparent hover:bg-bg-primary rounded-t-lg'
            }`}
            onClick={() => setActiveTab('my-groups')}
          >
            My Groups ({myGroups.length})
          </button>
          <button
            className={`py-3 px-6 text-base font-semibold border-b-4 -mb-0.5 transition-all ${
              activeTab === 'discover'
                ? 'text-primary border-primary'
                : 'text-text-secondary border-transparent hover:bg-bg-primary rounded-t-lg'
            }`}
            onClick={() => setActiveTab('discover')}
          >
            Discover ({discoverGroups.length})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeTab === 'my-groups' ? (
            myGroups.length > 0 ? (
              myGroups.map(group => (
                <GroupCard key={group.id} group={group} isMember={true} />
              ))
            ) : (
              <div className="col-span-full text-center py-16 px-5 bg-white rounded-lg my-5">
                <h3 className="text-text-primary mb-2 text-xl font-semibold">You haven't joined any groups yet</h3>
                <p className="text-text-secondary mb-5">Discover groups and connect with communities that interest you</p>
                <button
                  className="bg-primary text-white py-2.5 px-5 rounded-md text-base font-semibold hover:bg-primary-hover transition-colors"
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
              <div className="col-span-full text-center py-16 px-5 bg-white rounded-lg my-5">
                <h3 className="text-text-primary mb-2 text-xl font-semibold">No groups to discover</h3>
                <p className="text-text-secondary mb-5">You've joined all available public groups!</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
