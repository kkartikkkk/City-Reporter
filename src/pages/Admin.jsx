import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  Search, 
  Settings, 
  Users, 
  FileText, 
  Map, 
  MessageSquare, 
  PieChart, 
  LogOut, 
  ChevronDown, 
  Filter, 
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

// Sample data
const sampleReports = [
  { 
    id: 1, 
    title: 'Pothole on Main Street', 
    category: 'Infrastructure', 
    location: '123 Main St', 
    status: 'Pending', 
    date: '2025-05-15', 
    reporter: 'John Doe',
    priority: 'High'
  },
  { 
    id: 2, 
    title: 'Broken Street Light', 
    category: 'Utilities', 
    location: '456 Oak Ave', 
    status: 'In Progress', 
    date: '2025-05-14', 
    reporter: 'Jane Smith',
    priority: 'Medium'
  },
  { 
    id: 3, 
    title: 'Graffiti on Public Building', 
    category: 'Vandalism', 
    location: '789 Pine Rd', 
    status: 'Resolved', 
    date: '2025-05-10', 
    reporter: 'Alex Johnson',
    priority: 'Low'
  },
  { 
    id: 4, 
    title: 'Fallen Tree Blocking Sidewalk', 
    category: 'Environment', 
    location: '321 Elm St', 
    status: 'Pending', 
    date: '2025-05-16', 
    reporter: 'Sam Wilson',
    priority: 'High'
  },
  { 
    id: 5, 
    title: 'Illegal Dumping', 
    category: 'Waste', 
    location: '654 Maple Dr', 
    status: 'In Progress', 
    date: '2025-05-13', 
    reporter: 'Taylor Brown',
    priority: 'Medium'
  }
];

const stats = [
  { label: 'Total Reports', value: 1245, change: '+12%' },
  { label: 'Pending', value: 328, change: '-5%' },
  { label: 'In Progress', value: 516, change: '+8%' },
  { label: 'Resolved', value: 401, change: '+15%' }
];

const getStatusColor = (status) => {
  switch(status) {
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'In Progress': return 'bg-blue-100 text-blue-800';
    case 'Resolved': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority) => {
  switch(priority) {
    case 'High': return 'bg-red-100 text-red-800';
    case 'Medium': return 'bg-orange-100 text-orange-800';
    case 'Low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function CityReporterAdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [reports, setReports] = useState(sampleReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReport, setSelectedReport] = useState(null);
  
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.reporter.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || report.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (reportId, newStatus) => {
    setReports(reports.map(report => 
      report.id === reportId ? {...report, status: newStatus} : report
    ));
    if (selectedReport && selectedReport.id === reportId) {
      setSelectedReport({...selectedReport, status: newStatus});
    }
  };

  const handleDeleteReport = (reportId) => {
    setReports(reports.filter(report => report.id !== reportId));
    if (selectedReport && selectedReport.id === reportId) {
      setSelectedReport(null);
    }
  };



//   const LogOut = () => {
// const navigate = useNavigate();
// }

// const handleLogout = () => {

//   navigate("/");
//   };






  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white flex flex-col">
        <div className="p-4 flex items-center border-b border-indigo-700">
          <div className="bg-white rounded-md p-1 mr-2">
            <Map className="w-6 h-6 text-indigo-800" />
          </div>
          <h1 className="text-xl font-bold">CityReporter</h1>
        </div>
        
        <nav className="flex-1">
          <div className="py-4">
            <p className="px-4 text-xs font-semibold text-indigo-300 uppercase tracking-wider">Main</p>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`mt-2 flex items-center w-full px-4 py-2 ${activeTab === 'dashboard' ? 'bg-indigo-900 text-white' : 'text-indigo-100 hover:bg-indigo-700'}`}
            >
              <PieChart className="w-5 h-5 mr-3" />
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('reports')}
              className={`mt-1 flex items-center w-full px-4 py-2 ${activeTab === 'reports' ? 'bg-indigo-900 text-white' : 'text-indigo-100 hover:bg-indigo-700'}`}
            >
              <FileText className="w-5 h-5 mr-3" />
              Reports
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`mt-1 flex items-center w-full px-4 py-2 ${activeTab === 'users' ? 'bg-indigo-900 text-white' : 'text-indigo-100 hover:bg-indigo-700'}`}
            >
              <Users className="w-5 h-5 mr-3" />
              Users
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`mt-1 flex items-center w-full px-4 py-2 ${activeTab === 'messages' ? 'bg-indigo-900 text-white' : 'text-indigo-100 hover:bg-indigo-700'}`}
            >
              <MessageSquare className="w-5 h-5 mr-3" />
              Messages
            </button>
          </div>
          
          <div className="py-4">
            <p className="px-4 text-xs font-semibold text-indigo-300 uppercase tracking-wider">Settings</p>
            <button className="mt-2 flex items-center w-full px-4 py-2 text-indigo-100 hover:bg-indigo-700">
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </button>
          </div>
        </nav>

        
        <div className="p-4 border-t border-indigo-700">
         {/* <Link to="/LandingPage"> */}
          <button className="flex items-center w-full px-4 py-2 text-indigo-100 hover:bg-indigo-700 rounded">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
         {/* </Link> */}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-96">
              <Search className="h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search reports, users..." 
                className="ml-2 bg-transparent focus:outline-none w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full bg-gray-100 relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center">
                <img 
                  src="/api/placeholder/32/32" 
                  alt="Admin user" 
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-700">Admin User</p>
                  <p className="text-xs text-gray-500">admin@cityreporter.gov</p>
                </div>
                <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-4">
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <div className="flex items-end justify-between mt-2">
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                      <div className={`text-sm ${stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Recent Reports */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-4 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Reports</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reports.slice(0, 5).map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{report.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{report.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{report.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}>
                              {report.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {report.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div className="flex h-full">
              {/* Reports List */}
              <div className={`${selectedReport ? 'w-2/3 pr-4' : 'w-full'}`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Reports</h2>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <select 
                        className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option>All</option>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                    <button className="p-2 bg-white border border-gray-300 rounded-md">
                      <Filter className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Priority
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Reporter
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredReports.map((report) => (
                          <tr 
                            key={report.id} 
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => setSelectedReport(report)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{report.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{report.category}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(report.priority)}`}>
                                {report.priority}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}>
                                {report.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {report.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {report.reporter}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                                <button 
                                  className="text-indigo-600 hover:text-indigo-900" 
                                  onClick={() => setSelectedReport(report)}
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button 
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() => handleDeleteReport(report.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              {/* Report Detail */}
              {selectedReport && (
                <div className="w-1/3 bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Report Details</h3>
                    <button onClick={() => setSelectedReport(null)} className="text-gray-400 hover:text-gray-500">
                      <XCircle className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Title</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedReport.title}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Category</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedReport.category}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedReport.location}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Reporter</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedReport.reporter}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date Reported</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedReport.date}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Priority</p>
                      <div className="mt-1">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(selectedReport.priority)}`}>
                          {selectedReport.priority}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <div className="mt-1">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedReport.status)}`}>
                          {selectedReport.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-sm font-medium text-gray-500 mb-2">Update Status</p>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleStatusChange(selectedReport.id, 'Pending')}
                          className={`px-3 py-1 text-xs rounded-md ${selectedReport.status === 'Pending' ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-800'}`}
                        >
                          Pending
                        </button>
                        <button 
                          onClick={() => handleStatusChange(selectedReport.id, 'In Progress')}
                          className={`px-3 py-1 text-xs rounded-md ${selectedReport.status === 'In Progress' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'}`}
                        >
                          In Progress
                        </button>
                        <button 
                          onClick={() => handleStatusChange(selectedReport.id, 'Resolved')}
                          className={`px-3 py-1 text-xs rounded-md ${selectedReport.status === 'Resolved' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800'}`}
                        >
                          Resolved
                        </button>
                      </div>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-gray-200">
                      <button 
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Assign to Department
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Users</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-500">User management panel would go here.</p>
              </div>
            </div>
          )}
          
          {activeTab === 'messages' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Messages</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-500">Messaging system would go here.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

