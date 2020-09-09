import React from 'react';

export default function MovieOverview({ overview }) {
  return (
    <div className="description">
      {
        overview
          ? <p>{overview}</p>
          : <p>No overview available.</p>
      }
    </div>
  )
}