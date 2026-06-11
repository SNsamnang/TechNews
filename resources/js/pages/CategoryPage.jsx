import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Load category info
  useEffect(() => {
    axios.get(`/api/categories/${slug}`).then(r => setCategory(r.data));
  }, [slug]);

  // Load posts
  useEffect(() => {
    setLoading(true);
    axios.get(`/api/categories/${slug}/posts?page=${page}`)
      .then(r => {
        setPosts(prev => page === 1 ? r.data.data : [...prev, ...r.data.data]);
        setLastPage(r.data.last_page);
      })
      .finally(() => setLoading(false));
  }, [slug, page]);

  // Reset on category change
  useEffect(() => {
    setPage(1);
    setPosts([]);
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="category-page">
      {category && (
        <div className="category-header" style={{ borderColor: category.color }}>
          <span className="category-badge" style={{ backgroundColor: category.color }}>
            {category.name}
            
          </span>
          {category.description && <p>{category.description}</p>}
        </div>
      )}

      {loading && page === 1 ? (
        <Spinner />
      ) : (
        <>
          <div className="posts-grid">
            {posts.map(post => (
              <PostCard key={post.id} post={post} size="md" />
            ))}
          </div>

          {page < lastPage && (
            <div className="load-more-wrap">
              <button
                className="load-more-btn"
                onClick={() => setPage(p => p + 1)}
                disabled={loading}
              >
                {loading ? 'កំពុងផ្ទុក...' : 'មើលបន្ថែម'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
