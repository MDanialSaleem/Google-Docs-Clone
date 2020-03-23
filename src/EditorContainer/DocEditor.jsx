import React, { useCallback, useMemo, useState } from "react";
import { createEditor } from 'slate'; //basis slate functions. things like helpers, transforms.
import { Slate, Editable, withReact } from 'slate-react'; //what makes slate work with react.
import CustomRenderers from "./EditorUtils/CustomRenderers"; //custom renderers that i developed.
import EventHandlers from "./EditorUtils/EventHandlers"; //event handlers.
import InitialValue from "./EditorUtils/InitialValue"; //initial value of text.

//might seem superfluous to keep all of this in separate files but over time I expect these
//to become really complex, hence.


const DocEditor = () => {
  const elementRenderer = useCallback(CustomRenderers.elementRenderer, [])
  const leadRenderer = useCallback(CustomRenderers.leafRenderer, [])
  //useMemo because uh, otherwise things get hecked.
  const editor = useMemo(() => withReact(createEditor()), []); 
  const [value, setValue] = useState([{...InitialValue}]);
  const keyDownHandler = event => EventHandlers.keyDown(event, editor);

  
  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable renderElement={elementRenderer} renderLeaf={leadRenderer} onKeyDown={keyDownHandler}/>
    </Slate>
  )
};

export default DocEditor;