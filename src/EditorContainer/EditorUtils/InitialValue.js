import StyleConstants from "./StyleConstants";

const initialValue = [
    {
        type: "paragraph",
        children: [
            {
                text: "Start typing here. ",
                [StyleConstants.FONT]: StyleConstants.FONT_VALUES.ARIAL,
                [StyleConstants.FONT_SIZE]: StyleConstants.FONT_SIZE_VALUES[6],
                [StyleConstants.TEXT_COLOR]: "#000000",
                [StyleConstants.BACKGROUND_COLOR]: "#FFFFFF",
            },
        ],
    },
];

export default initialValue;
