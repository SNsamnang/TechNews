import React from "react";
import { ImTextColor } from "react-icons/im";
import { Link } from "react-router-dom";

export default function PostCard({ post, size = "md" }) {
    if (!post) return null;

    const thumbnail = post.thumbnail_url || "/images/placeholder.jpg";
    const toKhmerNumber = (num) => {
        const khmerNums = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
        return num
            .toString()
            .split("")
            .map((d) => khmerNums[d] || d)
            .join("");
    };
    const khmerTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();

        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);
        const diffMonth = Math.floor(diffDay / 30);
        const diffYear = Math.floor(diffDay / 365);

        if (diffSec < 60) {
            return ` ${diffSec} វិនាទីមុន`;
        }

        if (diffMin < 60) {
            return ` ${diffMin} នាទីមុន`;
        }

        if (diffHour < 24) {
            return ` ${diffHour} ម៉ោងមុន`;
        }

        if (diffDay === 1) {
            return "ម្សិលមិញ";
        }

        if (diffDay < 30) {
            return ` ${diffDay} ថ្ងៃមុន`;
        }

        if (diffMonth < 12) {
            return `${diffMonth}ខែមុន`;
        }

        return `${diffYear}ឆ្នាំមុន`;
    };

    return (
        <article className={`post-card post-card--${size}`}>
            <Link to={`/post/${post.slug}`} className="post-card__image-wrap">
                {post.media_type === "video_upload" ? (
                    <video
                        className="post-card__image"
                        controls
                        preload="metadata"
                    >
                        <source src={post.thumbnail_url} type="video/mp4" />
                        Your browser does not support video.
                    </video>
                ) : (
                    <img
                        src={post.thumbnail_url}
                        alt={post.title}
                        className="post-card__image"
                        loading="lazy"
                        onError={(e) => {
                            e.target.src =
                                "https://placehold.co/640x360/eee/999?text=No+Image";
                        }}
                    />
                )}
            </Link>

            <div className="post-card__body">
                <Link
                    to={`/post/${post.slug}`}
                    className="post-card__title"
                    style={{ color: post.category?.color || "#000" }}
                >
                    {post.title}
                </Link>

                {size !== "sm" && post.excerpt && (
                    <p className="post-card__excerpt">{post.excerpt}</p>
                )}

                <div className="post-card__meta">
                    <span className="post-card__date">
                        {khmerTimeAgo(post.published_at)}
                    </span>

                    <span className="post-card__views">
                        👁 {post.views || 0}
                    </span>
                </div>
            </div>
        </article>
    );
}
