import CustomeHelpers from "./CustomHelpers";
import isHotkey from "is-hotkey";
import StyleConstants from "./StyleConstants";

const HOTKEYS = {
    "mod+b": StyleConstants.BOLD,
    "mod+i": StyleConstants.ITALIC,
    "mod+u": StyleConstants.UNDERLINE,
};

export default {
    keyDown: (event, editor) => {
        for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                CustomeHelpers.toggleMark(editor, mark);
            }
        }
    },
};
