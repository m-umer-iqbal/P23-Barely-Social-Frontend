import React, { useState, useEffect, useContext } from 'react'
import MakePost from './subComponents/MakePost'
import Post from './subComponents/Post'
import FollowedAndUnfollowedNavbar from "./subComponents/FollowedAndUnfollowedNavbar"

const MainSection = () => {
    const [posts, setPosts] = useState([])
    const [category, setCategory] = useState("followed")

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log("Fetching posts for category:", category);
                const response = await fetch("http://localhost:3000/post", {
                    method: "GET",
                    credentials: "include"
                });
                const data = await response.json();

                if (data.success) {
                    console.log(data.posts)
                    console.log(category)
                    setPosts(data.posts);
                } else {
                    alert("Error fetching posts.");
                }
            } catch {
                alert("Error occurred.");
            }
        };
        fetchPosts();
    }, [category])

    return (
        <div className='min-w-[44%] max-w-[44%] flex flex-col gap-4 p-8 bg-off-blue-200 text-dark-blue-900 rounded-4xl max-h-screen'>
            <MakePost />
            <div className='space-y-4 flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-0 relative'>
                <FollowedAndUnfollowedNavbar setCategory={setCategory} />
                {[...posts].sort((o, n) => {
                    return (new Date(n.createdAt) - new Date(o.createdAt))
                }).map((post) => {
                    return (<Post
                        key={post._id}
                        fullname={post.author.fullname}
                        // username={post.author.username}
                        content={post.content}
                        likes={post.likes.length}
                        dislikes={post.dislikes.length}
                        createdAt={new Date(post.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    />)
                })}
            </div>
        </div>
    )
}

export default MainSection
