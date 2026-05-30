import React from 'react';

const ReviewBox = ({ review }) => {
  return (
    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <strong>{review.user ? review.user.name : 'User'}</strong>
        <span style={{ color: 'var(--primary-color)' }}>
          {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
        </span>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
        {review.comment}
      </p>
      <small style={{ color: '#64748b', display: 'block', marginTop: '0.5rem' }}>
        {new Date(review.createdAt).toLocaleDateString()}
      </small>
    </div>
  );
};

export default ReviewBox;
