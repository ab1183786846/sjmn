import { useState, useEffect } from 'react';

const AdminPanel = ({ onUpdate }) => {
  const [moduleData, setModuleData] = useState([
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
  ]);
  
  const [editingModule, setEditingModule] = useState(null);
  const [newModule, setNewModule] = useState({
    id: '',
    name: '',
    icon: '',
    description: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // 保存数据到localStorage
  useEffect(() => {
    localStorage.setItem('moduleData', JSON.stringify(moduleData));
    if (onUpdate) {
      onUpdate(moduleData);
    }
  }, [moduleData, onUpdate]);

  // 从localStorage加载数据
  useEffect(() => {
    const savedData = localStorage.getItem('moduleData');
    if (savedData) {
      setModuleData(JSON.parse(savedData));
    }
  }, []);

  const handleEdit = (module) => {
    setEditingModule({ ...module });
  };

  const handleSaveEdit = () => {
    setModuleData(moduleData.map(m => 
      m.id === editingModule.id ? editingModule : m
    ));
    setEditingModule(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('确定要删除这个模块吗？')) {
      setModuleData(moduleData.filter(m => m.id !== id));
    }
  };

  const handleAddModule = () => {
    if (newModule.id && newModule.name && newModule.icon && newModule.description) {
      setModuleData([...moduleData, { ...newModule }]);
      setNewModule({ id: '', name: '', icon: '', description: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>电商试卷系统</h2>
      
      <button 
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? '取消添加' : '添加新模块'}
      </button>

      {showAddForm && (
        <div style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '20px', 
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          <h3>添加新功能模块</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label>ID (英文):</label>
              <input
                type="text"
                value={newModule.id}
                onChange={(e) => setNewModule({...newModule, id: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '3px'
                }}
              />
            </div>
            <div>
              <label>模块名称:</label>
              <input
                type="text"
                value={newModule.name}
                onChange={(e) => setNewModule({...newModule, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '3px'
                }}
              />
            </div>
            <div>
              <label>图标 (emoji):</label>
              <input
                type="text"
                value={newModule.icon}
                onChange={(e) => setNewModule({...newModule, icon: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '3px'
                }}
              />
            </div>
          </div>
          <div>
            <label>模块描述:</label>
            <textarea
              value={newModule.description}
              onChange={(e) => setNewModule({...newModule, description: e.target.value})}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                border: '1px solid #ddd',
                borderRadius: '3px',
                minHeight: '60px'
              }}
            />
          </div>
          <button 
            onClick={handleAddModule}
            style={{
              marginTop: '15px',
              padding: '8px 16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            保存新模块
          </button>
        </div>
      )}

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>名称</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>图标</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>描述</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {moduleData.map((module) => (
            <tr key={module.id}>
              {editingModule && editingModule.id === module.id ? (
                <>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                    <input
                      type="text"
                      value={editingModule.id}
                      onChange={(e) => setEditingModule({...editingModule, id: e.target.value})}
                      style={{ padding: '5px', width: '100%' }}
                    />
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                    <input
                      type="text"
                      value={editingModule.name}
                      onChange={(e) => setEditingModule({...editingModule, name: e.target.value})}
                      style={{ padding: '5px', width: '100%' }}
                    />
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                    <input
                      type="text"
                      value={editingModule.icon}
                      onChange={(e) => setEditingModule({...editingModule, icon: e.target.value})}
                      style={{ padding: '5px', width: '100%' }}
                    />
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                    <textarea
                      value={editingModule.description}
                      onChange={(e) => setEditingModule({...editingModule, description: e.target.value})}
                      style={{ padding: '5px', width: '100%', minHeight: '40px' }}
                    />
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                    <button 
                      onClick={handleSaveEdit}
                      style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                    >
                      保存
                    </button>
                    <button 
                      onClick={() => setEditingModule(null)}
                      style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                    >
                      取消
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{module.id}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{module.name}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd', fontSize: '20px' }}>{module.icon}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{module.description}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                    <button 
                      onClick={() => handleEdit(module)}
                      style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                    >
                      编辑
                    </button>
                    <button 
                      onClick={() => handleDelete(module.id)}
                      style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                    >
                      删除
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
        <h3>后台使用说明</h3>
        <ul style={{ lineHeight: '1.6' }}>
          <li>您可以添加、编辑或删除功能模块</li>
          <li>修改会自动保存到本地存储</li>
          <li>添加新模块时，请确保填写所有字段</li>
          <li>ID必须使用英文字母，用于系统标识</li>
          <li>图标支持emoji表情符号</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;