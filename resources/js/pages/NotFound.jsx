import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>ទំព័រដែលអ្នកកំពុងស្វែងរករកមិនឃើញ។</p>
      <Link to="/" className="btn-primary">ត្រឡប់ទៅទំព័រដើម</Link>
    </div>
  );
}
