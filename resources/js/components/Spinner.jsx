import React from 'react';

export default function Spinner({ text = 'កំពុងផ្ទុក...' }) {
  return (
    <div className="spinner-wrap">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
}
