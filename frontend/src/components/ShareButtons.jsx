import React from 'react';
import { Linkedin, Twitter, Mail, MessageCircle } from 'lucide-react';

/**
 * Reusable ShareButtons Component
 * 
 * @param {string} title - The title of the content to share
 * @param {string} url - The URL to share (defaults to current page)
 * @param {boolean} showLabel - Whether to show "Share:" label (default: true)
 * @param {string} variant - 'horizontal' or 'vertical' layout (default: 'horizontal')
 */
const ShareButtons = ({ 
  title = '', 
  url = window.location.href, 
  showLabel = true,
  variant = 'horizontal' 
}) => {
  // Encode title and URL for sharing
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  
  // Share links for different platforms
  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=Check out this: ${encodedUrl}`
  };

  const handleShare = (platform) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=500,noopener,noreferrer');
  };

  const handleEmailShare = () => {
    window.location.href = shareLinks.email;
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'rgba(255, 255, 255, 0.7)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    padding: 0
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: variant === 'horizontal' ? '12px' : '8px',
    flexDirection: variant === 'vertical' ? 'column' : 'row'
  };

  const labelStyle = {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '14px',
    fontWeight: '500',
    marginRight: '8px'
  };

  return (
    <div style={containerStyle}>
      {showLabel && variant === 'horizontal' && (
        <span style={labelStyle}>Share:</span>
      )}
      
      {/* LinkedIn */}
      <button
        onClick={() => handleShare('linkedin')}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#0077B5';
          e.currentTarget.style.borderColor = '#0077B5';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Linkedin size={18} />
      </button>

      {/* Twitter */}
      <button
        onClick={() => handleShare('twitter')}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#1DA1F2';
          e.currentTarget.style.borderColor = '#1DA1F2';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        aria-label="Share on Twitter"
        title="Share on Twitter"
      >
        <Twitter size={18} />
      </button>

      {/* WhatsApp */}
      <button
        onClick={() => handleShare('whatsapp')}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#25D366';
          e.currentTarget.style.borderColor = '#25D366';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
      >
        <MessageCircle size={18} />
      </button>

      {/* Email */}
      <button
        onClick={handleEmailShare}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#EA4335';
          e.currentTarget.style.borderColor = '#EA4335';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        aria-label="Share via Email"
        title="Share via Email"
      >
        <Mail size={18} />
      </button>
    </div>
  );
};

export default ShareButtons;
