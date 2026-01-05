import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { getPublishedBlogs } from '../services/blogService';
import { trackPageView } from '../services/analytics';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchBlogs();
    // Track page view
    trackPageView('blog');
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getPublishedBlogs();
      setBlogs(data);
      setError(null);
    } catch (err) {
      setError('Failed to load blogs. Please try again later.');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(blogs.map(blog => blog.category))];
  const filteredBlogs = selectedCategory === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', paddingTop: '80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
          <div style={{ color: '#fff', fontSize: '18px' }}>Loading blogs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', paddingTop: '80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
          <div style={{ color: '#FFF', fontSize: '18px', marginBottom: '16px' }}>{error}</div>
          <button 
            onClick={fetchBlogs}
            style={{
              padding: '12px 32px',
              background: '#fff',
              color: '#667eea',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9FA', paddingTop: '80px' }}>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '80px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '700', 
            color: '#fff',
            marginBottom: '16px',
            lineHeight: '1.2'
          }}>
            Blog & Insights
          </h1>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Discover the latest insights, tutorials, and stories from the world of technology
          </p>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 1 && (
        <section style={{ 
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '24px',
          borderBottom: '1px solid rgba(102, 126, 234, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 20px',
                  background: selectedCategory === category ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(102, 126, 234, 0.1)',
                  color: selectedCategory === category ? '#fff' : '#667eea',
                  border: selectedCategory === category ? 'none' : '1px solid rgba(102, 126, 234, 0.3)',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'capitalize'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '60px 24px'
      }}>
        {filteredBlogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            <p style={{ 
              color: '#64748B',
              fontSize: '18px'
            }}>
              No blog posts found in this category.
            </p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {filteredBlogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blogs/${blog.slug}`}
                style={{ 
                  textDecoration: 'none',
                  display: 'block',
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(102, 126, 234, 0.15)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.15)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }}
              >
                {/* Cover Image */}
                {blog.cover_image && (
                  <div style={{ 
                    width: '100%',
                    height: '220px',
                    background: `url(${blog.cover_image}) center/cover`,
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      padding: '6px 12px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: '#fff',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                    }}>
                      {blog.category}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div style={{ padding: '24px' }}>
                  <h3 style={{ 
                    fontSize: '22px',
                    fontWeight: '600',
                    color: '#1E293B',
                    marginBottom: '12px',
                    lineHeight: '1.4'
                  }}>
                    {blog.title}
                  </h3>

                  <p style={{ 
                    color: '#64748B',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    marginBottom: '16px'
                  }}>
                    {blog.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div style={{ 
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    fontSize: '14px',
                    color: '#94A3B8',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={16} />
                      <span>{blog.author}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={16} />
                      <span>{formatDate(blog.created_at)}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div style={{ 
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '16px'
                    }}>
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 10px',
                            background: 'rgba(102, 126, 234, 0.1)',
                            color: '#667eea',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}
                        >
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More */}
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#667eea',
                    fontSize: '15px',
                    fontWeight: '500'
                  }}>
                    Read More
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogList;
