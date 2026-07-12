import React from 'react';

const FeedCard = ({ feed, onDelete }) => {
  const cardStyle = {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
  };

  const imageStyle = {
    width: '100%',
    height: '140px',
    objectFit: 'cover',
    borderBottom: '1px solid var(--color-border)',
  };

  const bodyStyle = {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    minHeight: '160px',
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'var(--color-primary-text)',
    margin: '0 0 8px 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const descStyle = {
    fontSize: '14px',
    color: 'var(--color-secondary-text)',
    margin: 0,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    lineHeight: '1.4',
  };

  const deleteBtnStyle = {
    alignSelf: 'flex-end',
    backgroundColor: 'var(--color-danger-light)',
    color: 'var(--color-danger-text)',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '16px',
  };

  return (
    <div style={cardStyle}>
      <img 
        src={feed.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60'} 
        alt={feed.title} 
        style={imageStyle} 
      />
      <div style={bodyStyle}>
        <div>
          <h3 style={titleStyle}>{feed.title}</h3>
          <p style={descStyle}>{feed.description}</p>
        </div>
        <button 
          style={deleteBtnStyle}
          onClick={() => onDelete(feed.id)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default FeedCard;