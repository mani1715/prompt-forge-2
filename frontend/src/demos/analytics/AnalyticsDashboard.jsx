import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Users, ShoppingCart, DollarSign, Eye, MousePointer, BarChart3, PieChart, RefreshCw, Download } from 'lucide-react';
import './analytics.css';

const AnalyticsDashboard = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [liveData, setLiveData] = useState({
    activeUsers: 1247,
    pageViews: 8542,
    bounceRate: 42.3,
    avgSessionTime: '3:45'
  });

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20 - 10),
        pageViews: prev.pageViews + Math.floor(Math.random() * 50 - 20),
        bounceRate: Math.max(30, Math.min(60, prev.bounceRate + (Math.random() * 2 - 1))),
        avgSessionTime: prev.avgSessionTime
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      label: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    },
    {
      label: 'Active Users',
      value: liveData.activeUsers.toLocaleString(),
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      live: true
    },
    {
      label: 'Page Views',
      value: liveData.pageViews.toLocaleString(),
      change: '+8.2%',
      trend: 'up',
      icon: Eye,
      color: '#3B82F6',
      bgColor: 'rgba(59, 130, 246, 0.1)',
      live: true
    },
    {
      label: 'Conversion Rate',
      value: '3.24%',
      change: '-0.4%',
      trend: 'down',
      icon: ShoppingCart,
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.1)'
    },
    {
      label: 'Bounce Rate',
      value: `${liveData.bounceRate.toFixed(1)}%`,
      change: '-2.1%',
      trend: 'up',
      icon: Activity,
      color: '#EC4899',
      bgColor: 'rgba(236, 72, 153, 0.1)',
      live: true
    },
    {
      label: 'Avg Session Time',
      value: liveData.avgSessionTime,
      change: '+0:32',
      trend: 'up',
      icon: MousePointer,
      color: '#06B6D4',
      bgColor: 'rgba(6, 182, 212, 0.1)'
    }
  ];

  const trafficSources = [
    { source: 'Organic Search', visitors: 45230, percentage: 42, color: '#8B5CF6' },
    { source: 'Direct', visitors: 28450, percentage: 26, color: '#3B82F6' },
    { source: 'Social Media', visitors: 19870, percentage: 18, color: '#EC4899' },
    { source: 'Email', visitors: 10250, percentage: 9, color: '#10B981' },
    { source: 'Referral', visitors: 5420, percentage: 5, color: '#F59E0B' }
  ];

  const topPages = [
    { page: '/products/new-arrivals', views: 12543, uniqueViews: 8234, avgTime: '4:23', bounceRate: '32%' },
    { page: '/blog/tech-trends-2024', views: 9876, uniqueViews: 7123, avgTime: '6:45', bounceRate: '28%' },
    { page: '/services/consulting', views: 7654, uniqueViews: 5432, avgTime: '3:12', bounceRate: '45%' },
    { page: '/pricing', views: 6543, uniqueViews: 4987, avgTime: '2:34', bounceRate: '51%' },
    { page: '/about-us', views: 5432, uniqueViews: 3876, avgTime: '2:18', bounceRate: '38%' }
  ];

  const realtimeActivity = [
    { time: 'Just now', action: 'New user signed up', location: 'San Francisco, US', icon: Users },
    { time: '2 min ago', action: 'Purchase completed: $249', location: 'London, UK', icon: ShoppingCart },
    { time: '5 min ago', action: 'Page view: /products', location: 'Tokyo, JP', icon: Eye },
    { time: '8 min ago', action: 'Form submitted', location: 'Berlin, DE', icon: MousePointer },
    { time: '12 min ago', action: 'New user signed up', location: 'Sydney, AU', icon: Users }
  ];

  const deviceBreakdown = [
    { device: 'Desktop', percentage: 58, color: '#8B5CF6' },
    { device: 'Mobile', percentage: 35, color: '#3B82F6' },
    { device: 'Tablet', percentage: 7, color: '#EC4899' }
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div className="analytics-container">
      {/* Header */}
      <header className="analytics-header">
        <div className="analytics-header-content">
          <div>
            <h1 className="analytics-title">Real-Time Analytics Dashboard</h1>
            <p className="analytics-subtitle">Monitor your business metrics in real-time</p>
          </div>
          <div className="analytics-header-actions">
            <button className="analytics-btn-secondary" onClick={handleRefresh}>
              <RefreshCw className={`h-5 w-5 ${refreshing ? 'spinning' : ''}`} />
              Refresh
            </button>
            <button className="analytics-btn-primary">
              <Download className="h-5 w-5" />
              Export Report
            </button>
          </div>
        </div>
      </header>

      <div className="analytics-content">
        {/* Key Metrics Grid */}
        <div className="analytics-metrics-grid">
          {metrics.map((metric, index) => (
            <div key={index} className="analytics-metric-card">
              <div className="analytics-metric-header">
                <div className="analytics-metric-icon" style={{ background: metric.bgColor, color: metric.color }}>
                  <metric.icon className="h-6 w-6" />
                </div>
                {metric.live && (
                  <span className="analytics-live-badge">
                    <span className="analytics-live-dot"></span>
                    LIVE
                  </span>
                )}
              </div>
              <h3 className="analytics-metric-value">{metric.value}</h3>
              <p className="analytics-metric-label">{metric.label}</p>
              <div className="analytics-metric-footer">
                <span className={`analytics-metric-change ${metric.trend}`}>
                  {metric.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {metric.change}
                </span>
                <span className="analytics-metric-period">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="analytics-two-column">
          {/* Traffic Sources */}
          <div className="analytics-card">
            <div className="analytics-card-header">
              <h2 className="analytics-card-title">Traffic Sources</h2>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="analytics-traffic-list">
              {trafficSources.map((source, index) => (
                <div key={index} className="analytics-traffic-item">
                  <div className="analytics-traffic-info">
                    <div className="analytics-traffic-dot" style={{ background: source.color }}></div>
                    <span className="analytics-traffic-source">{source.source}</span>
                  </div>
                  <div className="analytics-traffic-stats">
                    <span className="analytics-traffic-visitors">{source.visitors.toLocaleString()}</span>
                    <span className="analytics-traffic-percentage">{source.percentage}%</span>
                  </div>
                  <div className="analytics-progress-bar">
                    <div 
                      className="analytics-progress-fill" 
                      style={{ width: `${source.percentage}%`, background: source.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Activity */}
          <div className="analytics-card">
            <div className="analytics-card-header">
              <h2 className="analytics-card-title">Real-time Activity</h2>
              <span className="analytics-live-badge">
                <span className="analytics-live-dot"></span>
                LIVE
              </span>
            </div>
            <div className="analytics-activity-list">
              {realtimeActivity.map((activity, index) => (
                <div key={index} className="analytics-activity-item">
                  <div className="analytics-activity-icon">
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="analytics-activity-content">
                    <p className="analytics-activity-action">{activity.action}</p>
                    <p className="analytics-activity-meta">
                      <span>{activity.location}</span>
                      <span className="analytics-activity-dot">•</span>
                      <span>{activity.time}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Pages Table */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <h2 className="analytics-card-title">Top Performing Pages</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="analytics-table-container">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Total Views</th>
                  <th>Unique Views</th>
                  <th>Avg Time</th>
                  <th>Bounce Rate</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page, index) => (
                  <tr key={index}>
                    <td className="analytics-table-page">{page.page}</td>
                    <td>{page.views.toLocaleString()}</td>
                    <td>{page.uniqueViews.toLocaleString()}</td>
                    <td>{page.avgTime}</td>
                    <td>
                      <span className={`analytics-bounce-badge ${parseInt(page.bounceRate) > 40 ? 'high' : 'low'}`}>
                        {page.bounceRate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <h2 className="analytics-card-title">Device Breakdown</h2>
          </div>
          <div className="analytics-device-grid">
            {deviceBreakdown.map((device, index) => (
              <div key={index} className="analytics-device-item">
                <div className="analytics-device-header">
                  <span className="analytics-device-name">{device.device}</span>
                  <span className="analytics-device-percentage" style={{ color: device.color }}>
                    {device.percentage}%
                  </span>
                </div>
                <div className="analytics-device-bar">
                  <div 
                    className="analytics-device-fill" 
                    style={{ width: `${device.percentage}%`, background: device.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
