import React from 'react';
import cn from 'classnames';

export default function Container({ className, children, fullHeight = false }) {
  return (
    <div className={cn('container', className, { 'full-height': fullHeight })}>
      <div className="container-padding">
        {children}
      </div>
    </div>
  )
}