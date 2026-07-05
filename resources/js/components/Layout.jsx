import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import SponsorPopup from "./SponsorPopup";
import {
    FaFacebook,
    FaTelegram,
    FaInstagram,
    FaPhoneVolume,
} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { RiTiktokLine } from "react-icons/ri";
import { IoIosMailUnread } from "react-icons/io";

// ─── Breaking News Ticker ─────────────────────────────────────────────────────
function BreakingTicker() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get("/api/posts/breaking").then((r) => setItems(r.data));
    }, []);

    if (!items.length) return null;

    return (
        <div className="breaking-bar">
            <span className="breaking-label">BREAKING</span>
            <div className="ticker-wrap">
                <div className="ticker-inner">
                    {[...items, ...items].map((item, i) => (
                        <Link
                            key={i}
                            to={`/post/${item.slug}`}
                            className="ticker-item"
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/categories").then((r) => setCategories(r.data));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search?q=${encodeURIComponent(search.trim())}`);
            setSearch("");
        }
    };

    // Banner
    const [key, setKey] = useState(0);

    useEffect(() => {
        const cycle = () => {
            // Animation takes 15s
            setTimeout(() => {
                // Wait 10s, then restart
                setTimeout(() => {
                    setKey((prev) => prev + 1);
                }, 30000);
            }, 20000);
        };

        cycle();

        const interval = setInterval(() => {
            setKey((prev) => prev + 1);
        }, 25000); // 15s run + 10s wait

        return () => clearInterval(interval);
    }, []);

    return (
        <header className="navbar">
            <div className="container">
                <div className="navbar-top">
                    <Link to="/" className="logo">
                        <span className="logo-main">ANACHAK</span>
                        <span className="logo-sub">NEWS</span>
                    </Link>

                    <form className="search-form" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="ស្វែងរកព័ត៌មាន..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-btn">
                            <IoSearch />
                        </button>
                    </form>

                    <button
                        className="menu-toggle"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        ☰
                    </button>
                </div>

                {/* Rotation Banner */}
                <div className="news-ticker">
                    <div className="news-ticker__label">ព័ត៌មានថ្មី</div>

                    <div className="news-ticker__content">
                        <span className="news-ticker__text">
                            សូមស្វាគមន៍មកកាន់គេហទំព័រ CAMBO របស់យើងខ្ញុំ
                            ដែលផ្តល់ជូនព័ត៌មានកីឡាគ្រប់ប្រភេទ ទាំងក្នុងស្រុក
                            និងអន្តរជាតិ អាចចូលទស្សនាបានដោយសេរី។
                            សូមអរគុណសម្រាប់ការគាំទ្រ។
                        </span>
                    </div>
                </div>

                <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        ទំព័រដើម
                    </NavLink>
                    {categories.map((cat) => (
                        <NavLink
                            key={cat.id}
                            to={`/category/${cat.slug}`}
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                            style={{ "--cat-color": cat.color }}
                            onClick={() => setMenuOpen(false)}
                        >
                            {cat.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/categories").then((r) => setCategories(r.data));
    }, []);

    return (
        <footer
            className="footer"
            // style={{
            //     backgroundImage: "url('/images/Angkor-Wat2.jpg')",
            //     backgroundSize: "cover",
            //     backgroundPosition: "center",
            //     backgroundRepeat: "no-repeat",
            // }}
        >
            <div className=" container">
                <div className="footer-grid">
                    <div>
                        <Link to="/" className="logo">
                            <span className="logo-main">ANACHAK</span>
                            <span className="logo-sub">NEWS</span>
                        </Link>
                        <p className="footer-desc">រក្សាគោលការណ៍ឯកជនភាព</p>
                        <p className="footer-desc1">អាស័យដ្ឋាន</p>
                        <p className="footer-desc">
                            📍 ផ្ទះលេខ៧៥ បុរីហុកឆេង មហាវិថីវេងស្រេង
                            សង្កាត់ទួលពង្រ ​​ភ្នំពេញ កម្ពុជា
                        </p>
                    </div>
                    <div>
                        <h3>អំពីយើង</h3>
                        <p className="footer-desc">
                            ANACHAK NEWS គឺជាគេហទំព័រព័ត៌មានអនឡាញ
                            ដែលផ្តល់ព័ត៌មានថ្មីៗ ព័ត៌មានជាតិ និងអន្តរជាតិ
                            ប្រកបដោយភាពត្រឹមត្រូវ និងទុកចិត្តបាន។
                        </p>
                    </div>
                    <div className="all-icon">
                        <h3>ទំនាក់ទំនង</h3>
                        <div className="contact">
                            <a href="https://mail.google.com/mail/u/0/#inbox">
                                <span>
                                    <IoIosMailUnread size={15} />
                                </span>
                                <span> chhenglongty@gmail.com</span>
                            </a>
                            <p>
                                <FaPhoneVolume size={15} /> 031 8380 072
                            </p>
                        </div>

                        <h3>តាមបណ្ដាយសង្គម</h3>
                        <a
                            href="https://www.facebook.com/chhenglong.ty"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href="https://t.me/Chhenglong_Ty"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                        >
                            <FaTelegram />
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://www.tiktok.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                        >
                            <RiTiktokLine />
                        </a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>
                        © រក្សាសិទ្ទគ្រប់គ្រងដោយ ANACHAK{" "}
                        {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </footer>
    );
}

// ─── Layout ────────────────────────────────────────────────────────────────────
export default function Layout() {
    return (
        <div className="site-wrapper">
            <SponsorPopup />

            <BreakingTicker />
            <Navbar />

            <main className="main-content">
                <div className="container">
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>
    );
}
