import React from 'react';
import Tag from './Tag';

export default function TagList({ active, items = [], field }) {
  return (
    <div className="tags">
      {items.map((item) => (
        <Tag key={item.id} active={item[field].toLowerCase() === active}>
          {item[field]}
        </Tag>
      ))}
    </div>
  )
}