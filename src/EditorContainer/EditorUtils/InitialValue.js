import StyleConstants from "./StyleConstants";


const initialValue = [
    {
      type: 'paragraph',
      children: [
        { 
          text: 'Henlo fren. Start typing here. ',
          [StyleConstants.FONT]: StyleConstants.FONT_VALUES.IMPACT,
          [StyleConstants.FONT_SIZE]: StyleConstants.FONT_SIZE_VALUES[6]
        },
      ],
    }
];

export default initialValue;