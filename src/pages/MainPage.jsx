import { useState } from 'react';

const MainPage = ({ user, onLogout }) => {
  const [activeModule, setActiveModule] = useState('dashboard');

  // 功能模块数据
  const modules = [
    {
      id: 'logistics',
      name: '物流',
      icon: '🚚',
      description: '管理订单物流信息，实时跟踪货物状态'
    },
    {
      id: 'ps',
      name: 'PS',
      icon: '🛍️',
      description: '管理产品信息、库存和服务相关内容'
    },
    {
      id: 'network',
      name: '网点',
      icon: '📍',
      description: '管理线下服务网点和配送中心'
    },
    {
      id: 'marketing',
      name: '营销',
      icon: '📈',
      description: '营销活动策划与数据分析'
    },
    {
      id: 'customer',
      name: '客服',
      icon: '🤝',
      description: '处理客户咨询和售后服务'
    },
    {
      id: 'settings',
      name: '系统设置',
      icon: '⚙️',
      description: '账号安全和个性化设置'
    }
  ];

  return (
    <div className="main-layout">
      {/* 侧边栏 */}
      <aside className="sidebar">
        <h3>电商试卷系统</h3>
        <ul className="nav-menu">
          <li>
            <a 
              href="#dashboard" 
              className={activeModule === 'dashboard' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setActiveModule('dashboard');
              }}
            >
              首页
            </a>
          </li>
          {modules.map(module => (
            <li key={module.id}>
              <a 
                href={`#${module.id}`}
                className={activeModule === module.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveModule(module.id);
                }}
              >
                {module.name}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* 主内容区 */}
      <main className="content">
        <div className="header">
          <h1>{activeModule === 'dashboard' ? '欢迎使用电商试卷系统' : modules.find(m => m.id === activeModule)?.name || '功能模块'}</h1>
          <div className="user-info">
            <span>当前用户: {user}</span>
            <button className="logout-button" onClick={onLogout}>退出登录</button>
          </div>
        </div>

        {/* 功能模块展示 */}
        {activeModule === 'dashboard' && (
          <div className="module-grid">
            {modules.map(module => (
              <div 
                key={module.id} 
                className="module-card"
                onClick={() => setActiveModule(module.id)}
              >
                <div className="module-icon">{module.icon}</div>
                <h3>{module.name}</h3>
                <p>{module.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* 模块详情展示 */}
        {activeModule !== 'dashboard' && (
          <div style={{ 
            background: 'white', 
            borderRadius: '10px', 
            padding: '30px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2>{modules.find(m => m.id === activeModule)?.name} 模块</h2>
            <p style={{ marginTop: '20px', color: '#718096' }}>
              {modules.find(m => m.id === activeModule)?.description}
            </p>
            <p style={{ marginTop: '10px', color: '#718096' }}>
              模块功能开发中...
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;