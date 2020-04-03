import { Transforms, Editor } from "slate";
const LIST_TYPES = ["numbered-list", "bulleted-list", "list-item"];

const CustomHelpers = {
    toggleBlock: (editor, format) => {

        //the headings currently work like bold italic and underline. Meaning that you 
        //have to actually select some text and then press the button to deactivate
        //Howver, the list thing uses the unwrap shit, so it works differently. If you
        //position your cursor anywhere inside a list and press the list again it will
        //convert that into a paraggraph.

        //removes custom font size if set for the heading.
        if (format === "heading-one" || format === "heading-two") {
            Editor.removeMark(editor, "fontsize");
        }

        //if the selection has lists unwrap it. look at the paragraph above for more 
        //explanation on this.
        Transforms.unwrapNodes(editor, {
            match: n => LIST_TYPES.includes(n.type),
            split: true
        });

        const isActive = CustomHelpers.isBlockActive(editor, format);
        const isList = LIST_TYPES.includes(format);

        if (isActive) {
            Transforms.setNodes(editor, {
                type: "paragraph"
            });
        }
        else {
            if(isList) {
                Transforms.setNodes(editor, {
                    type: "list-item"
                });
                const block = { type: format, children: [] };
                Transforms.wrapNodes(editor, block);
            }
            else{
                Transforms.setNodes(editor, {
                    type: format
                });
            }

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
        return marks ? !!marks[format] : false;
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
        switch (format) {
            case "color":
            case "font":
            case "fontsize":
                break;
            default:
                return CustomHelpers.isMarkActiveWOV(editor, format);
        }
    }
};

export default CustomHelpers;
