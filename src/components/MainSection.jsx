import React, { useState, useEffect, useContext } from 'react'
import MakePost from './subComponents/MakePost'
import Post from './subComponents/Post'
import ToggleTabs from "./subComponents/ToggleTabs"
import { idContext, globalRefreshContext, editPostContext } from "../context/context"

const MainSection = () => {
    const userId = useContext(idContext)
    const { globalRefresh } = useContext(globalRefreshContext)
    const { postToEdit } = useContext(editPostContext)
    const [postMade, setPostMade] = useState(false)
    const [posts, setPosts] = useState([])
    const [category, setCategory] = useState("following")

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/post?userId=${userId}&category=${category}`, {
                    method: "GET",
                    credentials: "include"
                });
                const data = await response.json();

                if (data.success) {
                    setPosts(data.posts);
                    // Debug: check whether posts include author profile pictures
                    console.debug('Fetched posts (sample):', data.posts.map(p => ({ id: p._id, authorId: p.author?._id, authorHasProfilePicture: !!(p.author && p.author.profilePicture) })));
                } else {
                    alert("Error fetching posts.");
                }
            } catch {
                alert("Error occurred in sending fetching posts request.");
            }
        };
        fetchPosts();
    }, [category, postMade, globalRefresh])

    return (
        <div className='min-w-[44%] max-w-[44%] flex flex-col gap-4 p-8 bg-off-blue-200 text-dark-blue-900 rounded-4xl max-h-screen'>

            <MakePost postMade={postMade} setPostMade={setPostMade} update={postToEdit.inEditing} postId={postToEdit.postId} content={postToEdit.inEditing ? postToEdit.content : ""} />

            <div className='space-y-4 flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-0 relative'>

                <ToggleTabs
                    options={[
                        { label: "Strangers in Judgement", value: "following" },
                        { label: "My Post", value: "myPosts" }
                    ]}
                    active={category}
                    setActive={setCategory}
                />

                {[...posts].sort((o, n) => {
                    return (new Date(n.createdAt) - new Date(o.createdAt))
                }).map((post) => {
                    return (<Post
                        key={post._id}
                        id={post._id}
                        userId={post.author._id}
                        fullname={post.author.fullname}
                        // username={post.author.username}
                        content={post.content}
                        likes={post.likes}
                        dislikes={post.dislikes}
                        createdAt={new Date(post.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                        profilePicture={post.author?.profilePicture || post.profilePicture}
                        category={category}
                    />)
                })}
            </div>
        </div>
    )
}

export default MainSection
