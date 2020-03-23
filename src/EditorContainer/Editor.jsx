// Import React dependencies.
import React, { useEffect, useCallback, useMemo, useState } from "react";
// Import the Slate editor factory.
import { createEditor, Transforms, Editor, Text } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';



const MyEditor = () => {

  // Define our own custom set of helpers.
const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true,
    })

    return !!match
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    })

    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    )
  },
 }

  const CodeElement = props => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
  };
  
  const Leaf = props => {
    return (
      <span
        {...props.attributes}
        style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
      >
        {props.children}
      </span>
    )
  }

  const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
  };
  
  const renderer = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])
  
  //useMemo because uh, otherwise things get hecked.
  //editor happens to be the top level object here. within it are nodes
  //nodes can have children etc.
  const editor = useMemo(() => withReact(createEditor()), []);

  // Add the initial value when setting up our state.
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);
  
  const keyDownHandler = event => {
    if (!event.ctrlKey) {
      return
    }

    // Replace the `onKeyDown` logic with our new commands.
    switch (event.key) 
    {
      case '`': 
        event.preventDefault()
        CustomEditor.toggleCodeBlock(editor)
        break
      case 'b': 
        event.preventDefault()
        CustomEditor.toggleBoldMark(editor)
        break
      default:
        console.log("Bhar mein jao tbf");

    }
  }
  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable renderElement={renderer} renderLeaf={renderLeaf} onKeyDown={keyDownHandler}/>
    </Slate>
  )
};

export default MyEditor;