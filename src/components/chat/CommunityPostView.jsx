import React from 'react'
import PostCard from '../Community/Post/PostCard'

const CommunityPostView = ({posts}) => {
  return (
    <div className='lg:w-[860px] flex flex-wrap gap-2.5 p-2 justify-center'>
        {posts?.length > 1 ? posts?.map((post) => (
          <div className="border border-gray-border  rounded-xl overflow-hidden w-full" key={post.id}>
            <PostCard  post={post} communityName={post.community_name} />
            </div>
        )) : <div>no posts available..</div>}
    </div>
  )
}

export default CommunityPostView