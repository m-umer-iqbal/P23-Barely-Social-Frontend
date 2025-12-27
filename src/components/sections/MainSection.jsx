import React, { useState, useEffect, useContext } from 'react'
import MakePost from '../subComponents/MakePost'
import Post from '../subComponents/Post'
import ToggleTabs from "../subComponents/ToggleTabs"
import { idContext, globalRefreshContext, editPostContext } from "../../context/context"
import Loading from "../subComponents/Loading"
import SuccessOrWarningMessage from "../subComponents/SuccessOrWarningMessage"
import EmptyState from "../subComponents/EmptyState"

const MainSection = () => {
    const [loading, setLoading] = useState(true)
    const userId = useContext(idContext)
    const { globalRefresh } = useContext(globalRefreshContext)
    const { postToEdit } = useContext(editPostContext)
    const [postMade, setPostMade] = useState(false)
    const [posts, setPosts] = useState([])
    const [category, setCategory] = useState("allPosts")
    const [alertType, setAlertType] = useState(null)

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
                    setLoading(false)
                } else {
                    setAlertType({ alert: "error", message: data.message })
                    setLoading(false)
                }
            } catch {
                setAlertType({ alert: "error", message: "Error occurred in sending fetching posts request." })
                setLoading(false)
            }
        };
        fetchPosts()
    }, [category, postMade, globalRefresh])

    const handleTabChange = (newCategory) => {
        setCategory(newCategory);
        setPosts([]);
        setLoading(true);
    };

    return (
        <div className='flex flex-col gap-4 pb-16 bg-off-blue-200 text-dark-blue-900 rounded-4xl h-full min-h-0
                        p-2
                        sm:p-4
                        md:p-5 
                        lg:p-6 lg:min-w-[45vw]
                        xl:p-7
                        2xl:p-8'>
            {alertType && alertType.alert && (
                <SuccessOrWarningMessage alert={alertType.alert} message={alertType.message} onClose={() => setAlertType(null)} />
            )}

            <MakePost postMade={postMade} setPostMade={setPostMade} update={postToEdit.inEditing} postId={postToEdit.postId} content={postToEdit.inEditing ? postToEdit.content : ""} />

            <div className='space-y-4 flex-1 min-h-0 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-0 relative'>

                <ToggleTabs
                    options={[
                        { label: "Strangers", value: "allPosts" },
                        { label: "Following", value: "following" },
                        { label: "My Posts", value: "myPosts" }
                    ]}
                    active={category}
                    setActive={handleTabChange}
                    minWidth={32}
                />

                {loading ? (
                    <Loading />
                ) : posts.length === 0 ? (
                    <EmptyState
                        emoji={
                            category === "allPosts"
                                ? "🌍"
                                : category === "following"
                                    ? "👥"
                                    : "✍️"
                        }
                        title={
                            category === "allPosts"
                                ? "No posts yet"
                                : category === "following"
                                    ? "No posts from people you follow"
                                    : "You haven’t posted anything"
                        }
                        subtitle={
                            category === "allPosts"
                                ? "Be the first one to break the silence."
                                : category === "following"
                                    ? "Follow some people to see their posts here."
                                    : "Share your first thought with the world."
                        }
                    />
                ) : (
                    <div className="space-y-4">
                        {[...posts]
                            .sort((o, n) => new Date(n.createdAt) - new Date(o.createdAt))
                            .map((post) => (
                                <Post
                                    key={post._id}
                                    id={post._id}
                                    userId={post.author._id}
                                    fullname={post.author.fullname}
                                    username={post.author.username}
                                    content={post.content}
                                    likes={post.likes}
                                    dislikes={post.dislikes}
                                    image={post.image}
                                    createdAt={post.createdAt}
                                    updatedAt={post.updatedAt}
                                    profilePicture={post.author?.profilePicture || post.profilePicture}
                                    category={category}
                                />
                            ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MainSection
