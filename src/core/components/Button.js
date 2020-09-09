import React from 'react';
import cn from 'classnames';

export default function Button({ onClick = () => {}, children, className }) {
  return (
    <button className={cn('movies-button', className)} onClick={onClick}>
      {children}
    </button>
  )
}