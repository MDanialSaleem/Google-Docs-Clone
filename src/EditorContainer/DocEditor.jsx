import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import { Editor, Transforms, createEditor } from 'slate'
import { withHistory } from 'slate-history'

import CustomElements from "./EditorUtils/CustomElements";
import initialValue from "./EditorUtils/InitialValue";
import EventHandlers from './EditorUtils/EventHandlers'




const RichTextExample = () => {
  const [value, setValue] = useState(initialValue)
  const renderElement = useCallback(props => <CustomElements.Element {...props} />, [])
  const renderLeaf = useCallback(props => <CustomElements.Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={event => EventHandlers.keyDown(event, editor)}
      />
    </Slate>
  )
}

export default RichTextExample
