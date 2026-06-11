import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`/api/posts/${slug}`)
      .then(r => {
        setPost(r.data.post);
        setRelated(r.data.related);
      })
      .catch(() => setError('រកមិនឃើញអត្ថបទនេះ។'))
      .finally(() => setLoading(false));
  }, [slug]);

  // Scroll to top on navigation
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (loading) return <Spinner />;
  if (error) return <div className="error-box">{error}</div>;
  if (!post) return null;

  return (
    <div className="post-detail-page">
      <div className="post-detail-grid">
        {/* Article */}
        <article className="post-article">
          {/* Category + Title */}
          {post.category && (
            <Link
              to={`/category/${post.category.slug}`}
              className="article-cat"
              style={{ color: post.category.color }}
            >
              {post.category.name}
            </Link>
          )}
          <h1 className="article-title">{post.title}</h1>

          {/* Meta */}
          <div className="article-meta">
            <span>✍️ {post.author?.name}</span>
            <span>📅 {new Date(post.published_at).toLocaleDateString('km-KH', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}</span>
            <span>👁 {post.views?.toLocaleString()} អ្នកអាន</span>
          </div>

          {/* Thumbnail */}
          {post.thumbnail_url && (
            <img src={post.thumbnail_url} alt={post.title} className="article-thumbnail" />
          )}

          {/* Body */}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="article-tags">
              <span>🏷️ ស្លាក:</span>
              {post.tags.map(tag => (
                <span key={tag.slug} className="tag">{tag.name}</span>
              ))}
            </div>
          )}

          {/* Share */}
          <div className="article-share">
            <span>ចែករំលែក:</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="share-btn share-fb"
            >
              Facebook
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noreferrer"
              className="share-btn share-tg"
            >
              Telegram
            </a>
          </div>
        </article>

        {/* Sidebar - Related */}
        <aside className="sidebar">
          <h3 className="section-title">អត្ថបទពាក់ព័ន្ធ</h3>
          <div className="related-list">
            {related.map(p => (
              <PostCard key={p.id} post={p} size="sm" />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
