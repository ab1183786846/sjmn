import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainPage from './pages/MainPage';
import AdminPanel from './components/AdminPanel';
import { useState, useEffect } from 'react';

// 管理员路由守卫组件
const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // 简单的管理员验证 - 在实际应用中应该使用更安全的方式
    const adminKey = localStorage.getItem('adminKey');
    setIsAdmin(adminKey === 'ecommerce_admin_2024');
  }, []);

  if (!isAdmin) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh', 
        padding: '20px'
      }}>
        <h2>管理员验证</h2>
        <p>请输入管理员密码以访问后台</p>
        <input
          type="password"
          id="adminPassword"
          placeholder="输入管理员密码"
          style={{
            padding: '10px',
            margin: '10px 0',
            width: '300px',
            border: '1px solid #ddd',
            borderRadius: '5px'
          }}
        />
        <button
          onClick={() => {
            const password = document.getElementById('adminPassword').value;
            if (password === 'admin123') { // 简单密码，实际应用应更复杂
              localStorage.setItem('adminKey', 'ecommerce_admin_2024');
              setIsAdmin(true);
            } else {
              alert('密码错误！');
            }
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          验证
        </button>
        <button
          onClick={() => {
            window.location.href = '/main';
          }}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          返回首页
        </button>
      </div>
    );
  }

  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [moduleData, setModuleData] = useState(null);

  // 从localStorage加载登录状态
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setIsAuthenticated(true);
      setUser(savedUser);
    }

    // 加载模块数据
    const savedModules = localStorage.getItem('moduleData');
    if (savedModules) {
      setModuleData(JSON.parse(savedModules));
    }
  }, []);

  // 模拟登录
  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUser(username);
    localStorage.setItem('user', username); // 保存登录状态到localStorage
  };

  // 模拟登出
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user'); // 清除登录状态
  };

  // 更新模块数据
  const handleModuleUpdate = (newModules) => {
    setModuleData(newModules);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/main" 
          element={
            isAuthenticated ? 
              <MainPage 
                user={user} 
                onLogout={handleLogout} 
                moduleData={moduleData}
              /> : 
              <Navigate to="/login" />
          } 
        />
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminPanel onUpdate={handleModuleUpdate} />
            </AdminRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;