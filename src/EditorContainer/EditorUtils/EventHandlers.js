import CustomeHelpers from "./CustomHelpers";
import isHotkey from "is-hotkey";
import StyleConstants from "./StyleConstants";

const HOTKEYS = {
    "mod+b": StyleConstants.ALIGNMENT_VALUES.ALIGN_LEFT,
    "mod+i": StyleConstants.ALIGNMENT_VALUES.ALIGN_CENTER,
    "mod+u": StyleConstants.ALIGNMENT_VALUES.ALIGN_RIGHT
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
