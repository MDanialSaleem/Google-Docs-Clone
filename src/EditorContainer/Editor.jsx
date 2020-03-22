import React, {useMemo, useState} from "react";
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'



export default () =>  {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    }
  ])

  const mykeydown = event => {
      if(event.key === '&') {
          event.preventDefault();
          editor.insertText("and");
      }
  }
  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
        <Editable onKeyDown={mykeydown} />
    </Slate>
  )
}