import React from 'react'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';


const MarkdownPreview = ({content}) => {
  return (
    <div className="prose prose-headings:text-white prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none text-white lg:px-16 md:px-12 rounded-md">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
      components={{
        // Override default components to handle special cases
        a: ({ node, ...props }) => (
          <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600" />
        ),
        code: ({ node, inline, ...props }) => (
          inline ? 
            <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5" {...props} /> :
            <code className="block bg-gray-100 dark:bg-gray-800 rounded p-4 my-4" {...props} />
        ),
        pre: ({ node, ...props }) => (
          <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 my-4 overflow-x-auto" {...props} />
        ),
        img: ({ node, ...props }) => (
          <img {...props} className="rounded-lg shadow-md max-w-full h-auto" />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 italic" {...props} />
        ),
      }}
    >
      {content || '*No content to preview*'}
    </ReactMarkdown>
  </div>
  )
}

export default MarkdownPreview