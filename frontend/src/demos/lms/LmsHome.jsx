import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, TrendingUp, Star, Clock, PlayCircle, CheckCircle, Search, Globe, Trophy } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { courses, categories, platformStats, instructors } from '../../data/lmsData';
import './lms.css';

const LmsHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const featuredCourses = courses.filter(c => c.featured).slice(0, 6);
  const popularCourses = courses.filter(c => c.bestseller).slice(0, 4);

  return (
    <div className="lms-page">
      {/* Navigation */}
      <nav className="lms-nav">
        <div className="lms-nav-container">
          <Link to="/demo/lms" className="lms-logo">
            <BookOpen className="h-8 w-8" />
            <span className="lms-logo-text">EduLearn</span>
          </Link>
          
          <div className="lms-nav-links">
            <Link to="/demo/lms" className="lms-nav-link active">Home</Link>
            <Link to="/demo/lms/courses" className="lms-nav-link">Courses</Link>
            <Link to="#instructors" className="lms-nav-link">Instructors</Link>
            <Link to="#about" className="lms-nav-link">About</Link>
          </div>

          <div className="lms-nav-actions">
            <Button variant="ghost" className="lms-nav-btn">Sign In</Button>
            <Button className="lms-nav-btn-primary">Sign Up</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="lms-hero">
        <div className="lms-hero-background">
          <div className="lms-hero-orb lms-orb-1"></div>
          <div className="lms-hero-orb lms-orb-2"></div>
          <div className="lms-hero-grid"></div>
        </div>
        
        <div className="lms-container">
          <div className="lms-hero-content">
            <div className="lms-hero-badge">
              <Trophy className="h-4 w-4" />
              <span>#1 Online Learning Platform in 2025</span>
            </div>
            
            <h1 className="lms-hero-title">
              Learn Without Limits
            </h1>
            
            <p className="lms-hero-subtitle">
              Master new skills with expert-led courses. Join 250,000+ students worldwide and transform your career with our comprehensive learning platform.
            </p>

            {/* Search Bar */}
            <div className="lms-search-container">
              <div className="lms-search-wrapper">
                <Search className="lms-search-icon" />
                <input 
                  type="text"
                  placeholder="What do you want to learn today?"
                  className="lms-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="lms-search-btn">
                  Search
                </Button>
              </div>
              <p className="lms-search-hint">
                Popular: Web Development, Data Science, UI/UX Design, Marketing
              </p>
            </div>

            {/* Stats */}
            <div className="lms-hero-stats">
              <div className="lms-stat-item">
                <Users className="lms-stat-icon" />
                <div>
                  <div className="lms-stat-value">{platformStats.totalStudents}</div>
                  <div className="lms-stat-label">Active Students</div>
                </div>
              </div>
              <div className="lms-stat-item">
                <BookOpen className="lms-stat-icon" />
                <div>
                  <div className="lms-stat-value">{platformStats.totalCourses}</div>
                  <div className="lms-stat-label">Expert Courses</div>
                </div>
              </div>
              <div className="lms-stat-item">
                <Award className="lms-stat-icon" />
                <div>
                  <div className="lms-stat-value">{platformStats.totalInstructors}</div>
                  <div className="lms-stat-label">Top Instructors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="lms-section">
        <div className="lms-container">
          <div className="lms-section-header">
            <div>
              <h2 className="lms-section-title">Explore Categories</h2>
              <p className="lms-section-subtitle">Find the perfect course for your goals</p>
            </div>
            <Link to="/demo/lms/courses">
              <Button variant="outline" className="lms-view-all-btn">
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="lms-categories-grid">
            {categories.map((category) => {
              const categoryIcon = category.icon === 'Code' ? BookOpen : 
                                   category.icon === 'Database' ? BookOpen :
                                   category.icon === 'Palette' ? BookOpen :
                                   category.icon === 'Briefcase' ? BookOpen :
                                   category.icon === 'TrendingUp' ? TrendingUp : Users;
              const Icon = categoryIcon;
              
              return (
                <Link 
                  key={category.id} 
                  to={`/demo/lms/courses?category=${category.id}`}
                  className="lms-category-card"
                  style={{ '--category-color': category.color }}
                >
                  <div className="lms-category-icon">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="lms-category-name">{category.name}</h3>
                  <p className="lms-category-courses">
                    {courses.filter(c => c.categoryId === category.id).length} courses
                  </p>
                  <div className="lms-category-arrow">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="lms-section lms-section-alt">
        <div className="lms-container">
          <div className="lms-section-header">
            <div>
              <h2 className="lms-section-title">Featured Courses</h2>
              <p className="lms-section-subtitle">Handpicked courses by our expert team</p>
            </div>
            <Link to="/demo/lms/courses">
              <Button variant="outline" className="lms-view-all-btn">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="lms-courses-grid">
            {featuredCourses.map((course) => (
              <Link 
                key={course.id} 
                to={`/demo/lms/course/${course.slug}`}
                className="lms-course-card"
                data-testid={`course-card-${course.id}`}
              >
                <div className="lms-course-image-wrapper">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="lms-course-image"
                    loading="lazy"
                  />
                  {course.bestseller && (
                    <div className="lms-course-badge">Bestseller</div>
                  )}
                  {course.new && (
                    <div className="lms-course-badge lms-badge-new">New</div>
                  )}
                </div>

                <div className="lms-course-content">
                  <div className="lms-course-meta">
                    <span className="lms-course-category">{course.category}</span>
                    <span className="lms-course-level">{course.level}</span>
                  </div>

                  <h3 className="lms-course-title">{course.title}</h3>
                  
                  <p className="lms-course-instructor">
                    <Users className="h-4 w-4" />
                    {course.instructor}
                  </p>

                  <div className="lms-course-stats">
                    <div className="lms-course-rating">
                      <Star className="lms-star-icon" fill="currentColor" />
                      <span className="lms-rating-value">{course.rating}</span>
                      <span className="lms-rating-count">({course.reviews})</span>
                    </div>
                    <div className="lms-course-students">
                      <Users className="h-4 w-4" />
                      {course.students.toLocaleString()}
                    </div>
                  </div>

                  <div className="lms-course-footer">
                    <div className="lms-course-duration">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="lms-course-price">
                      {course.discount > 0 && (
                        <span className="lms-price-original">${course.originalPrice}</span>
                      )}
                      <span className="lms-price-current">${course.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="lms-section">
        <div className="lms-container">
          <div className="lms-section-header-center">
            <h2 className="lms-section-title">Why Choose EduLearn?</h2>
            <p className="lms-section-subtitle">
              Everything you need to achieve your learning goals
            </p>
          </div>

          <div className="lms-features-grid">
            <Card className="lms-feature-card">
              <div className="lms-feature-icon">
                <PlayCircle className="h-8 w-8" />
              </div>
              <h3 className="lms-feature-title">Expert-Led Video Lessons</h3>
              <p className="lms-feature-desc">
                Learn from industry professionals with years of real-world experience. High-quality video content with lifetime access.
              </p>
            </Card>

            <Card className="lms-feature-card">
              <div className="lms-feature-icon">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="lms-feature-title">Learn Anywhere, Anytime</h3>
              <p className="lms-feature-desc">
                Access courses on mobile, tablet, or desktop. Download lessons and learn offline at your own pace.
              </p>
            </Card>

            <Card className="lms-feature-card">
              <div className="lms-feature-icon">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="lms-feature-title">Industry-Recognized Certificates</h3>
              <p className="lms-feature-desc">
                Earn certificates upon completion to showcase your skills to employers and boost your career.
              </p>
            </Card>

            <Card className="lms-feature-card">
              <div className="lms-feature-icon">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="lms-feature-title">Vibrant Learning Community</h3>
              <p className="lms-feature-desc">
                Join discussions, ask questions, and collaborate with fellow students from around the world.
              </p>
            </Card>

            <Card className="lms-feature-card">
              <div className="lms-feature-icon">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="lms-feature-title">Progress Tracking</h3>
              <p className="lms-feature-desc">
                Monitor your learning journey with detailed analytics and personalized recommendations.
              </p>
            </Card>

            <Card className="lms-feature-card">
              <div className="lms-feature-icon">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="lms-feature-title">30-Day Money-Back Guarantee</h3>
              <p className="lms-feature-desc">
                Not satisfied? Get a full refund within 30 days, no questions asked. Your success is our priority.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="lms-section lms-section-alt" id="instructors">
        <div className="lms-container">
          <div className="lms-section-header-center">
            <h2 className="lms-section-title">Learn from the Best</h2>
            <p className="lms-section-subtitle">
              World-class instructors with proven track records
            </p>
          </div>

          <div className="lms-instructors-grid">
            {instructors.map((instructor) => (
              <Card key={instructor.id} className="lms-instructor-card">
                <img 
                  src={instructor.image} 
                  alt={instructor.name}
                  className="lms-instructor-image"
                  loading="lazy"
                />
                <div className="lms-instructor-content">
                  <h3 className="lms-instructor-name">{instructor.name}</h3>
                  <p className="lms-instructor-title">{instructor.title}</p>
                  
                  <div className="lms-instructor-stats">
                    <div className="lms-instructor-stat">
                      <Users className="h-4 w-4" />
                      <span>{instructor.students.toLocaleString()} students</span>
                    </div>
                    <div className="lms-instructor-stat">
                      <BookOpen className="h-4 w-4" />
                      <span>{instructor.courses} courses</span>
                    </div>
                    <div className="lms-instructor-stat">
                      <Star className="h-4 w-4" fill="currentColor" />
                      <span>{instructor.rating} rating</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="lms-cta-section">
        <div className="lms-cta-background">
          <div className="lms-cta-orb lms-cta-orb-1"></div>
          <div className="lms-cta-orb lms-cta-orb-2"></div>
        </div>
        <div className="lms-container">
          <div className="lms-cta-content">
            <Award className="lms-cta-icon" />
            <h2 className="lms-cta-title">Start Your Learning Journey Today</h2>
            <p className="lms-cta-subtitle">
              Join 250,000+ students already learning on EduLearn. Access 500+ courses and transform your career.
            </p>
            <div className="lms-cta-buttons">
              <Link to="/demo/lms/courses">
                <Button className="lms-cta-btn-primary">
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" className="lms-cta-btn-secondary">
                Become an Instructor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lms-footer">
        <div className="lms-container">
          <div className="lms-footer-content">
            <div className="lms-footer-col">
              <div className="lms-footer-logo">
                <BookOpen className="h-8 w-8" />
                <span className="lms-footer-logo-text">EduLearn</span>
              </div>
              <p className="lms-footer-desc">
                Empowering learners worldwide with quality education and expert-led courses.
              </p>
            </div>

            <div className="lms-footer-col">
              <h4 className="lms-footer-heading">Platform</h4>
              <ul className="lms-footer-links">
                <li><a href="#">Browse Courses</a></li>
                <li><a href="#">Become an Instructor</a></li>
                <li><a href="#">Student Dashboard</a></li>
                <li><a href="#">Certificates</a></li>
              </ul>
            </div>

            <div className="lms-footer-col">
              <h4 className="lms-footer-heading">Support</h4>
              <ul className="lms-footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Refund Policy</a></li>
              </ul>
            </div>

            <div className="lms-footer-col">
              <h4 className="lms-footer-heading">Company</h4>
              <ul className="lms-footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="lms-footer-bottom">
            <p>&copy; 2025 EduLearn. All rights reserved.</p>
            <div className="lms-footer-back">
              <Link to="/portfolio/educational-lms-platform" className="lms-back-link">
                <ArrowRight className="h-4 w-4 rotate-180" />
                Back to Portfolio
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LmsHome;