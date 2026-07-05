import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function SponsorPopup() {
    const location = useLocation();

    const [open, setOpen] = useState(false);
    const [ad, setAd] = useState(null);
    const [showCloseButton, setShowCloseButton] = useState(false);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/ads/popup").then((res) => {
            const ads = res.data;
            if (!ads.length) return;
            const random = ads[Math.floor(Math.random() * ads.length)];
            setAd(random);
            setTimeout(() => {
                setOpen(true);
                // Show close button after 0.5 second
                setTimeout(() => {
                    setShowCloseButton(true);
                }, 3000);
            }, 1000);
        });
    }, [location.pathname]);

    const handleClose = () => {
        setOpen(false);
        setShowCloseButton(false);
    };

    if (!open || !ad) return null;

    return (
        <div className="sponsor-overlay" onClick={handleClose}>
            <div className="sponsor-modal" onClick={(e) => e.stopPropagation()}>
                {showCloseButton && (
                    <button className="close-btn" onClick={handleClose}>
                        ✕
                    </button>
                )}
                <div className="sponsored-badge"></div>
                {ad.media_type === "video_url" ? (
                    <iframe
                        src={ad.video_url}
                        title={ad.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : ad.media_type === "video_upload" ? (
                    <video controls autoPlay muted playsInline>
                        <source
                            src={`http://127.0.0.1:8000/storage/${ad.image}`}
                            type="video/mp4"
                        />
                    </video>
                ) : (
                    <a href={ad.url} target="_blank" rel="noreferrer">
                        <img
                            src={`http://127.0.0.1:8000/storage/${ad.image}`}
                            alt={ad.title}
                        />
                    </a>
                )}
            </div>
        </div>
    );
}
