import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, Users, Star, Clock, PlayCircle, CheckCircle, ChevronDown, ChevronUp, Award, Globe, Download, MessageCircle, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { courses } from '../../data/lmsData';
import './lms.css';

const LmsCourseDetail = () => {
  const { slug } = useParams();
  const course = courses.find(c => c.slug === slug);
  const [expandedSection, setExpandedSection] = useState(0);

  if (!course) {
    return (
      <div className="lms-page">
        <div className="lms-container">
          <div className="lms-not-found">
            <h1>Course Not Found</h1>
            <Link to="/demo/lms/courses">
              <Button>Back to Courses</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedCourses = courses
    .filter(c => c.categoryId === course.categoryId && c.id !== course.id)
    .slice(0, 3);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? -1 : index);
  };

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
            <Link to="/demo/lms" className="lms-nav-link">Home</Link>
            <Link to="/demo/lms/courses" className="lms-nav-link">Courses</Link>
            <Link to="#" className="lms-nav-link">Instructors</Link>
            <Link to="#" className="lms-nav-link">About</Link>
          </div>

          <div className="lms-nav-actions">
            <Button variant="ghost" className="lms-nav-btn">Sign In</Button>
            <Button className="lms-nav-btn-primary">Sign Up</Button>
          </div>
        </div>
      </nav>

      {/* Course Hero */}
      <div className="lms-course-hero">
        <div className="lms-course-hero-bg">
          <div className="lms-course-hero-overlay"></div>
        </div>
        
        <div className="lms-container">
          <div className="lms-course-hero-grid">
            <div className="lms-course-hero-content">
              <div className="lms-breadcrumb">
                <Link to="/demo/lms">Home</Link>
                <span>/</span>
                <Link to="/demo/lms/courses">Courses</Link>
                <span>/</span>
                <span>{course.category}</span>
              </div>

              {course.bestseller && (
                <div className="lms-course-hero-badge">
                  <TrendingUp className="h-4 w-4" />
                  Bestseller
                </div>
              )}

              <h1 className="lms-course-hero-title">{course.title}</h1>
              
              <p className="lms-course-hero-desc">{course.description}</p>

              <div className="lms-course-hero-meta">
                <div className="lms-course-hero-rating">
                  <Star className="lms-star-icon" fill="currentColor" />
                  <span className="rating-value">{course.rating}</span>
                  <span className="rating-text">({course.reviews} reviews)</span>
                </div>
                <div className="lms-course-hero-stat">
                  <Users className="h-5 w-5" />
                  <span>{course.students.toLocaleString()} students enrolled</span>
                </div>
                <div className="lms-course-hero-stat">
                  <Globe className="h-5 w-5" />
                  <span>English</span>
                </div>
              </div>

              <div className="lms-course-hero-instructor">
                <img 
                  src={course.instructorImage} 
                  alt={course.instructor}
                  className="lms-instructor-avatar"
                />
                <div>
                  <p className="instructor-label">Created by</p>
                  <p className="instructor-name">{course.instructor}</p>
                </div>
              </div>
            </div>

            {/* Course Card */}
            <div className="lms-course-card-sticky">
              <Card className="lms-course-purchase-card">
                <div className="lms-course-preview">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="lms-course-preview-img"
                  />
                  <div className="lms-course-preview-play">
                    <PlayCircle className="h-16 w-16" />
                    <span>Preview this course</span>
                  </div>
                </div>

                <div className="lms-course-purchase-content">
                  <div className="lms-course-purchase-price">
                    {course.discount > 0 && (
                      <>
                        <span className="price-current">${course.price}</span>
                        <span className="price-original">${course.originalPrice}</span>
                        <span className="price-discount">{course.discount}% off</span>
                      </>
                    )}
                  </div>

                  <Button className="lms-enroll-btn" data-testid="enroll-button">
                    Enroll Now
                  </Button>

                  <p className="lms-course-guarantee">30-Day Money-Back Guarantee</p>

                  <div className="lms-course-includes">
                    <h4 className="includes-title">This course includes:</h4>
                    <ul className="includes-list">
                      <li>
                        <PlayCircle className="h-4 w-4" />
                        <span>{course.duration} on-demand video</span>
                      </li>
                      <li>
                        <Download className="h-4 w-4" />
                        <span>Downloadable resources</span>
                      </li>
                      <li>
                        <Globe className="h-4 w-4" />
                        <span>Full lifetime access</span>
                      </li>
                      <li>
                        <MessageCircle className="h-4 w-4" />
                        <span>Access on mobile and desktop</span>
                      </li>
                      <li>
                        <Award className="h-4 w-4" />
                        <span>Certificate of completion</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="lms-container">
        <div className="lms-course-content-grid">
          <div className="lms-course-main">
            {/* What You'll Learn */}
            <Card className="lms-content-section">
              <h2 className="lms-content-title">What you'll learn</h2>
              <div className="lms-learn-grid">
                {course.whatYouLearn.map((item, index) => (
                  <div key={index} className="lms-learn-item">
                    <CheckCircle className="lms-check-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Course Description */}
            <Card className="lms-content-section">
              <h2 className="lms-content-title">Course Description</h2>
              <p className="lms-description-text">{course.longDescription}</p>
            </Card>

            {/* Requirements */}
            <Card className="lms-content-section">
              <h2 className="lms-content-title">Requirements</h2>
              <ul className="lms-requirements-list">
                {course.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </Card>

            {/* Curriculum */}
            {course.curriculum && course.curriculum.length > 0 && (
              <Card className="lms-content-section">
                <h2 className="lms-content-title">Course Curriculum</h2>
                <p className="lms-curriculum-info">
                  {course.lessons} lectures • {course.duration} total length
                </p>
                
                <div className="lms-curriculum-list">
                  {course.curriculum.map((section, index) => (
                    <div key={index} className="lms-curriculum-section">
                      <button 
                        className="lms-curriculum-header"
                        onClick={() => toggleSection(index)}
                      >
                        <div className="lms-curriculum-header-left">
                          {expandedSection === index ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                          <h3 className="lms-section-title">{section.section}</h3>
                        </div>
                        <span className="lms-section-meta">
                          {section.lectures} lectures • {section.duration}
                        </span>
                      </button>
                      
                      {expandedSection === index && section.lessons && (
                        <div className="lms-curriculum-content">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="lms-lesson-item">
                              <div className="lms-lesson-left">
                                <PlayCircle className="h-4 w-4" />
                                <span className="lms-lesson-title">{lesson.title}</span>
                                {lesson.preview && (
                                  <span className="lms-lesson-preview">Preview</span>
                                )}
                              </div>
                              <span className="lms-lesson-duration">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Instructor */}
            <Card className="lms-content-section">
              <h2 className="lms-content-title">Your Instructor</h2>
              <div className="lms-instructor-detail">
                <img 
                  src={course.instructorImage} 
                  alt={course.instructor}
                  className="lms-instructor-detail-img"
                />
                <div className="lms-instructor-detail-content">
                  <h3 className="lms-instructor-detail-name">{course.instructor_details.name}</h3>
                  <p className="lms-instructor-detail-title">{course.instructor_details.title}</p>
                  
                  <div className="lms-instructor-stats-row">
                    <div className="lms-instructor-stat-item">
                      <Users className="h-4 w-4" />
                      <span>{course.instructor_details.students.toLocaleString()} students</span>
                    </div>
                    <div className="lms-instructor-stat-item">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.instructor_details.courses} courses</span>
                    </div>
                    <div className="lms-instructor-stat-item">
                      <Star className="h-4 w-4" fill="currentColor" />
                      <span>{course.instructor_details.rating} rating</span>
                    </div>
                    <div className="lms-instructor-stat-item">
                      <Award className="h-4 w-4" />
                      <span>{course.instructor_details.reviews.toLocaleString()} reviews</span>
                    </div>
                  </div>

                  <p className="lms-instructor-bio">{course.instructor_details.bio}</p>
                </div>
              </div>
            </Card>

            {/* Student Reviews */}
            <Card className="lms-content-section">
              <h2 className="lms-content-title">Student Feedback</h2>
              
              <div className="lms-reviews-summary">
                <div className="lms-reviews-rating">
                  <div className="lms-reviews-score">{course.rating}</div>
                  <div className="lms-reviews-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="lms-star-icon" fill="currentColor" />
                    ))}
                  </div>
                  <div className="lms-reviews-count">Course Rating</div>
                </div>

                <div className="lms-reviews-bars">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="lms-review-bar-row">
                      <div className="lms-review-bar-label">
                        {[...Array(stars)].map((_, i) => (
                          <Star key={i} className="h-3 w-3" fill="currentColor" />
                        ))}
                      </div>
                      <div className="lms-review-bar-container">
                        <div 
                          className="lms-review-bar-fill" 
                          style={{ width: `${stars === 5 ? 85 : stars === 4 ? 12 : 3}%` }}
                        ></div>
                      </div>
                      <div className="lms-review-bar-percent">
                        {stars === 5 ? 85 : stars === 4 ? 12 : 3}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lms-reviews-list">
                <div className="lms-review-item">
                  <div className="lms-review-header">
                    <div className="lms-review-avatar">JD</div>
                    <div className="lms-review-author">
                      <div className="lms-review-name">John Doe</div>
                      <div className="lms-review-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="lms-review-text">
                    Excellent course! The instructor explains everything clearly and the projects are very practical. I feel much more confident in my skills now.
                  </p>
                  <div className="lms-review-date">2 weeks ago</div>
                </div>

                <div className="lms-review-item">
                  <div className="lms-review-header">
                    <div className="lms-review-avatar">SM</div>
                    <div className="lms-review-author">
                      <div className="lms-review-name">Sarah Miller</div>
                      <div className="lms-review-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="lms-review-text">
                    Best investment in my education! The content is up-to-date and comprehensive. Highly recommend to anyone looking to master these skills.
                  </p>
                  <div className="lms-review-date">1 month ago</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar - Empty for spacing on desktop */}
          <div className="lms-course-sidebar"></div>
        </div>
      </div>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <section className="lms-section lms-section-alt">
          <div className="lms-container">
            <h2 className="lms-section-title">More courses in {course.category}</h2>
            
            <div className="lms-related-courses-grid">
              {relatedCourses.map((relatedCourse) => (
                <Link 
                  key={relatedCourse.id} 
                  to={`/demo/lms/course/${relatedCourse.slug}`}
                  className="lms-course-card"
                >
                  <div className="lms-course-image-wrapper">
                    <img 
                      src={relatedCourse.image} 
                      alt={relatedCourse.title}
                      className="lms-course-image"
                      loading="lazy"
                    />
                    {relatedCourse.bestseller && (
                      <div className="lms-course-badge">Bestseller</div>
                    )}
                  </div>

                  <div className="lms-course-content">
                    <div className="lms-course-meta">
                      <span className="lms-course-category">{relatedCourse.category}</span>
                      <span className="lms-course-level">{relatedCourse.level}</span>
                    </div>

                    <h3 className="lms-course-title">{relatedCourse.title}</h3>
                    
                    <p className="lms-course-instructor">
                      <Users className="h-4 w-4" />
                      {relatedCourse.instructor}
                    </p>

                    <div className="lms-course-stats">
                      <div className="lms-course-rating">
                        <Star className="lms-star-icon" fill="currentColor" />
                        <span className="lms-rating-value">{relatedCourse.rating}</span>
                      </div>
                    </div>

                    <div className="lms-course-footer">
                      <div className="lms-course-duration">
                        <Clock className="h-4 w-4" />
                        {relatedCourse.duration}
                      </div>
                      <div className="lms-course-price">
                        <span className="lms-price-current">${relatedCourse.price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="lms-footer">
        <div className="lms-container">
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

export default LmsCourseDetail;
