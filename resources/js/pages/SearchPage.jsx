import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setPage(1);
    axios.get(`/api/posts?search=${encodeURIComponent(query)}&page=1`)
      .then(r => {
        setPosts(r.data.data);
        setLastPage(r.data.last_page);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="search-page">
      <div className="search-header">
        <h2>លទ្ធផលស្វែងរក: <span>"{query}"</span></h2>
      </div>

      {loading ? <Spinner /> : (
        posts.length === 0 ? (
          <div className="no-results">
            <p>រកមិនឃើញអត្ថបទសម្រាប់ "{query}"</p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map(post => (
              <PostCard key={post.id} post={post} size="md" />
            ))}
          </div>
        )
      )}
    </div>
  );
}
