// This file contains utility functions for text formatting in a markdown editor.
export const insertFormatting=(text,selectionStart, selectionEnd, prefix, suffix) => {

const beforeText = text.substring(0,selectionStart);
const selected = text.substring (selectionStart, selectionEnd);
const afterText = text.substring(selectionEnd);

const newText = beforeText +prefix + selected +suffix + afterText;

const newCursorPosition = selectionEnd + prefix.length ; // Update the cursor position to account for the added formatting
return{text:newText, newCursorPosition};
};

export const applyBold = (text,selectionStart, selectionEnd) => {
  return insertFormatting(text,selectionStart, selectionEnd, "**", "**");
};

export const applyItalic = (text,selectionStart, selectionEnd) => {
  return insertFormatting(text,selectionStart, selectionEnd, "_", "_");
};

export const applyLink = (text,selectionStart, selectionEnd) =>{
    const linkText = text.substring(selectionStart, selectionEnd) || 'link text';
    return insertFormatting(text,selectionStart, selectionEnd, '[' +linkText + '](' , ')');
};

export const applyOrderedList = (text, selectionStart, selectionEnd) => {
  console.log("start : ", selectionStart, "end: " , selectionEnd);
  const selected = text.substring(selectionStart, selectionEnd);
  console.log("subString: ",text.substring(selectionStart, selectionEnd));
  const lines = selected.split('\n'); // fix here
  const newLines = lines.map((line, i) => `${i + 1}. ${line}`);
  const newSelected = newLines.join('\n');
  
  const result = insertFormatting(text, selectionStart, selectionEnd, '', ''); // fix here
  const updatedText = result.text.replace(selected, newSelected);
  
  return { text: updatedText,newCursorPosition: selectionStart + newSelected.length  }; // important
};

export const applyUnorderList =(text, selectionStart,selectionEnd) =>{
  const selected  = text.substring(selectionStart, selectionEnd);
  const lines = selected.split('\n');
  const newLines = lines.map((line)=>`- ${line}`);
  const newSelected = newLines.join('\n');
  const result = insertFormatting(text, selectionStart, selectionEnd, '', ''); // fix here
  const updatedText = result.text.replace(selected, newSelected);
  
  return { text: updatedText, newCursorPosition: selectionStart + newSelected.length  }; // important
};

export const applyCode = (text, selectionStart, selectionEnd)=>{
  const selected = text.substring(selectionStart, selectionEnd);
  if(selected.includes('\n')){
    return insertFormatting(text,selectionStart, selectionEnd, '```\n', '\n```');
  }else{
    return insertFormatting(text,selectionStart, selectionEnd, '`', '`');
  }
};