import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function VideoDetail() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [comments, setComments] = useState([]);
    const [videoUrl, setVideoUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const productsResponse = await axios.get(`https://pleasant-pinafoe-elk.cycic.app/api/video/${id}/products`);
                setProducts(productsResponse.data[0].products);

                const videoResponse = await axios.get(`https://pleasant-pinafoe-elk.cycic.app/api/video${id}/comments`);
                setComments(videoResponse.data[0].comments);
                setVideoUrl(videoResponse.data[0].url_video);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [id]);

    const submitComment = async () => {
        const username = document.querySelector('#username').value;
        const comment = document.querySelector('#comment').value;

        const commentObject = {
            video_id: id,
            username,
            comment,
        };

        try {
            const response = await axios.post('https://pleasant-pinafoe-elk.cycic.app/api/comment', commentObject);
            console.log(response);
            window.location.reload(false);
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    return (
        <div className="grid-container">
            <div className="left">
                <h2>Products:</h2>
                {products.map((product, index) => (
                    <a href={product.link_product} className="product" key={index}>
                        <p>{product.title}</p>
                        <p>{product.price}</p>
                    </a>
                ))}
            </div>
            <div className="center">
                <iframe title="video" width="80%" height="315" src={videoUrl}></iframe>
            </div>
            <div className="right">
                <h2>Comments:</h2>
                <div className="comment-section">
                    {comments.map((comment, index) => (
                        <div className="comment-wrapper" key={index}>
                            <h4>{comment.username} :</h4>
                            <p>{comment.comment}</p>
                        </div>
                    ))}
                </div>
                <div className="add-comment-section">
                    <h4>Add Comment:</h4>
                    <input id="username" type="text" placeholder="username" />
                    <textarea id="comment" type="text" placeholder="comment" />
                    <button id="submitButton" onClick={submitComment} data-id={id}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default VideoDetail;
