import { Transforms, Editor } from "slate";
const LIST_TYPES = ["numbered-list", "bulleted-list"];

const CustomHelpers = {
    toggleBlock: (editor, format) => {
        const isActive = CustomHelpers.isBlockActive(editor, format);
        const isList = LIST_TYPES.includes(format);

        Transforms.unwrapNodes(editor, {
            match: n => LIST_TYPES.includes(n.type),
            split: true
        });

        Transforms.setNodes(editor, {
            type: isActive ? "paragraph" : isList ? "list-item" : format
        });

        if (!isActive && isList) {
            const block = { type: format, children: [] };
            Transforms.wrapNodes(editor, block);
        }
    },

    toggleMarksWOV: (editor, format) => {
        //this deals with marks without any value such as bold italic etc.
        const isActive = CustomHelpers.isMarkActive(editor, format);
        if (isActive) {
            Editor.removeMark(editor, format);
        } else {
            Editor.addMark(editor, format, true);
        }
    },

    isMarkActiveWOV: (editor, format) => {
        const marks = Editor.marks(editor);
        return marks ? marks[format] === true : false;
    },

    toggleMarksWV: (editor, format, value) => {
        //deals with marks that do have a value.
        console.log(format, value);
        Editor.addMark(editor, format, value);
    },

    toggleMark: (editor, format, value = null) => {
        switch (format) {
            case "color":
            case "font":
            case "fontsize":
                CustomHelpers.toggleMarksWV(editor, format, value);
                break;
            default:
                CustomHelpers.toggleMarksWOV(editor, format);
        }
    },

    isBlockActive: (editor, format) => {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === format
        });

        return !!match;
    },

    isMarkActive: (editor, format, value) => {
        const marks = Editor.marks(editor);
        return marks ? !!marks[format] : false;
    }
};

export default CustomHelpers;
