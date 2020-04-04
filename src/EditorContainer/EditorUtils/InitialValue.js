import Fonts from "./Fonts";
import StyleConstants from "./StyleConstants";


const initialValue = [
    {
      type: 'paragraph',
      children: [
        { text: 'Henlo fren. Start typing here. ', [StyleConstants.FONT]: Fonts.Arial, fontsize: "15" },
      ],
    }
];

export default initialValue;