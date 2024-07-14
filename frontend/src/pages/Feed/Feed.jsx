import React, { useContext } from 'react'
import "./../Feed/Feed.css";
import Tweetbox from './Tweet/Tweetbox';
import Post from './Post/Post';
import { UserContext } from '../../App';

const Feed = () => {

  const { posts } = useContext(UserContext);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <Tweetbox />
      {
        posts.map(p => <Post key={p._id} p={p} />)
      }
    </div>
  )
}

export default Feed