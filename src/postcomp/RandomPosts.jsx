import React, { useState, useEffect } from 'react';
import PostDetails from './PostDetails';
import './randomposts.css';
import { post } from "../Rest";

const RandomPosts = (props) => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollHeight - scrollTop <= clientHeight+1) {
      fetchMorePosts();
    }
  };

  const fetchMorePosts = async () => {

    setIsLoading(true);
    const newPosts = await post("post/fetch-posts");
    setAllPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMorePosts()

    window.addEventListener('scroll', handleScroll);
  }, []);
  const handleloadmore =async()=>{
    fetchMorePosts()
  }
  return (<>
    <div className={`random-posts  ${props.isSidebarActive?"post-list-onsiderbar":""}`}>
      {allPosts.length > 0 &&
        allPosts.map((post, index) => (
          post.posts.length > 0 &&
          post.posts.map((p, i) => (
            <PostDetails key={i} post={post.posts[i]} />
          ))
        ))}

      {isLoading && <p className='loadmore' >Loading...</p> }
      {!isLoading && <button onClick={handleloadmore} className='loadmore'>Load More ...</button>}
    </div>
        </>
  );
};

export default RandomPosts;
