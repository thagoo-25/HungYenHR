import React, { useState } from 'react';
import { 
  Building2, 
  FileText, 
  Users, 
  Mail, 
  LogOut, 
  Plus, 
  Search, 
  BarChart3,
  MapPin,
  Calendar,
  Clock,
  Eye,
  Edit,
  GraduationCap,
  Briefcase,
  Filter,
  ChevronRight,
  User,
  DollarSign,
  Target
} from 'lucide-react';

interface Course {
  id: number;
  name: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  targetAudience: string;
  fee: number;
  maxStudents: number;
  registeredStudents: number;
  status: 'recruiting' | 'ongoing' | 'completed';
  description: string;
  instructor: string;
  objectives: string[];
}

interface Job {
  id: number;
  title: string;
  location: string;
  salary: string;
  applicants: number;
  status: 'active' | 'expired' | 'closed';
  postedDate: string;
}

const mockCourses: Course[] = [
  {
    id: 1,
    name: 'Kỹ năng phần mềm',
    organization: 'Hưng Yên',
    location: 'Online',
    startDate: '2024-02-15',
    endDate: '2024-03-15',
    targetAudience: 'Kỹ sư phần mềm',
    fee: 0,
    maxStudents: 50,
    registeredStudents: 35,
    status: 'recruiting',
    description: 'Khóa học nâng cao kỹ năng phần mềm cho kỹ sư',
    instructor: 'Nguyễn Văn A',
    objectives: ['Nâng cao kỹ năng lập trình', 'Học công nghệ mới', 'Phát triển dự án thực tế']
  },
  {
    id: 2,
    name: 'Quản lý dự án',
    organization: 'Hà Nội',
    location: 'Trung tâm đào tạo ABC',
    startDate: '2024-03-01',
    endDate: '2024-04-01',
    targetAudience: 'Nhân viên quản lý',
    fee: 2000000,
    maxStudents: 30,
    registeredStudents: 28,
    status: 'recruiting',
    description: 'Khóa học quản lý dự án chuyên nghiệp',
    instructor: 'Trần Thị B',
    objectives: ['Học phương pháp Agile', 'Quản lý nhóm hiệu quả', 'Sử dụng công cụ quản lý']
  }
];

const mockJobs: Job[] = [
  { id: 1, title: 'Kỹ sư phần mềm', location: 'Hưng Yên', salary: '15-25 triệu', applicants: 45, status: 'active', postedDate: '2024-01-15' },
  { id: 2, title: 'Nhân viên kinh doanh', location: 'Hưng Yên', salary: '8-15 triệu', applicants: 32, status: 'active', postedDate: '2024-01-10' },
  { id: 3, title: 'Kế toán trưởng', location: 'Hưng Yên', salary: '20-30 triệu', applicants: 18, status: 'active', postedDate: '2024-01-08' }
];

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'courses' | 'jobs' | 'create-course'>('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [newCourse, setNewCourse] = useState({
    name: '',
    organization: '',
    location: '',
    startDate: '',
    endDate: '',
    targetAudience: '',
    fee: 0,
    maxStudents: 0,
    description: '',
    instructor: '',
    objectives: ['']
  });

  const handleCreateCourse = () => {
    const course: Course = {
      id: courses.length + 1,
      ...newCourse,
      registeredStudents: 0,
      status: 'recruiting',
      objectives: newCourse.objectives.filter(obj => obj.trim() !== '')
    };
    setCourses([...courses, course]);
    setActiveTab('courses');
    setNewCourse({
      name: '',
      organization: '',
      location: '',
      startDate: '',
      endDate: '',
      targetAudience: '',
      fee: 0,
      maxStudents: 0,
      description: '',
      instructor: '',
      objectives: ['']
    });
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recruiting': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'recruiting': return 'Đang tuyển sinh';
      case 'ongoing': return 'Đang diễn ra';
      case 'completed': return 'Đã kết thúc';
      default: return 'Không xác định';
    }
  };

  const renderHeader = () => (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Cổng Doanh nghiệp</h1>
              <p className="text-sm text-gray-600">Công ty TNHH ABC</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setActiveTab('create-course')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Đăng khóa đào tạo</span>
            </button>
            <span className="text-sm text-gray-600">hr@abc-company.com</span>
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  const renderNavigation = () => (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-4 px-2 border-b-2 text-sm font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`py-4 px-2 border-b-2 text-sm font-medium transition-colors ${
              activeTab === 'courses'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
            }`}
          >
            Quản lý đào tạo
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`py-4 px-2 border-b-2 text-sm font-medium transition-colors ${
              activeTab === 'jobs'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
            }`}
          >
            Quản lý tuyển dụng
          </button>
        </div>
      </div>
    </nav>
  );

  const renderDashboard = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Chào mừng đến với Cổng Doanh nghiệp</h2>
        <p className="text-gray-600">Quản lý tuyển dụng và đào tạo nhân tài cho doanh nghiệp của bạn</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tin tuyển dụng đang đăng</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ứng viên quan tâm</p>
              <p className="text-2xl font-bold text-gray-900">84</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Khóa đào tạo</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
            <GraduationCap className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã tuyển dụng</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
            <Briefcase className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Training Courses */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Khóa đào tạo gần đây</h3>
              <button 
                onClick={() => setActiveTab('courses')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
              >
                <span>Xem tất cả</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {courses.slice(0, 3).map((course) => (
                <div key={course.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{course.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{course.organization}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{course.registeredStudents} ứng viên</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                      {getStatusText(course.status)}
                    </span>
                    <div className="flex space-x-1">
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Tin tuyển dụng của bạn</h3>
              <button 
                onClick={() => setActiveTab('jobs')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
              >
                <span>Xem tất cả</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockJobs.slice(0, 3).map((job) => (
                <div key={job.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{job.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3" />
                        <span>{job.salary}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      Đang tuyển
                    </span>
                    <div className="flex space-x-1">
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Thao tác nhanh</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
          <button 
            onClick={() => setActiveTab('create-course')}
            className="p-6 text-center hover:bg-gray-50 transition-colors group"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Đăng khóa đào tạo mới</h4>
                <p className="text-sm text-gray-600">Tạo khóa đào tạo mới</p>
              </div>
            </div>
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            className="p-6 text-center hover:bg-gray-50 transition-colors group"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                <Search className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Tìm khóa đào tạo</h4>
                <p className="text-sm text-gray-600">Tìm kiếm nhân tài phù hợp</p>
              </div>
            </div>
          </button>
          <button className="p-6 text-center hover:bg-gray-50 transition-colors group">
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-200 transition-colors">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Báo cáo</h4>
                <p className="text-sm text-gray-600">Xem báo cáo tuyển dụng</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderCreateCourse = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Đăng khóa đào tạo mới</h2>
          <p className="text-gray-600 mt-1">Tạo khóa đào tạo mới để người lao động có thể đăng ký tham gia</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên khóa đào tạo *
              </label>
              <input
                type="text"
                value={newCourse.name}
                onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập tên khóa đào tạo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đơn vị tổ chức *
              </label>
              <input
                type="text"
                value={newCourse.organization}
                onChange={(e) => setNewCourse({...newCourse, organization: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập đơn vị tổ chức"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa điểm *
              </label>
              <input
                type="text"
                value={newCourse.location}
                onChange={(e) => setNewCourse({...newCourse, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập địa điểm (offline/online)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đối tượng tham gia *
              </label>
              <input
                type="text"
                value={newCourse.targetAudience}
                onChange={(e) => setNewCourse({...newCourse, targetAudience: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Công nhân, kỹ sư, nhân viên..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày bắt đầu *
              </label>
              <input
                type="date"
                value={newCourse.startDate}
                onChange={(e) => setNewCourse({...newCourse, startDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày kết thúc *
              </label>
              <input
                type="date"
                value={newCourse.endDate}
                onChange={(e) => setNewCourse({...newCourse, endDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Học phí (VND)
              </label>
              <input
                type="number"
                value={newCourse.fee}
                onChange={(e) => setNewCourse({...newCourse, fee: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0 (Miễn phí)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chỉ tiêu số lượng *
              </label>
              <input
                type="number"
                value={newCourse.maxStudents}
                onChange={(e) => setNewCourse({...newCourse, maxStudents: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập số lượng học viên tối đa"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giảng viên *
              </label>
              <input
                type="text"
                value={newCourse.instructor}
                onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập tên giảng viên"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nội dung chi tiết *
              </label>
              <textarea
                value={newCourse.description}
                onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Mô tả chi tiết về khóa đào tạo..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mục tiêu đào tạo
              </label>
              {newCourse.objectives.map((objective, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={objective}
                    onChange={(e) => {
                      const newObjectives = [...newCourse.objectives];
                      newObjectives[index] = e.target.value;
                      setNewCourse({...newCourse, objectives: newObjectives});
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập mục tiêu đào tạo"
                  />
                  {index === newCourse.objectives.length - 1 && (
                    <button
                      onClick={() => setNewCourse({...newCourse, objectives: [...newCourse.objectives, '']})}
                      className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <button
              onClick={() => setActiveTab('courses')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleCreateCourse}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Đăng khóa đào tạo
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Quản lý khóa đào tạo</h2>
            <p className="text-gray-600 mt-1">Quản lý tất cả các khóa đào tạo của doanh nghiệp</p>
          </div>
          <button 
            onClick={() => setActiveTab('create-course')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Đăng khóa mới</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên khóa học hoặc đơn vị tổ chức..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="recruiting">Đang tuyển sinh</option>
              <option value="ongoing">Đang diễn ra</option>
              <option value="completed">Đã kết thúc</option>
            </select>
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Danh sách khóa đào tạo ({filteredCourses.length})
          </h3>
        </div>
        <div className="divide-y">
          {filteredCourses.map((course) => (
            <div key={course.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-medium text-gray-900">{course.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                      {getStatusText(course.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4" />
                      <span>{course.organization}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{course.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(course.startDate).toLocaleDateString('vi-VN')} - {new Date(course.endDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{course.registeredStudents}/{course.maxStudents} học viên</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4" />
                      <span>{course.targetAudience}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span>{course.fee === 0 ? 'Miễn phí' : `${course.fee.toLocaleString()} VND`}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button 
                    onClick={() => setSelectedCourse(course)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Xem chi tiết"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCourseDetail = () => {
    if (!selectedCourse) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.name}</h2>
                <p className="text-gray-600 mt-1">Chi tiết khóa đào tạo</p>
              </div>
              <button 
                onClick={() => setSelectedCourse(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin cơ bản</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-5 w-5 text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-600">Đơn vị tổ chức:</span>
                      <p className="font-medium">{selectedCourse.organization}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-600">Địa điểm:</span>
                      <p className="font-medium">{selectedCourse.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-600">Thời gian:</span>
                      <p className="font-medium">
                        {new Date(selectedCourse.startDate).toLocaleDateString('vi-VN')} - 
                        {new Date(selectedCourse.endDate).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-600">Đối tượng:</span>
                      <p className="font-medium">{selectedCourse.targetAudience}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-600">Học phí:</span>
                      <p className="font-medium">
                        {selectedCourse.fee === 0 ? 'Miễn phí' : `${selectedCourse.fee.toLocaleString()} VND`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-600">Tình trạng đăng ký:</span>
                      <p className="font-medium">{selectedCourse.registeredStudents}/{selectedCourse.maxStudents} học viên</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Chi tiết khóa học</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">Giảng viên:</span>
                    <p className="font-medium">{selectedCourse.instructor}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Mô tả:</span>
                    <p className="mt-1 text-gray-700">{selectedCourse.description}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Mục tiêu đào tạo:</span>
                    <ul className="mt-2 space-y-1">
                      {selectedCourse.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-gray-700">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedCourse.status)}`}>
                {getStatusText(selectedCourse.status)}
              </span>
              <div className="space-x-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Liên hệ đơn vị
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Xem danh sách học viên
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderJobs = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Quản lý tin tuyển dụng</h2>
            <p className="text-gray-600 mt-1">Quản lý tất cả tin tuyển dụng của doanh nghiệp</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Đăng tin mới</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Danh sách tin tuyển dụng ({mockJobs.length})
          </h3>
        </div>
        <div className="divide-y">
          {mockJobs.map((job) => (
            <div key={job.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-medium text-gray-900">{job.title}</h4>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Đang tuyển
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{job.applicants} ứng viên</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 mt-2">
                    Đăng ngày: {new Date(job.postedDate).toLocaleDateString('vi-VN')}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      {renderNavigation()}
      
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'courses' && renderCourses()}
      {activeTab === 'jobs' && renderJobs()}
      {activeTab === 'create-course' && renderCreateCourse()}
      {selectedCourse && renderCourseDetail()}
    </div>
  );
}

export default App;