import React, { useState } from 'react';
import { Calendar, TrendingUp, Users, MessageSquare, Image, Send, BarChart3, Clock, Check, X, Eye, Heart, Share2, Edit, Trash2, Plus } from 'lucide-react';
import './social-media.css';

const SocialMediaHome = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [posts, setPosts] = useState([
    {
      id: 1,
      platform: 'Twitter',
      content: 'Excited to announce our new product launch! 🚀 #Innovation #TechNews',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
      scheduledTime: '2024-12-25 10:00 AM',
      status: 'scheduled',
      engagement: { views: 0, likes: 0, shares: 0 }
    },
    {
      id: 2,
      platform: 'Instagram',
      content: 'Behind the scenes of our creative process 📸 #BTS #CreativeWork',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
      scheduledTime: '2024-12-25 02:00 PM',
      status: 'published',
      engagement: { views: 3420, likes: 245, shares: 32 }
    },
    {
      id: 3,
      platform: 'LinkedIn',
      content: 'Team collaboration drives innovation. Check out our latest insights on workplace productivity.',
      scheduledTime: '2024-12-24 09:00 AM',
      status: 'published',
      engagement: { views: 1850, likes: 127, shares: 18 }
    }
  ]);

  const [newPost, setNewPost] = useState({
    platform: 'Twitter',
    content: '',
    scheduledTime: '',
    image: ''
  });

  const stats = [
    { label: 'Total Reach', value: '125.4K', change: '+12.5%', icon: Eye, color: '#8B5CF6' },
    { label: 'Engagement Rate', value: '8.2%', change: '+2.3%', icon: Heart, color: '#EC4899' },
    { label: 'Posts Published', value: '48', change: '+8', icon: MessageSquare, color: '#10B981' },
    { label: 'Scheduled Posts', value: '12', change: '+4', icon: Clock, color: '#F59E0B' }
  ];

  const analytics = [
    { platform: 'Twitter', followers: '24.5K', engagement: '6.8%', posts: 18, color: '#1DA1F2' },
    { platform: 'Instagram', followers: '45.2K', engagement: '9.2%', posts: 22, color: '#E4405F' },
    { platform: 'LinkedIn', followers: '12.8K', engagement: '5.4%', posts: 8, color: '#0077B5' },
    { platform: 'Facebook', followers: '32.1K', engagement: '4.9%', posts: 15, color: '#1877F2' }
  ];

  const handleCreatePost = () => {
    if (newPost.content && newPost.scheduledTime) {
      const post = {
        id: posts.length + 1,
        ...newPost,
        status: 'scheduled',
        engagement: { views: 0, likes: 0, shares: 0 }
      };
      setPosts([post, ...posts]);
      setNewPost({ platform: 'Twitter', content: '', scheduledTime: '', image: '' });
      setActiveTab('calendar');
    }
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="social-media-container">
      {/* Header */}
      <header className="smm-header">
        <div className="smm-header-content">
          <div>
            <h1 className="smm-title">Social Media Management</h1>
            <p className="smm-subtitle">Manage all your social media in one place</p>
          </div>
          <button className="smm-btn-primary" onClick={() => setActiveTab('compose')}>
            <Plus className="h-5 w-5" />
            Create Post
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="smm-tabs">
        <button 
          className={`smm-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <BarChart3 className="h-5 w-5" />
          Dashboard
        </button>
        <button 
          className={`smm-tab ${activeTab === 'compose' ? 'active' : ''}`}
          onClick={() => setActiveTab('compose')}
        >
          <Edit className="h-5 w-5" />
          Compose
        </button>
        <button 
          className={`smm-tab ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          <Calendar className="h-5 w-5" />
          Calendar
        </button>
        <button 
          className={`smm-tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <TrendingUp className="h-5 w-5" />
          Analytics
        </button>
      </nav>

      <div className="smm-content">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="smm-dashboard">
            {/* Stats Cards */}
            <div className="smm-stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="smm-stat-card">
                  <div className="smm-stat-header">
                    <div className="smm-stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <span className="smm-stat-change positive">{stat.change}</span>
                  </div>
                  <h3 className="smm-stat-value">{stat.value}</h3>
                  <p className="smm-stat-label">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="smm-section">
              <h2 className="smm-section-title">Recent Activity</h2>
              <div className="smm-activity-list">
                {posts.slice(0, 3).map(post => (
                  <div key={post.id} className="smm-activity-item">
                    <div className="smm-activity-icon" style={{ 
                      background: post.platform === 'Twitter' ? '#1DA1F220' : 
                                  post.platform === 'Instagram' ? '#E4405F20' : '#0077B520',
                      color: post.platform === 'Twitter' ? '#1DA1F2' : 
                             post.platform === 'Instagram' ? '#E4405F' : '#0077B5'
                    }}>
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div className="smm-activity-content">
                      <p className="smm-activity-text">{post.content.substring(0, 80)}...</p>
                      <div className="smm-activity-meta">
                        <span className="smm-platform-badge" style={{
                          background: post.platform === 'Twitter' ? '#1DA1F2' : 
                                      post.platform === 'Instagram' ? '#E4405F' : '#0077B5'
                        }}>{post.platform}</span>
                        <span className="smm-activity-time">{post.scheduledTime}</span>
                        <span className={`smm-status-badge ${post.status}`}>
                          {post.status === 'published' ? <Check className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                          {post.status}
                        </span>
                      </div>
                    </div>
                    <div className="smm-activity-stats">
                      <div className="smm-stat-item">
                        <Eye className="h-4 w-4" />
                        {post.engagement.views.toLocaleString()}
                      </div>
                      <div className="smm-stat-item">
                        <Heart className="h-4 w-4" />
                        {post.engagement.likes}
                      </div>
                      <div className="smm-stat-item">
                        <Share2 className="h-4 w-4" />
                        {post.engagement.shares}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Compose Tab */}
        {activeTab === 'compose' && (
          <div className="smm-compose">
            <div className="smm-compose-card">
              <h2 className="smm-section-title">Create New Post</h2>
              
              <div className="smm-form-group">
                <label className="smm-label">Select Platform</label>
                <div className="smm-platform-selector">
                  {['Twitter', 'Instagram', 'LinkedIn', 'Facebook'].map(platform => (
                    <button
                      key={platform}
                      className={`smm-platform-btn ${newPost.platform === platform ? 'active' : ''}`}
                      onClick={() => setNewPost({...newPost, platform})}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              <div className="smm-form-group">
                <label className="smm-label">Content</label>
                <textarea
                  className="smm-textarea"
                  placeholder="What's on your mind?"
                  rows="6"
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                />
                <span className="smm-char-count">{newPost.content.length} / 280</span>
              </div>

              <div className="smm-form-group">
                <label className="smm-label">Schedule Time</label>
                <input
                  type="datetime-local"
                  className="smm-input"
                  value={newPost.scheduledTime}
                  onChange={(e) => setNewPost({...newPost, scheduledTime: e.target.value})}
                />
              </div>

              <div className="smm-form-group">
                <label className="smm-label">Image URL (Optional)</label>
                <input
                  type="text"
                  className="smm-input"
                  placeholder="https://example.com/image.jpg"
                  value={newPost.image}
                  onChange={(e) => setNewPost({...newPost, image: e.target.value})}
                />
              </div>

              <div className="smm-form-actions">
                <button className="smm-btn-secondary">
                  <Image className="h-5 w-5" />
                  Add Media
                </button>
                <button className="smm-btn-primary" onClick={handleCreatePost}>
                  <Send className="h-5 w-5" />
                  Schedule Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="smm-calendar">
            <h2 className="smm-section-title">Scheduled Posts</h2>
            <div className="smm-posts-list">
              {posts.map(post => (
                <div key={post.id} className="smm-post-card">
                  <div className="smm-post-header">
                    <span className="smm-platform-badge" style={{
                      background: post.platform === 'Twitter' ? '#1DA1F2' : 
                                  post.platform === 'Instagram' ? '#E4405F' : 
                                  post.platform === 'LinkedIn' ? '#0077B5' : '#1877F2'
                    }}>
                      {post.platform}
                    </span>
                    <span className={`smm-status-badge ${post.status}`}>
                      {post.status === 'published' ? <Check className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      {post.status}
                    </span>
                  </div>
                  {post.image && (
                    <img src={post.image} alt="Post" className="smm-post-image" />
                  )}
                  <p className="smm-post-content">{post.content}</p>
                  <div className="smm-post-footer">
                    <div className="smm-post-time">
                      <Clock className="h-4 w-4" />
                      {post.scheduledTime}
                    </div>
                    <div className="smm-post-actions">
                      <button className="smm-icon-btn">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="smm-icon-btn" onClick={() => handleDeletePost(post.id)}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {post.status === 'published' && (
                    <div className="smm-post-engagement">
                      <div className="smm-engagement-item">
                        <Eye className="h-4 w-4" />
                        <span>{post.engagement.views.toLocaleString()} views</span>
                      </div>
                      <div className="smm-engagement-item">
                        <Heart className="h-4 w-4" />
                        <span>{post.engagement.likes} likes</span>
                      </div>
                      <div className="smm-engagement-item">
                        <Share2 className="h-4 w-4" />
                        <span>{post.engagement.shares} shares</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="smm-analytics">
            <h2 className="smm-section-title">Platform Performance</h2>
            <div className="smm-analytics-grid">
              {analytics.map((platform, index) => (
                <div key={index} className="smm-analytics-card">
                  <div className="smm-analytics-header">
                    <h3 className="smm-analytics-platform">{platform.platform}</h3>
                    <div className="smm-analytics-badge" style={{ background: platform.color }}>
                      <TrendingUp className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="smm-analytics-stats">
                    <div className="smm-analytics-stat">
                      <Users className="h-5 w-5" style={{ color: platform.color }} />
                      <div>
                        <p className="smm-analytics-value">{platform.followers}</p>
                        <p className="smm-analytics-label">Followers</p>
                      </div>
                    </div>
                    <div className="smm-analytics-stat">
                      <Heart className="h-5 w-5" style={{ color: platform.color }} />
                      <div>
                        <p className="smm-analytics-value">{platform.engagement}</p>
                        <p className="smm-analytics-label">Engagement</p>
                      </div>
                    </div>
                    <div className="smm-analytics-stat">
                      <MessageSquare className="h-5 w-5" style={{ color: platform.color }} />
                      <div>
                        <p className="smm-analytics-value">{platform.posts}</p>
                        <p className="smm-analytics-label">Posts</p>
                      </div>
                    </div>
                  </div>
                  <div className="smm-analytics-progress">
                    <div className="smm-progress-bar">
                      <div 
                        className="smm-progress-fill" 
                        style={{ 
                          width: `${parseFloat(platform.engagement) * 10}%`,
                          background: platform.color 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaHome;
