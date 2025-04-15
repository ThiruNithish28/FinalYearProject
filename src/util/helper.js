export const parseResponse = (response) => {
    const regex = /```(\w+)?\n([\s\S]*?)```/g;
    let result = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(response)) !== null) {
      // Add text before the code block
      if (lastIndex < match.index) {
        result.push({ type: "text", content: response.slice(lastIndex, match.index) });
      }
      // Add the code block
      result.push({ type: "code", language: match[1] || "javascript", content: match[2] });
      lastIndex = regex.lastIndex;
    }

    // Add remaining text after the last code block
    if (lastIndex < response.length) {
      result.push({ type: "text", content: response.slice(lastIndex) });
    }

    return result;
  };
