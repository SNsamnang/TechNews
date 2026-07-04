import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";
import Spinner from "../components/Spinner";
import WeatherCalendar from "../components/WeatherCalendar";

// ─── Hero / Featured Slider ───────────────────────────────────────────────────
function FeaturedHero({ posts }) {
    const [active, setActive] = useState(0);

    const toKhmerNumber = (num) => {
        const khmerNums = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];

        return num
            .toString()
            .split("")
            .map((n) => khmerNums[n] || n)
            .join("");
    };

    const convertPublishedAgoToKhmer = (text) => {
        const num = text.match(/\d+/)?.[0] || "0";
        const khmerNum = toKhmerNumber(num);

        if (text.includes("minute")) return `${khmerNum} នាទីមុន`;
        if (text.includes("hour")) return `${khmerNum} ម៉ោងមុន`;
        if (text.includes("day")) return `${khmerNum} ថ្ងៃមុន`;
        if (text.includes("week")) return `${khmerNum} សប្ដាហ៍មុន`;
        if (text.includes("month")) return `${khmerNum} ខែមុន`;
        if (text.includes("year")) return `${khmerNum} ឆ្នាំមុន`;

        return text;
    };

    useEffect(() => {
        if (!posts.length) return;
        const t = setInterval(
            () => setActive((i) => (i + 1) % posts.length),
            3000,
        );
        return () => clearInterval(t);
    }, [posts]);

    if (!posts.length) return null;
    const post = posts[active];

    return (
        <div className="hero">
            <div className="hero__image-wrap">
                <img
                    src={post.thumbnail_url}
                    alt={post.title}
                    className="hero__image"
                />
                <div className="hero__overlay" />
            </div>
            {/* <div className="hero__content">
                {post.category && (
                    <Link
                        to={`/category/${post.category.slug}`}
                        className="hero__cat"
                        style={{ backgroundColor: post.category.color }}
                    >
                        {post.category.name}
                    </Link>
                )}
                <Link to={`/post/${post.slug}`} className="hero__title">
                    {post.title}
                </Link>
                <p className="hero__excerpt">{post.excerpt}</p>
                <span className="hero__date">
                    {convertPublishedAgoToKhmer(post.published_ago)}
                </span>
            </div> */}

            {/* Dot navigation */}
            <div className="hero__dots">
                {posts.map((_, i) => (
                    <button
                        key={i}
                        className={`hero__dot ${i === active ? "active" : ""}`}
                        onClick={() => setActive(i)}
                    />
                ))}
            </div>

            {/* Thumbnail strip */}
            <div className="hero__strip">
                {posts.map((p, i) => (
                    <button
                        key={p.id}
                        className={`hero__thumb ${i === active ? "active" : ""}`}
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

    const toKhmerNumber = (num) => {
        const khmerNums = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];

        return num
            .toString()
            .split("")
            .map((n) => khmerNums[n] || n)
            .join("");
    };

    const convertPublishedAgoToKhmer = (text) => {
        const num = text.match(/\d+/)?.[0] || "0";
        const khmerNum = toKhmerNumber(num);

        if (text.includes("minute")) return `${khmerNum} នាទីមុន`;
        if (text.includes("hour")) return `${khmerNum} ម៉ោងមុន`;
        if (text.includes("day")) return `${khmerNum} ថ្ងៃមុន`;
        if (text.includes("week")) return `${khmerNum} សប្ដាហ៍មុន`;
        if (text.includes("month")) return `${khmerNum} ខែមុន`;
        if (text.includes("year")) return `${khmerNum} ឆ្នាំមុន`;

        return text;
    };

    useEffect(() => {
        Promise.all([
            axios.get("/api/posts/featured"),
            axios.get("/api/posts/latest"),
            axios.get("/api/posts/popular"),
        ])
            .then(([f, l, p]) => {
                setFeatured(f.data);
                setLatest(l.data);
                setPopular(p.data);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Spinner />;

    return (
        <div className="home-page">
            {/* Hero */}
            <FeaturedHero posts={featured} />
            {/* Main content + Sidebar */}
            <WeatherCalendar />
            <div className="home-grid">
                {/* Latest news */}
                <section className="latest-section">
                    <h2 className="section-title">ព័ត៌មានថ្មីៗ</h2>
                    <div className="posts-grid">
                        {latest.map((post) => (
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
                                <span className="popular-num">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <div>
                                    <Link
                                        to={`/post/${post.slug}`}
                                        className="popular-title"
                                    >
                                        {post.title}
                                    </Link>
                                    <span className="popular-date">
                                        {convertPublishedAgoToKhmer(
                                            post.published_ago,
                                        )}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}

