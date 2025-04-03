
import React from 'react';

type StarRatingProps = {
  rating: number;
  className?: string;
};

const StarRating = ({ rating = 0, className = '' }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const stars = [];
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-${i}`} className="text-gold">★</span>);
  }
  
  // Half star
  if (hasHalfStar) {
    stars.push(<span key="half" className="text-gold">★</span>);
  }
  
  // Empty stars
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty-${i}`} className="text-gold/30">★</span>);
  }
  
  return <div className={`flex ${className}`}>{stars}</div>;
};

export default StarRating;
