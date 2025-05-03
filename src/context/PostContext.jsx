export const PostContextProvider = ({ children }) => ()=> {
        const [userPosts, setUserPosts] = useState([]); // for user posts
        const [userCommunities, setUserCommunities] = useState([]); // for user communities
        const [userCommunitiesPosts, setUserCommunitiesPosts] = useState([]); // for user communities posts
           const [allPost, setAllPost] = useState([]); // for all posts
            const [activePostId, setActivePostId] = useState(null); // for active post id
            const [activePost, setActivePost] = useState(null); // for active post
}