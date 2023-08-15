import axios from "axios";
import { useEffect, useState } from "react";

function Content() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function fetchVideos() {
            try {
                const response = await axios.get('https://pleasant-pinafoe-elk.cycic.app/api/video');
                setVideos(response.data);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        }

        fetchVideos();
    }, []);

    return (
        <main>
            <div className="card-container">
                {videos.map((video, index) => (
                    <a href={`detail/${video._id}`} className="card" key={index}>
                        <img src={video.url_image} alt="" />
                    </a>
                ))}
            </div>
        </main>
    );
}

export default Content;
