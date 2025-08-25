import React, { useState, useEffect } from 'react';
import { Eye, Check, X, Users, Package, GitMerge, AlertCircle, Calendar, User } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('requirements');
  const [requirements, setRequirements] = useState([]);
  const [donations, setDonations] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [reqRes, donRes, matchRes] = await Promise.all([
        fetch('/api/admin/requirements'),
        fetch('/api/admin/donations'),
        fetch('/api/admin/matches')
      ]);
      
      setRequirements(await reqRes.json());
      setDonations(await donRes.json());
      setMatches(await matchRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleApprove = async (matchId) => {
    try {
      const response = await fetch(`/api/admin/matches/${matchId}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes })
      });
      
      if (response.ok) {
        fetchData(); // Refresh data
        setSelectedItem(null);
        setAdminNotes('');
        alert('Match approved successfully!');
      }
    } catch (error) {
      console.error('Error approving match:', error);
    }
  };

  const handleDisapprove = async (matchId) => {
    try {
      const response = await fetch(`/api/admin/matches/${matchId}/disapprove`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes })
      });
      
      if (response.ok) {
        fetchData(); // Refresh data
        setSelectedItem(null);
        setAdminNotes('');
        alert('Match disapproved successfully!');
      }
    } catch (error) {
      console.error('Error disapproving match:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'disapproved': return 'bg-red-100 text-red-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const RequirementsSection = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Users className="mr-3 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Requirements Details</h2>
        <span className="ml-auto bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
          {requirements.length} Total
        </span>
      </div>
      
      <div className="grid gap-4">
        {requirements.map((req) => (
          <div key={req._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{req.receiver?.name}</h3>
                <p className="text-gray-600">{req.receiver?.email}</p>
                <p className="text-sm text-gray-500">{req.receiver?.phone}</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${req.category === 'educational' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                  {req.category}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  {new Date(req.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="mb-3">
              <h4 className="font-medium text-gray-700 mb-2">Requested Items:</h4>
              <div className="flex flex-wrap gap-2">
                {req.items.map((item, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {item.name} × {item.quantity}
                  </span>
                ))}
              </div>
            </div>
            
            {req.receiver?.address && (
              <p className="text-sm text-gray-600">
                <strong>Address:</strong> {req.receiver.address}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const DonationsSection = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Package className="mr-3 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">Donations Details</h2>
        <span className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
          {donations.length} Total
        </span>
      </div>
      
      <div className="grid gap-4">
        {donations.map((donation) => (
          <div key={donation._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{donation.donor?.name}</h3>
                <p className="text-gray-600">{donation.donor?.email}</p>
                <p className="text-sm text-gray-500">{donation.donor?.phone}</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                  {donation.status}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  {new Date(donation.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="mb-3">
              <h4 className="font-medium text-gray-700 mb-2">Donated Items:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {donation.itemsDonated.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                    )}
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {donation.receiver && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-800">
                  For: {donation.receiver.name} ({donation.receiver.email})
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const MatchesSection = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <GitMerge className="mr-3 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800">Matching Details</h2>
        <span className="ml-auto bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
          {matches.length} Total
        </span>
      </div>
      
      <div className="grid gap-6">
        {matches.map((match) => (
          <div key={match._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Match ID: {match._id.slice(-8)}</h3>
                  <p className="text-sm text-gray-600">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Created: {new Date(match.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(match.status)}`}>
                {match.status}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Donor Information</h4>
                <p className="text-green-700 font-medium">{match.donor?.name}</p>
                <p className="text-sm text-green-600">{match.donor?.email}</p>
                <p className="text-sm text-green-600">{match.donor?.phone}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Receiver Information</h4>
                <p className="text-blue-700 font-medium">{match.receiver?.name}</p>
                <p className="text-sm text-blue-600">{match.receiver?.email}</p>
                <p className="text-sm text-blue-600">{match.receiver?.phone}</p>
                {match.receiver?.address && (
                  <p className="text-sm text-blue-600 mt-1">{match.receiver.address}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-3">Matched Items</h4>
              <div className="grid gap-3">
                {match.matchedItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <span className="font-medium text-gray-800">{item.itemName}</span>
                    <div className="text-sm text-gray-600">
                      <span>Required: {item.requiredQuantity}</span>
                      <span className="mx-2">|</span>
                      <span>Donated: {item.donatedQuantity}</span>
                      <span className="mx-2">|</span>
                      <span className="font-medium text-green-600">Matched: {item.matchedQuantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${match.category === 'educational' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                Category: {match.category}
              </span>
              
              {match.status === 'pending' && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedItem(match)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Review
                  </button>
                </div>
              )}
            </div>

            {match.adminNotes && (
              <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600"><strong>Admin Notes:</strong> {match.adminNotes}</p>
                {match.reviewedAt && (
                  <p className="text-xs text-gray-500 mt-1">
                    Reviewed on: {new Date(match.reviewedAt).toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage requirements, donations, and matches</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Requirements</p>
                <p className="text-2xl font-semibold text-gray-900">{requirements.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Donations</p>
                <p className="text-2xl font-semibold text-gray-900">{donations.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <GitMerge className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Matches</p>
                <p className="text-2xl font-semibold text-gray-900">{matches.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Matches</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {matches.filter(m => m.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'requirements', name: 'Requirements', icon: Users },
              { id: 'donations', name: 'Donations', icon: Package },
              { id: 'matches', name: 'Matches', icon: GitMerge }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'requirements' && <RequirementsSection />}
        {activeTab === 'donations' && <DonationsSection />}
        {activeTab === 'matches' && <MatchesSection />}

        {/* Review Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Review Match</h3>
              <p className="text-gray-600 mb-4">
                Match between {selectedItem.donor?.name} and {selectedItem.receiver?.name}
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Notes (Optional)
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows="3"
                  placeholder="Add any notes about this decision..."
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleApprove(selectedItem._id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Approve
                </button>
                <button
                  onClick={() => handleDisapprove(selectedItem._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  Disapprove
                </button>
              </div>
              
              <button
                onClick={() => setSelectedItem(null)}
                className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;