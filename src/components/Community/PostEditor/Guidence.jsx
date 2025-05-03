import React from "react";

const Guidence = ({
  isActionBtnGuidence,
  isContentGuidence,
  isTitleGuidence,
  activeTab
}) => {
  return ( activeTab==="edit" &&
    <div className="text-gray-text-60 p-4 rounded-md shadow-md">
      <h3 className="text-white text-lg font-bold mb-3  dark:text-gray-200">
        { isTitleGuidence ? "Writing a Great Post Title" : isContentGuidence ? "Editor Basics" : "Publish tips"}
      </h3>
        {
            isTitleGuidence && <ul className="space-y-3 text-sm">
            <li className="flex">
              <span className="mr-2">•</span>
              <div>
                Think of your post title as a super short (but compelling!)
                description — like an overview of the actual post in one short
                sentence.
              </div>
            </li>
            <li className="flex">
            <span className="mr-2 ">•</span>
            <div>
            Use keywords where appropriate to help ensure people can find your post by search.
            </div>
          </li>
            
          </ul>
        }

        { isContentGuidence &&
            <ul>
            <li className="flex">
            <span className="mr-2 ">•</span>
            <div>
            Use Markdown to write and format posts.
            </div>
          </li>
  
          <li className="flex">
            <span className="mr-2 ">•</span>
            <div>
            Embed rich content such as Tweets, YouTube videos, etc. Use the complete URL: {"{% embed https://... %}"}.
            </div>
          </li>
  
          <li className="flex">
            <span className="mr-2 ">•</span>
            <div>
            In addition to images for the post's content, you can also drag and drop a cover image.
            </div>
          </li>
  
          </ul>
        }
       
      { (!isContentGuidence && !isTitleGuidence) && 
            <ul>
            <li className="flex">
            <span className="mr-2 ">•</span>
            <div>
            Ensure your post has a cover image set to make the most of the home feed and social media platforms.
            </div>
          </li>
  
          <li className="flex">
            <span className="mr-2 ">•</span>
            <div>
            Share your post on social media platforms or with your co-workers or local communities.
            </div>
          </li>
  
          <li className="flex">
            <span className="mr-2 ">•</span>
            <div>
            Ask people to leave questions for you in the comments. It's a great way to spark additional discussion describing personally why you wrote it or why people might find it helpful.
            </div>
          </li>
  
          </ul>
        }
    </div>
  );
};

export default Guidence;
