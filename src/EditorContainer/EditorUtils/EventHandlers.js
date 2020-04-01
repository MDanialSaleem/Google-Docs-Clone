import CustomeHelpers from "./CustomHelpers";
import isHotkey from 'is-hotkey'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

export default {
    keyDown : (event, editor) => {
      for (const hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event)) {
          event.preventDefault()
          const mark = HOTKEYS[hotkey]
          CustomeHelpers.toggleMark(editor, mark)
        }
      }
    }
};