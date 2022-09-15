import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { makeStyles } from '@mui/styles';
import { EditorState, convertFromRaw } from 'draft-js';
// import {  } from 'draft-js';

import { convertToHTML } from 'draft-convert';

const useStyles = makeStyles({
  richTextWrapper: {
    border: '1px solid rgba(145, 158, 171, 0.56)',
    minHeight: '310px',
  },
});

const RichTextEditer = (props) => {
  console.log("props values transferred",props)
  const content = {
    entityMap: {},
    blocks: [
      {
        key: '637gr',
        text: props.body,
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
  };

  const contentState = convertFromRaw(content);
  // const classes = useStyles();
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentState));
  // const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    const currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    // setConvertedContent(currentContentAsHTML);
    onChangeHandle(currentContentAsHTML);
  };

  const onChangeHandle = (data) => {
    props.onChange(data);
  };

  return (
    <>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        mention={{
          separator: ' ',
          trigger: '$',
          suggestions: props?.variableData?.map((item) => ({ text: item.name, value: item.value.slice(1), url: item.value.slice(1) })),
        }}
        hashtag={{}}
      />
    </>
  );
};

export default RichTextEditer;
