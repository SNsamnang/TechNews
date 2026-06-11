import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';

// ─── Hero / Featured Slider ───────────────────────────────────────────────────
function FeaturedHero({ posts }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!posts.length) return;
    const t = setInterval(() => setActive(i => (i + 1) % posts.length), 5000);
    return () => clearInterval(t);
  }, [posts]);

  if (!posts.length) return null;
  const post = posts[active];

  return (
    <div className="hero">
      <div className="hero__image-wrap">
        <img src={post.thumbnail_url} alt={post.title} className="hero__image" />
        <div className="hero__overlay" />
      </div>
      <div className="hero__content">
        {post.category && (
          <Link
            to={`/category/${post.category.slug}`}
            className="hero__cat"
            style={{ backgroundColor: post.category.color }}
          >
            {post.category.name}
          </Link>
        )}
        <Link to={`/post/${post.slug}`} className="hero__title">{post.title}</Link>
        <p className="hero__excerpt">{post.excerpt}</p>
        <span className="hero__date">{post.published_ago}</span>
      </div>

      {/* Dot navigation */}
      <div className="hero__dots">
        {posts.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="hero__strip">
        {posts.map((p, i) => (
          <button
            key={p.id}
            className={`hero__thumb ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
          >
            <img src={p.thumbnail_url} alt={p.title} />
            <span>{p.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('/api/posts/featured'),
      axios.get('/api/posts/latest'),
      axios.get('/api/posts/popular'),
    ]).then(([f, l, p]) => {
      setFeatured(f.data);
      setLatest(l.data);
      setPopular(p.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="home-page">
      {/* Hero */}
      <FeaturedHero posts={featured} />

      {/* Main content + Sidebar */}
      <div className="home-grid">
        {/* Latest news */}
        <section className="latest-section">
          <h2 className="section-title">ព័ត៌មានថ្មីៗ</h2>
          <div className="posts-grid">
            {latest.map(post => (
              <PostCard key={post.id} post={post} size="md" />
            ))}
          </div>
        </section>

        {/* Popular sidebar */}
        <aside className="sidebar">
          <h2 className="section-title">ពេញនិយម</h2>
          <div className="popular-list">
            {popular.map((post, i) => (
              <div key={post.id} className="popular-item">
                <span className="popular-num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <Link to={`/post/${post.slug}`} className="popular-title">
                    {post.title}
                  </Link>
                  <span className="popular-date">{post.published_ago}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
