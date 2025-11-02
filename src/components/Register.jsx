import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    type: 'phone' // phone or email
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('请输入手机号或邮箱');
      return false;
    }
    if (formData.type === 'phone' && !/^1[3-9]\d{9}$/.test(formData.username)) {
      setError('请输入正确的手机号');
      return false;
    }
    if (formData.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.username)) {
      setError('请输入正确的邮箱地址');
      return false;
    }
    if (!formData.password.trim()) {
      setError('请输入密码');
      return false;
    }
    if (formData.password.length < 6) {
      setError('密码长度不能少于6位');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // 模拟注册
      console.log('Register with:', formData);
      alert('注册成功，请登录');
      navigate('/login');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>用户注册</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>注册类型</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="phone"
                  checked={formData.type === 'phone'}
                  onChange={handleChange}
                />
                手机号
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="email"
                  checked={formData.type === 'email'}
                  onChange={handleChange}
                />
                邮箱
              </label>
            </div>
          </div>
          
          <div className="input-group">
            <label>{formData.type === 'phone' ? '手机号' : '邮箱地址'}</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={formData.type === 'phone' ? '请输入手机号' : '请输入邮箱地址'}
            />
          </div>
          
          <div className="input-group">
            <label>密码</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="请设置密码（至少6位）"
            />
          </div>
          
          <div className="input-group">
            <label>确认密码</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="请再次输入密码"
            />
          </div>
          
          <button type="submit" className="auth-button">
            注册
          </button>
        </form>
        
        <div className="switch-mode">
          已有账号？ <Link to="/login">立即登录</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;