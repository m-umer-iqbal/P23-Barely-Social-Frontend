import React, { useState, useEffect, useContext, useRef } from 'react';
import { idContext, globalRefreshContext, isPostContentEditableContext, editPostContext, profilePictureContext } from '../../context/context'
import ProfilePicture from "./ProfilePicture.jsx";
import SuccessOrWarningMessage from "./SuccessOrWarningMessage";

const Post = (props) => {
    const [alertType, setAlertType] = useState(null);
    const userProfilePicture = useContext(profilePictureContext)
    const { setGlobalRefresh } = useContext(globalRefreshContext)
    const { setIsPostContentEditable } = useContext(isPostContentEditableContext)
    const { postToEdit, setPostToEdit } = useContext(editPostContext)
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

    const handleReactionUpdate = async (newReaction) => {
        try {
            const response = await fetch(`http://localhost:3000/post/update?id=${props.id}&reacted=${newReaction}&userId=${userId}`, {
                method: "GET",
                credentials: "include"
            });
            const data = await response.json();
            if (data.success) {
                // setAlertType({ alert: 'success', message: data.message })
            } else {
                setAlertType({ alert: 'error', message: data.message })
            }
        } catch (error) {
            setAlertType({ alert: 'error', message: error })
        }
    };

    const handleLike = () => {
        let newReaction = reacted === "like" ? null : "like";

        if (reacted === "like") setLikesCount(prev => prev - 1);
        if (reacted === "dislike") setDislikesCount(prev => prev - 1);
        if (newReaction === "like") setLikesCount(prev => prev + 1);

        setReacted(newReaction);
        handleReactionUpdate(newReaction);
    };

    const handleDislike = () => {
        let newReaction = reacted === "dislike" ? null : "dislike";

        if (reacted === "dislike") setDislikesCount(prev => prev - 1);
        if (reacted === "like") setLikesCount(prev => prev - 1);
        if (newReaction === "dislike") setDislikesCount(prev => prev + 1);

        setReacted(newReaction);
        handleReactionUpdate(newReaction);
    };

    const isMyPostCategory = props.category === "myPosts";

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/post/delete?id=${props.id}`, {
                method: "GET",
                credentials: "include"
            });
            const data = await response.json();
            if (data.success) {
                setAlertType({ alert: 'success', message: data.message })
                setGlobalRefresh(prev => !prev)
            } else {
                setAlertType({ alert: 'error', message: data.message })
            }
        } catch (error) {
            setAlertType({ alert: 'error', message: "Error in Deleting Post" })
            setGlobalRefresh(prev => !prev)
        }
    }
    // Add a ref to store original content
    const originalContentRef = useRef(props.content);

    useEffect(() => {
        originalContentRef.current = props.content;
    }, [props.content]);

    // Check if this post is currently being edited
    const isCurrentlyEditing = postToEdit.inEditing && postToEdit.postId === props.id;

    const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        return isNaN(d) ? null : d.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className='flex flex-col gap-4 bg-dark-blue-900 text-off-blue-200 rounded-4xl p-4'>
            {alertType && alertType.alert && (
                <SuccessOrWarningMessage alert={alertType.alert} message={alertType.message} onClose={() => setAlertType(null)} />
            )}

            <div className="flex justify-between">
                <div className='flex gap-4'>
                    <ProfilePicture profilePicture={isMyPostCategory ? userProfilePicture : props.profilePicture} />
                    <div className='flex flex-col'>
                        <p className="text-base">{props.fullname || "@" + props.username}</p>
                        <p className="text-xs">
                            {props.updatedAt && props.updatedAt !== props.createdAt
                                ? `${formatDate(props.updatedAt)} • Edited`
                                : `${formatDate(props.createdAt)}`}
                        </p>
                    </div>
                </div>

                <div>
                    {isMyPostCategory && (
                        <div className="flex gap-1">
                            <div className={`group rounded-full transition-all duration-300 ease-in-out cursor-pointer p-1 ${isCurrentlyEditing
                                ? 'bg-off-blue-200'
                                : 'hover:bg-off-blue-200'
                                }`}>
                                <img
                                    src="/src/assets/edit-icon.svg"
                                    alt="Edit-Icon"
                                    className={`filter transition-all duration-300 ease-in-out ${isCurrentlyEditing
                                        ? 'filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]'
                                        : 'filter-[invert(88%)_sepia(5%)_saturate(2050%)_hue-rotate(166deg)_brightness(100%)_contrast(106%)] group-hover:filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]'
                                        } w-5
                                        sm:w-5.5
                                        md:w-6`}
                                    onClick={() => {
                                        // If already editing this post, reset and start fresh
                                        if (isCurrentlyEditing) {
                                            setPostToEdit({
                                                inEditing: false,
                                                postId: null,
                                                content: "",
                                                image: null
                                            });

                                            // Small delay to ensure state updates before starting new edit
                                            setTimeout(() => {
                                                setIsPostContentEditable(true);
                                                setPostToEdit({
                                                    inEditing: true,
                                                    postId: props.id,
                                                    author: userId,
                                                    content: props.content,
                                                    image: props.image
                                                });
                                            }, 50);
                                        } else {
                                            setIsPostContentEditable(true);
                                            setPostToEdit({
                                                inEditing: true,
                                                postId: props.id,
                                                author: userId,
                                                content: props.content,
                                                image: props.image
                                            });
                                        }
                                    }}
                                />
                            </div>

                            {!isCurrentlyEditing && <div className="group rounded-full transition-all duration-300 ease-in-out hover:bg-red-500 cursor-pointer p-1">
                                <img
                                    src="/src/assets/delete-icon.svg"
                                    alt="Delete-Icon"
                                    className="filter-[invert(88%)_sepia(5%)_saturate(2050%)_hue-rotate(166deg)_brightness(100%)_contrast(106%)] filter transition-all duration-300 group-hover:filter-[invert(100%)_sepia(98%)_saturate(0%)_hue-rotate(331deg)_brightness(103%)_contrast(102%)] 
                                    w-5
                                    sm:w-5.5
                                    md:w-6"
                                    onClick={() => {
                                        if (confirm("Delete this post?")) {
                                            handleDelete();
                                        } else {
                                            return;
                                        }
                                    }}
                                />
                            </div>}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="wrap-break-words overflow-hidden">{props.content}</div>
                {props.image && <div><img src={props.image} alt="Post" className="mt-2 rounded-4xl" /></div>}
            </div>

            <div className='flex justify-around gap-2 font-semibold border-t-2 border-off-blue-200 pt-2'>
                <div className='flex flex-col justify-center items-center gap-2 min-w-[49%]'>
                    <span className='text-sm
                                    sm:text-base
                                    md:text-lg'>{likesCount}</span>

                    <button
                        onClick={handleLike}
                        className={`group flex gap-2 justify-center py-2 min-w-full cursor-pointer rounded-4xl border-2 border-off-blue-200 
                         ${reacted === "like" ? "bg-off-blue-200 text-dark-blue-900" : "text-off-blue-200 hover:bg-off-blue-200 hover:text-dark-blue-900"}`}
                    >
                        <img
                            src="/src/assets/like-icon.svg"
                            alt="like-button"
                            className={`filter ${reacted === "like"
                                ? "filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]"
                                : "filter-[invert(88%)_sepia(5%)_saturate(2050%)_hue-rotate(166deg)_brightness(100%)_contrast(106%)] group-hover:filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]"
                                }
                                w-6
                                sm:w-7
                                md:w-8`}
                        />
                        <span className="sm:text-xl
                                        md:text-2xl">{likesCount < 2 ? "Like" : "Likes"}</span>
                    </button>
                </div>
                <div className='flex flex-col justify-center items-center gap-2 min-w-[49%]'>
                    <span className='text-sm
                                    sm:text-base
                                    md:text-lg'>{dislikesCount}</span>

                    <button
                        onClick={handleDislike}
                        className={`group flex gap-2 justify-center py-2 min-w-full cursor-pointer rounded-4xl border-2 border-off-blue-200 
                         ${reacted === "dislike" ? "bg-off-blue-200 text-dark-blue-900" : "text-off-blue-200 hover:bg-off-blue-200 hover:text-dark-blue-900"}`}
                    >
                        <img
                            src="/src/assets/dislike-icon.svg"
                            alt="dislike-button"
                            className={`filter ${reacted === "dislike"
                                ? "filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]"
                                : "filter-[invert(88%)_sepia(5%)_saturate(2050%)_hue-rotate(166deg)_brightness(100%)_contrast(106%)] group-hover:filter-[invert(12%)_sepia(65%)_saturate(1494%)_hue-rotate(200deg)_brightness(91%)_contrast(95%)]"
                                }
                                w-6
                                sm:w-7
                                md:w-8`}
                        />
                        <span className="sm:text-xl
                                        md:text-2xl">{dislikesCount < 2 ? "Dislike" : "Dislikes"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Post;