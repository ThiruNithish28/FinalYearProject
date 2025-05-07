import { supabase } from "./supabaseClient";

const stopWords = [
  "for",
  "a",
  "the",
  "to",
  "on",
  "in",
  "and",
  "of",
  "at",
  "by",
];
const importantShortWords = ["ai", "js", "go", "c", "c++", "sql"];

// exrtact hastags from the keyword genereate by gemini and remove stop words and duplicates
const extractHastags = (keyword) => {
  const words = keyword.toLowerCase().split(" ");

  const filteredWords = words.filter(
    (word) =>
      (word.length > 2 || importantShortWords.includes(word)) &&
      !stopWords.includes(word)
  );
  // Remove punctuation and duplicates
  const cleanWords = [
    ...new Set(filteredWords.map((w) => w.replace(/[^\w+#]/g, ""))),
  ];
  return cleanWords;
};

// get communtiy posts by tags for the chat module
export const getCommunityPosts = async (keyword) => {
  const tags = extractHastags(keyword);
  if (tags.length === 0) return [];

  const { data, error } = await supabase
    .from("posts")
    .select(
      `*,public_profiles!posts_user_id_fkey1 (
                user_name,
                avatar_url
              )`
    )
    .overlaps("tags", tags)
    .order("created_at", { ascending: false })
    .limit(5);

  if (!error) return data;
  else throw new Error(error.message);
};

export const topContributors = [
  { Dp: "", name: "jhon", points: 100 },
  { Dp: "", name: "ram", points: 90 },
  { Dp: "", name: "kumar", points: 80 },
  { Dp: "", name: "james dev", points: 70 },
  { Dp: "", name: "joseph", points: 60 },
];

export const trendingTags = [
  "guide",
  "beginner",
  "tips",
  "roadmap",
  "nodejS",
  "javascript",
  "python",
];

export const topTags = [
  {
    name: "ai",
    tags: ["python", "machine learning", "deep learning", "cnn"],
  },
  {
    name: "java",
    tags: ["oops", "Dsa", "recursion", "tips"],
  },
  {
    name: "javascript",
    tags: ["oops", "Dsa", "eventloop", "callback"],
  },
  {
    name: "react",
    tags: ["useState", "hooks", "performance", "state management"],
  },
];

export const posts = [
  {
    userDp: "",
    userName: "John Doe",
    createdAt: "2022-01-01",
    title: "Lorem ipsum dolor sit amet",
    tags: ["React", "JavaScript"],
    type: "roadMap",
    reactionCount: 10,
    commentCount: 5,
    viewCount: 100,
  },
  {
    userDp: "",
    userName: "Jane Smith",
    createdAt: "2022-02-01",
    title: "Consectetur adipiscing elit",
    tags: ["CSS", "HTML"],
    reactionCount: 20,
    commentCount: 10,
    viewCount: 200,
  },
  {
    userDp: "",
    userName: "Alice Johnson",
    createdAt: "2022-03-01",
    title: "Mauris vulputate gravida sem",
    tags: ["NodeJS", "React"],
    reactionCount: 15,
    commentCount: 8,
    viewCount: 150,
  },
  {
    userDp: "",
    userName: "Bob Brown",
    createdAt: "2022-04-01",
    title: "Pellentesque semper in purus nec aliquam",
    tags: ["JavaScript", "CSS"],
    reactionCount: 25,
    commentCount: 12,
    viewCount: 250,
  },
];

export const post = {
  cover_img:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png",
  public_profiles: {
    user_name: "John Doe",
    avatar_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png",
    current_role: "Senior Software Engineer @ TechCorp",
    skills: ["javascript", "react", "web development", "nodejs"],
    bio: "Full-stack developer specializing in React and Node.js. Love creating tools for developers.",
    location: "New York, USA",
    social: {
      github: "https://github.com/",
      twitter: "",
    },
    created_at: "2022-01-01",
  },
  created_at: "2022-01-01",
  title: "Lorem ipsum dolor sit amet",
  tags: ["React", "JavaScript"],
  type: "roadMap",
  reactionCount: 10,
  upvote_count: 20,
  comment_count: 5,
  view_count: 100,
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate gravida sem, vel iaculis orci mattis ac. Pellentesque semper in purus nec aliquam. Donec condimentum ullamcorper orci iaculis dignissim. Aenean lorem neque, fringilla sed tellus in, laoreet feugiat nibh. Aenean porta mauris accumsan nunc aliquam fermentum.",
};
