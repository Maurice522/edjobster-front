import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { makeStyles } from '@mui/styles';
import { EditorState, Modifier } from 'draft-js';

const useStyles = makeStyles({
  richTextWrapper: {
    border: '1px solid rgba(145, 158, 171, 0.56)',
    minHeight: '310px',
  },
});

const RichTextEditer = (props) => {
  const classes = useStyles();

  return (
    <>
      <Editor
        wrapperClassName={classes.richTextWrapper}
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        {...props}
        toolbarCustomButtons={[
          <button
            onClick={() => {
              const { editorState, onChange } = props;
              const contentState = Modifier.replaceText(
                editorState.getCurrentContent(),
                editorState.getSelection(),
                '⭐',
                editorState.getCurrentInlineStyle()
              );
              onChange(EditorState.push(editorState, contentState, 'insert-characters'));
            }}
          >
            saif
          </button>,
        ]}
      />
    </>
  );
};

export default RichTextEditer;
