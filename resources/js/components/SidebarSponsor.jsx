import { useEffect, useState } from "react";
import axios from "axios";

export default function SidebarSponsor() {
    const [ad, setAd] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/ads/sidebar")
            .then((res) => {
                if (res.data.length) {
                    setAd(res.data[0]);
                }
            })
            .catch((err) => console.error(err));
    }, []);

    if (!ad) return null;

    return (
        <div className="sidebar-ad">
            <a href={ad.url} target="_blank" rel="noreferrer">
                <img
                    src={`http://127.0.0.1:8000/storage/${ad.image}`}
                    alt={ad.title}
                    style={{ width: "100%" }}
                />
            </a>
        </div>
    );
}