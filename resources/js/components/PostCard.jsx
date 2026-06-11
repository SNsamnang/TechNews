import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post, size = "md" }) {
    if (!post) return null;

    const thumbnail = post.thumbnail_url || "/images/placeholder.jpg";

    return (
        <article className={`post-card post-card--${size}`}>
            <Link to={`/post/${post.slug}`} className="post-card__image-wrap">
                <img
                    src={thumbnail}
                    alt={post.title}
                    className="post-card__image"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src =
                            "https://placehold.co/640x360/eee/999?text=No+Image";
                    }}
                />
                {post.category && (
                    <span
                        className="post-card__cat"
                        style={{ backgroundColor: post.category.color }}
                    >
                        {post.category.name}
                    </span>
                )}
            </Link>

            <div className="post-card__body">
                <Link to={`/post/${post.slug}`} className="post-card__title">
                    {post.title}
                </Link>
                {size !== "sm" && post.excerpt && (
                    <p className="post-card__excerpt">{post.excerpt}</p>
                )}
                <div className="post-card__meta">
                    <span className="post-card__date">
                        {post.published_ago}
                    </span>
                    <span className="post-card__views">
                        👁 {post.views?.toLocaleString()}
                    </span>
                </div>
            </div>
        </article>
    );
}
