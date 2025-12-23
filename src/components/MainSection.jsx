import React, { useState, useEffect, useContext } from 'react'
import MakePost from './subComponents/MakePost'
import Post from './subComponents/Post'
import ToggleTabs from "./subComponents/ToggleTabs"
import { idContext, globalRefreshContext, editPostContext } from "../context/context"
import Loading from "./subComponents/Loading"
import SuccessOrWarningMessage from "./subComponents/SuccessOrWarningMessage"

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
                    setAlertType({ alert: "success", message: data.message })
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
        <div className='min-w-[44%] max-w-[44%] flex flex-col gap-4 p-8 bg-off-blue-200 text-dark-blue-900 rounded-4xl max-h-screen'>
            {alertType && alertType.alert && (
                <SuccessOrWarningMessage alert={alertType.alert} message={alertType.message} onClose={() => setAlertType(null)} />
            )}
            <MakePost postMade={postMade} setPostMade={setPostMade} update={postToEdit.inEditing} postId={postToEdit.postId} content={postToEdit.inEditing ? postToEdit.content : ""} />

            <div className='space-y-4 flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-0 relative'>

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
                {loading ? <Loading /> : <div className="space-y-4">{[...posts].sort((o, n) => {
                    return (new Date(n.createdAt) - new Date(o.createdAt))
                }).map((post) => {
                    return (<Post
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
                    />)
                })}</div>}
            </div>
        </div>
    )
}

export default MainSection
