const range = (start, stop, step) => {
    return Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
};


// const fontsizes = range(2,50,2).reduce((res, val) => {
//     res[val] = val;
//     return res;
// }, {},);

export default {
    BOLD: "bold",
    ITALIC: "italic",
    UNDERLINE: "underline",
    HEADINE_ONE: "heading-one",
    HEADING_TWO: "heading-two",
    NUMBERED_LIST: "numbered-list",
    BULLETTED_LIST: "bulleted-list",
    ALIGNMENT: "alignment",
    ALIGNMENT_VALUES: {
        ALIGN_RIGHT: "align-right",
        ALIGN_LEFT: "align-left",
        ALIGN_CENTER: "align-center",
    },
    TEXT_COLOR: "color",
    BACKGROUND_COLOR: "background-color",
    FONT: "font",
    FONT_VALUES: {
        ARIAL : 'Arial',
        TIMESNEWROMAN: 'Times New Roman',
        MONOSPACE: 'Lucida Console',
        IMPACT: "Impact"
    },
    FONT_SIZE: "fontsize",
    FONT_SIZE_VALUES: range(8,50,2),
    PARAGRAPH: "paragraph",
    LIST_ITEM: "list-item",
}