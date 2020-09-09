import React from 'react';
import cn from 'classnames';

export default function Tag({ children, active = false }) {
  return (
    <div className={cn('tag', { active })}>
      <small>{children}</small>
    </div>
  );
}