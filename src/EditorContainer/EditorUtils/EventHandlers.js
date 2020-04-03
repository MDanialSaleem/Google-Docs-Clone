import CustomeHelpers from "./CustomHelpers";
import isHotkey from "is-hotkey";


const HOTKEYS = {
    "mod+b": "left-align",
    "mod+i": "center-align",
    "mod+u": "right-align"
};

export default {
    keyDown: (event, editor) => {
        for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                CustomeHelpers.toggleAlignment(editor, mark);
                // CustomeHelpers.toggleMark(editor, mark);
            }
        }
    }
};
