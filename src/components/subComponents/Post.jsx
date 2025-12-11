import React, { useState, useEffect, useContext } from 'react';
import { idContext } from '../../context/context.js'
const Post = (props) => {
    const userId = useContext(idContext)
    const [likesCount, setLikesCount] = useState(Number(props.likes.length));
    const [dislikesCount, setDislikesCount] = useState(Number(props.dislikes.length));

    useEffect(() => {
        setLikesCount(Number(props.likes.length));
        setDislikesCount(Number(props.dislikes.length));
    }, [props.likes, props.dislikes]);

    const [reacted, setReacted] = useState(null);

    useEffect(() => {
        if (props.likes.includes(userId)) {
            setReacted("like");
        } else if (props.dislikes.includes(userId)) {
            setReacted("dislike");
        } else {
            setReacted(null);
        }
    }, [props.likes, props.dislikes, userId]);

    // 🔥 Call backend when likes/dislikes change
    useEffect(() => {
        const updateLikesAndDislikesCount = async () => {

            try {
                const response = await fetch(
                    `http://localhost:3000/post/update?id=${props.id}&reacted=${reacted}&userId=${userId}`,
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );

                const data = await response.json();

                if (!data.success) {
                    alert("Update failed:", data.message);
                }
            } catch (error) {
                alert("Error updating like/dislike:", error);
            }
        };

        updateLikesAndDislikesCount();
    }, [reacted]);

    const handleLike = () => {
        if (reacted === "like") {
            // Remove like
            setReacted(null);
            setLikesCount((prev) => prev - 1);
            return;
        }

        if (reacted === "dislike") {
            // Switch dislike → like
            setDislikesCount((prev) => prev - 1);
        }

        setReacted("like");
        setLikesCount((prev) => prev + 1);
    };

    const handleDislike = () => {
        if (reacted === "dislike") {
            // Remove dislike
            setReacted(null);
            setDislikesCount((prev) => prev - 1);
            return;
        }

        if (reacted === "like") {
            // Switch like → dislike
            setLikesCount((prev) => prev - 1);
        }

        setReacted("dislike");
        setDislikesCount((prev) => prev + 1);
    };


    return (
        <div className='flex flex-col gap-4 bg-dark-blue-900 text-off-blue-200 rounded-4xl p-4 overflow-y-auto text-2xl'>
            <div className='flex gap-4'>
                <img
                    src="https://picsum.photos/2000.webp"
                    alt="DP"
                    className='min-w-14 max-w-14 rounded-[100%]'
                />
                <div className='flex flex-col'>
                    <p>{props.fullname}</p>
                    <p className='text-sm'>{props.createdAt}</p>
                </div>
            </div>

            <div>{props.content}</div>

            <div className='flex justify-around gap-2 font-semibold border-t-2 border-off-blue-200 pt-2'>
                <div className='flex flex-col justify-center items-center gap-2 min-w-[49%]'>
                    <span className='text-lg'>{likesCount}</span>

                    <button
                        onClick={handleLike}
                        className={`group flex gap-2 justify-center py-2 min-w-full cursor-pointer rounded-4xl border-2 border-off-blue-200 
                         ${reacted === "like" ? "bg-off-blue-200 text-dark-blue-900" : "text-off-blue-200 hover:bg-off-blue-200 hover:text-dark-blue-900"}`}
                    >
                        <img
                            src="/src/assets/like-icon.svg"
                            alt="like-button"
                            className={`w-8 filter ${reacted === "like"
                                ? "filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]"
                                : "filter-[invert(88%)_sepia(5%)_saturate(2050%)_hue-rotate(166deg)_brightness(100%)_contrast(106%)] group-hover:filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]"
                                }`}
                        />
                        <span>Like</span>
                    </button>
                </div>
                <div className='flex flex-col justify-center items-center gap-2 min-w-[49%]'>
                    <span className='text-lg'>{dislikesCount}</span>

                    <button
                        onClick={handleDislike}
                        className={`group flex gap-2 justify-center py-2 min-w-full cursor-pointer rounded-4xl border-2 border-off-blue-200 
                         ${reacted === "dislike" ? "bg-off-blue-200 text-dark-blue-900" : "text-off-blue-200 hover:bg-off-blue-200 hover:text-dark-blue-900"}`}
                    >
                        <img
                            src="/src/assets/dislike-icon.svg"
                            alt="dislike-button"
                            className={`w-8 filter ${reacted === "dislike"
                                ? "filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]"
                                : "filter-[invert(88%)_sepia(5%)_saturate(2050%)_hue-rotate(166deg)_brightness(100%)_contrast(106%)] group-hover:filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]"
                                }`}
                        />
                        <span>Dislike</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Post;
