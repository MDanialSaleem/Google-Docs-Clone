import CustomeHelpers from "./CustomHelpers";
export default {
    keyDown : (event, editor) => {
        if (!event.ctrlKey) {
          return
        }
        switch (event.key) 
        {
          case 'b': 
            event.preventDefault()
            CustomeHelpers.toggleBoldMark(editor)
            break
          default:
            break;
        }
    }
};