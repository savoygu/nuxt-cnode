import type { Editor } from '@tiptap/vue-3'
import { NodeSelection } from '@tiptap/pm/state'

/**
 * 判断 mark 是否在 schema 中
 */
export function isMarkInSchema(markName: string, editor: Editor | undefined) {
  if (!editor?.schema) {
    return false
  }
  return editor.schema.spec.marks.get(markName) !== undefined
}

/**
 * 检测当前编辑器中的选择是否为指定类型的节点选择
 */
export function isNodeTypeSelected(editor: Editor | undefined, types: string[] = []) {
  if (!editor || !editor.state.selection) {
    return false
  }

  const selection = editor.state.selection
  if (selection.empty) {
    return false
  }

  if (selection instanceof NodeSelection) {
    const node = selection.node
    return node ? types.includes(node.type.name) : false
  }

  return false
}
