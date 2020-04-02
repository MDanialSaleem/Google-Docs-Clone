import {Transforms, Editor} from "slate";
const LIST_TYPES = ['numbered-list', 'bulleted-list']

const CustomHelpers = {
  toggleBlock : (editor, format) => {
    const isActive = CustomHelpers.isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)
  
    Transforms.unwrapNodes(editor, {
      match: n => LIST_TYPES.includes(n.type),
      split: true,
    })
  
    Transforms.setNodes(editor, {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    })
  
    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  },
  
  toggleMark : (editor, format, value = null) => {
    const isActive = CustomHelpers.isMarkActive(editor, format)
  
    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, format === "color" ? value : true)
    }
  },
  
  isBlockActive : (editor, format) => {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === format,
    })
  
    return !!match
  },
  
  isMarkActive : (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? !!marks[format] : false
  }
}

export default CustomHelpers;