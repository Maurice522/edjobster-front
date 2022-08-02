import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { makeStyles } from '@mui/styles';
import { EditorState } from 'draft-js';

import { convertToHTML } from 'draft-convert';

const useStyles = makeStyles({
  richTextWrapper: {
    border: '1px solid rgba(145, 158, 171, 0.56)',
    minHeight: '310px',
  },
});

const RichTextEditer = (props) => {
  // const classes = useStyles();
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  // const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();

  }
  const convertContentToHTML = () => {
    const currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    // setConvertedContent(currentContentAsHTML);
    onChangeHandle(currentContentAsHTML)
  }

  const onChangeHandle = (data) => {
    props.onChange(data)
  }


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
          suggestions:
            props.variableData.map((item) => {
              return { text: item.name, value: item.value.slice(1), url: item.value.slice(1) }
            })
        }
        }
        hashtag={{}}
      />

      {/* <Editor
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        mention={{
          separator: ' ',
          trigger: '@',
          suggestions: [
            { text: 'APPLE', value: 'apple', url: 'apple' },
            { text: 'BANANA', value: 'banana', url: 'banana' },
            { text: 'CHERRY', value: 'cherry', url: 'cherry' },
            { text: 'DURIAN', value: 'durian', url: 'durian' },
            { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
            { text: 'FIG', value: 'fig', url: 'fig' },
            { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
            { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
          ],
        }}
        hashtag={{}}
      /> */}
    </>
  );
};

export default RichTextEditer;
