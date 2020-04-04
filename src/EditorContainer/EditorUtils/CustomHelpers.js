import { Transforms, Editor } from "slate";
import  StyleConstants from "./StyleConstants";
const LIST_TYPES = ["numbered-list", "bulleted-list", "list-item"];

const CustomHelpers = {
    toggleBlock: (editor, format) => {

        //the headings currently work like bold italic and underline. Meaning that you 
        //have to actually select some text and then press the button to deactivate
        //Howver, the list thing uses the unwrap shit, so it works differently. If you
        //position your cursor anywhere inside a list and press the list again it will
        //convert that into a paraggraph.

        //removes custom font size if set for the heading.
        if (format === StyleConstants.HEADINE_ONE || format === StyleConstants.HEADING_TWO) {
            Editor.removeMark(editor, StyleConstants.FONT_SIZE);
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
                type: StyleConstants.PARAGRAPH
            });
        }
        else {
            if(isList) {
                Transforms.setNodes(editor, {
                    type: StyleConstants.LIST_ITEM
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

    toggleAlignment: (editor, alignment) => {
        Transforms.setNodes(editor, {
            [StyleConstants.ALIGNMENT]: alignment
        });
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
    
    toggleMarksWV: (editor, format, value) => {
        //deals with marks that do have a value.
        Editor.addMark(editor, format, value);
    },

    toggleMark: (editor, format, value = null) => {
        switch (format) {
            case StyleConstants.TEXT_COLOR:
            case StyleConstants.FONT:
            case StyleConstants.FONT_SIZE:
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

    isMarkActive: (editor, format, value = null) => {
        const marks = Editor.marks(editor);
        switch (format) {
            case StyleConstants.TEXT_COLOR:
            case StyleConstants.FONT:
            case StyleConstants.FONT_SIZE:
                if(!value){
                    throw new Error(`Invalid Value passed to 
                    isMarkActive for ${format}`);
                }
                if(marks && !!marks[format]){
                    return marks[format];
                }
                else{
                    return false;
                }
            default:
                return marks ? !!marks[format] : false;
        }
    },

    isAlignmentActive: (editor, alignment) => {
        const [match] = Editor.nodes(editor, {
            match: n => n.alignment === alignment
        });

        return !!match;
    }
};

export default CustomHelpers;
