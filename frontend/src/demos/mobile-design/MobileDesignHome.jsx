import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Smartphone, Palette, Type, Layout, Zap, Grid3x3, Eye, Code, Download, Moon, Sun, Heart, ShoppingCart, Bell, Search, User, Home, Settings, Plus, Check, X, Star } from 'lucide-react';
import './mobile-design.css';

const MobileDesignHome = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedScreen, setSelectedScreen] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Design System Data
  const colorPalette = {
    primary: [
      { name: 'Primary 50', color: '#f0f9ff', hex: '#f0f9ff' },
      { name: 'Primary 100', color: '#e0f2fe', hex: '#e0f2fe' },
      { name: 'Primary 500', color: '#0ea5e9', hex: '#0ea5e9' },
      { name: 'Primary 600', color: '#0284c7', hex: '#0284c7' },
      { name: 'Primary 700', color: '#0369a1', hex: '#0369a1' },
    ],
    secondary: [
      { name: 'Secondary 50', color: '#faf5ff', hex: '#faf5ff' },
      { name: 'Secondary 100', color: '#f3e8ff', hex: '#f3e8ff' },
      { name: 'Secondary 500', color: '#a855f7', hex: '#a855f7' },
      { name: 'Secondary 600', color: '#9333ea', hex: '#9333ea' },
      { name: 'Secondary 700', color: '#7e22ce', hex: '#7e22ce' },
    ],
    neutral: [
      { name: 'Gray 50', color: '#f9fafb', hex: '#f9fafb' },
      { name: 'Gray 100', color: '#f3f4f6', hex: '#f3f4f6' },
      { name: 'Gray 500', color: '#6b7280', hex: '#6b7280' },
      { name: 'Gray 700', color: '#374151', hex: '#374151' },
      { name: 'Gray 900', color: '#111827', hex: '#111827' },
    ]
  };

  const typography = [
    { name: 'Display', size: '48px', weight: '700', sample: 'The quick brown fox' },
    { name: 'Heading 1', size: '32px', weight: '700', sample: 'The quick brown fox' },
    { name: 'Heading 2', size: '24px', weight: '600', sample: 'The quick brown fox' },
    { name: 'Body Large', size: '18px', weight: '400', sample: 'The quick brown fox jumps over the lazy dog' },
    { name: 'Body', size: '16px', weight: '400', sample: 'The quick brown fox jumps over the lazy dog' },
    { name: 'Caption', size: '14px', weight: '400', sample: 'The quick brown fox jumps over the lazy dog' },
  ];

  const appScreens = [
    { name: 'Home Screen', category: 'Main', gradient: 'from-blue-500 to-purple-600' },
    { name: 'Profile', category: 'User', gradient: 'from-purple-500 to-pink-600' },
    { name: 'Activity Feed', category: 'Social', gradient: 'from-green-500 to-teal-600' },
    { name: 'Settings', category: 'System', gradient: 'from-orange-500 to-red-600' },
  ];

  const components = [
    { name: 'Buttons', count: 12, icon: 'Zap' },
    { name: 'Cards', count: 8, icon: 'Layout' },
    { name: 'Forms', count: 15, icon: 'Type' },
    { name: 'Navigation', count: 6, icon: 'Grid3x3' },
    { name: 'Icons', count: 120, icon: 'Palette' },
    { name: 'Modals', count: 5, icon: 'Eye' },
  ];

  return (
    <div className="mobile-design-container">
      {/* Navigation Bar */}
      <nav className="mobile-design-nav">
        <div className="nav-content">
          <div className="nav-left">
            <Link to="/portfolio/mobile-app-design-system" className="back-link">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Case Study</span>
            </Link>
          </div>
          <div className="nav-center">
            <Smartphone className="h-6 w-6 text-blue-600" />
            <h1 className="nav-title">FitLife Design System</h1>
          </div>
          <div className="nav-right">
            <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="design-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Palette className="h-4 w-4" />
            <span>Mobile Design System</span>
          </div>
          <h1 className="hero-title">FitLife Fitness App</h1>
          <p className="hero-description">
            A comprehensive design system built for a mobile fitness application with consistent branding,
            accessible components, and beautiful user interfaces.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">120+</div>
              <div className="stat-label">Components</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">24</div>
              <div className="stat-label">Screens</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">100%</div>
              <div className="stat-label">Accessible</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="tabs-container">
        <div className="tabs-nav">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Eye className="h-4 w-4" />
            Overview
          </button>
          <button
            className={`tab-button ${activeTab === 'colors' ? 'active' : ''}`}
            onClick={() => setActiveTab('colors')}
          >
            <Palette className="h-4 w-4" />
            Colors
          </button>
          <button
            className={`tab-button ${activeTab === 'typography' ? 'active' : ''}`}
            onClick={() => setActiveTab('typography')}
          >
            <Type className="h-4 w-4" />
            Typography
          </button>
          <button
            className={`tab-button ${activeTab === 'components' ? 'active' : ''}`}
            onClick={() => setActiveTab('components')}
          >
            <Layout className="h-4 w-4" />
            Components
          </button>
          <button
            className={`tab-button ${activeTab === 'screens' ? 'active' : ''}`}
            onClick={() => setActiveTab('screens')}
          >
            <Smartphone className="h-4 w-4" />
            Screens
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="design-content">
        <div className="content-wrapper">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-content">
              <h2 className="section-title">Design System Overview</h2>
              <p className="section-description">
                FitLife's design system provides a unified visual language and component library that ensures
                consistency across all mobile app screens. Built with React Native and TypeScript for maximum
                type safety and developer experience.
              </p>

              <div className="features-grid">
                {components.map((comp, idx) => (
                  <div key={idx} className="feature-card">
                    <div className="feature-icon">
                      <Layout className="h-6 w-6" />
                    </div>
                    <h3 className="feature-name">{comp.name}</h3>
                    <p className="feature-count">{comp.count} variants</p>
                  </div>
                ))}
              </div>

              <div className="principles-section">
                <h3 className="subsection-title">Design Principles</h3>
                <div className="principles-grid">
                  <div className="principle-card">
                    <Zap className="principle-icon" />
                    <h4>Performance First</h4>
                    <p>Optimized components for smooth 60fps animations on all devices.</p>
                  </div>
                  <div className="principle-card">
                    <Eye className="principle-icon" />
                    <h4>Accessibility</h4>
                    <p>WCAG 2.1 AA compliant with screen reader support and keyboard navigation.</p>
                  </div>
                  <div className="principle-card">
                    <Grid3x3 className="principle-icon" />
                    <h4>Consistency</h4>
                    <p>Uniform spacing, sizing, and behavior across all components.</p>
                  </div>
                  <div className="principle-card">
                    <Code className="principle-icon" />
                    <h4>Developer Experience</h4>
                    <p>Well-documented components with TypeScript support and Storybook integration.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Colors Tab */}
          {activeTab === 'colors' && (
            <div className="tab-content">
              <h2 className="section-title">Color Palette</h2>
              <p className="section-description">
                Our color system is designed for maximum contrast and accessibility while maintaining a modern,
                vibrant aesthetic that motivates users on their fitness journey.
              </p>

              <div className="color-section">
                <h3 className="subsection-title">Primary Colors</h3>
                <div className="color-grid">
                  {colorPalette.primary.map((color, idx) => (
                    <div key={idx} className="color-card">
                      <div className="color-swatch" style={{ backgroundColor: color.color }}></div>
                      <div className="color-info">
                        <div className="color-name">{color.name}</div>
                        <div className="color-hex">{color.hex}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="color-section">
                <h3 className="subsection-title">Secondary Colors</h3>
                <div className="color-grid">
                  {colorPalette.secondary.map((color, idx) => (
                    <div key={idx} className="color-card">
                      <div className="color-swatch" style={{ backgroundColor: color.color }}></div>
                      <div className="color-info">
                        <div className="color-name">{color.name}</div>
                        <div className="color-hex">{color.hex}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="color-section">
                <h3 className="subsection-title">Neutral Colors</h3>
                <div className="color-grid">
                  {colorPalette.neutral.map((color, idx) => (
                    <div key={idx} className="color-card">
                      <div className="color-swatch" style={{ backgroundColor: color.color }}></div>
                      <div className="color-info">
                        <div className="color-name">{color.name}</div>
                        <div className="color-hex">{color.hex}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Typography Tab */}
          {activeTab === 'typography' && (
            <div className="tab-content">
              <h2 className="section-title">Typography System</h2>
              <p className="section-description">
                Our typography scale is based on a modular scale with carefully selected font sizes and weights
                to create clear visual hierarchy and optimal readability on mobile devices.
              </p>

              <div className="typography-section">
                <h3 className="subsection-title">Font Family</h3>
                <div className="font-family-card">
                  <div className="font-sample" style={{ fontSize: '48px', fontWeight: '700' }}>Aa</div>
                  <div className="font-info">
                    <h4>Inter</h4>
                    <p>Primary font family for all text content</p>
                    <div className="font-weights">
                      <span>Regular (400)</span>
                      <span>Medium (500)</span>
                      <span>Semibold (600)</span>
                      <span>Bold (700)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="typography-section">
                <h3 className="subsection-title">Type Scale</h3>
                <div className="type-scale-list">
                  {typography.map((type, idx) => (
                    <div key={idx} className="type-scale-item">
                      <div className="type-meta">
                        <div className="type-name">{type.name}</div>
                        <div className="type-specs">{type.size} / {type.weight}</div>
                      </div>
                      <div className="type-sample" style={{ fontSize: type.size, fontWeight: type.weight }}>
                        {type.sample}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Components Tab */}
          {activeTab === 'components' && (
            <div className="tab-content">
              <h2 className="section-title">Component Library</h2>
              <p className="section-description">
                A comprehensive collection of reusable, accessible components built with React Native and
                documented in Storybook.
              </p>

              <div className="components-showcase">
                <h3 className="subsection-title">Buttons</h3>
                <div className="component-demo">
                  <button className="btn btn-primary">Primary Button</button>
                  <button className="btn btn-secondary">Secondary Button</button>
                  <button className="btn btn-outline">Outline Button</button>
                  <button className="btn btn-ghost">Ghost Button</button>
                </div>
              </div>

              <div className="components-showcase">
                <h3 className="subsection-title">Cards</h3>
                <div className="cards-demo">
                  <div className="demo-card">
                    <div className="card-header">
                      <div className="card-icon">
                        <Zap className="h-6 w-6" />
                      </div>
                      <h4>Workout Card</h4>
                    </div>
                    <p className="card-description">Display workout information with progress tracking</p>
                    <div className="card-footer">
                      <span className="card-badge">Component</span>
                    </div>
                  </div>

                  <div className="demo-card">
                    <div className="card-header">
                      <div className="card-icon">
                        <Heart className="h-6 w-6" />
                      </div>
                      <h4>Activity Card</h4>
                    </div>
                    <p className="card-description">Show daily activity summary with metrics</p>
                    <div className="card-footer">
                      <span className="card-badge">Component</span>
                    </div>
                  </div>

                  <div className="demo-card">
                    <div className="card-header">
                      <div className="card-icon">
                        <Star className="h-6 w-6" />
                      </div>
                      <h4>Achievement Card</h4>
                    </div>
                    <p className="card-description">Display earned achievements and badges</p>
                    <div className="card-footer">
                      <span className="card-badge">Component</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="components-showcase">
                <h3 className="subsection-title">Form Elements</h3>
                <div className="form-demo">
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" placeholder="Enter your email" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-input" placeholder="Enter your password" />
                  </div>
                  <button className="btn btn-primary btn-block">Sign In</button>
                </div>
              </div>

              <div className="components-showcase">
                <h3 className="subsection-title">Icons</h3>
                <div className="icons-demo">
                  <div className="icon-item"><Home className="h-6 w-6" /></div>
                  <div className="icon-item"><Search className="h-6 w-6" /></div>
                  <div className="icon-item"><Bell className="h-6 w-6" /></div>
                  <div className="icon-item"><User className="h-6 w-6" /></div>
                  <div className="icon-item"><Settings className="h-6 w-6" /></div>
                  <div className="icon-item"><Heart className="h-6 w-6" /></div>
                  <div className="icon-item"><ShoppingCart className="h-6 w-6" /></div>
                  <div className="icon-item"><Plus className="h-6 w-6" /></div>
                  <div className="icon-item"><Check className="h-6 w-6" /></div>
                  <div className="icon-item"><X className="h-6 w-6" /></div>
                  <div className="icon-item"><Star className="h-6 w-6" /></div>
                  <div className="icon-item"><Zap className="h-6 w-6" /></div>
                </div>
              </div>
            </div>
          )}

          {/* Screens Tab */}
          {activeTab === 'screens' && (
            <div className="tab-content">
              <h2 className="section-title">App Screens</h2>
              <p className="section-description">
                Explore the complete mobile app interface with 24 carefully designed screens covering all user
                flows from onboarding to workout tracking.
              </p>

              <div className="screens-grid">
                {appScreens.map((screen, idx) => (
                  <div
                    key={idx}
                    className={`screen-card ${selectedScreen === idx ? 'active' : ''}`}
                    onClick={() => setSelectedScreen(idx)}
                  >
                    <div className={`screen-preview bg-gradient-to-br ${screen.gradient}`}>
                      <div className="screen-mockup">
                        <div className="mockup-header">
                          <div className="mockup-time">9:41</div>
                          <div className="mockup-indicators">
                            <div className="indicator"></div>
                            <div className="indicator"></div>
                            <div className="indicator"></div>
                          </div>
                        </div>
                        <div className="mockup-content">
                          <Smartphone className="h-16 w-16 text-white opacity-50" />
                        </div>
                      </div>
                    </div>
                    <div className="screen-info">
                      <div className="screen-category">{screen.category}</div>
                      <div className="screen-name">{screen.name}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="screen-categories">
                <h3 className="subsection-title">Screen Categories</h3>
                <div className="categories-list">
                  <div className="category-item">
                    <div className="category-count">6</div>
                    <div className="category-name">Onboarding</div>
                  </div>
                  <div className="category-item">
                    <div className="category-count">8</div>
                    <div className="category-name">Workout Tracking</div>
                  </div>
                  <div className="category-item">
                    <div className="category-count">4</div>
                    <div className="category-name">Progress & Stats</div>
                  </div>
                  <div className="category-item">
                    <div className="category-count">4</div>
                    <div className="category-name">Social & Community</div>
                  </div>
                  <div className="category-item">
                    <div className="category-count">2</div>
                    <div className="category-name">Settings & Profile</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Download Section */}
      <section className="download-section">
        <div className="download-content">
          <Download className="download-icon" />
          <h2 className="download-title">Download Design Assets</h2>
          <p className="download-description">
            Get access to the complete Figma file with all components, screens, and design tokens.
          </p>
          <button className="btn btn-primary btn-large">
            <Download className="h-5 w-5" />
            Download Figma File
          </button>
        </div>
      </section>
    </div>
  );
};

export default MobileDesignHome;
