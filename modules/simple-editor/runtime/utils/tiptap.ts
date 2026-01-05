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

/**
 * 检测扩展是否可用
 */
export function isExtensionAvailable(eidtor: Editor | undefined, extensionNames: string | string[]) {
  if (!eidtor) {
    return false
  }
  const names = Array.isArray(extensionNames) ? extensionNames : [extensionNames]
  const found = names.find(name => eidtor.extensionManager.extensions.some(ext => ext.name === name))
  if (!found) {
    console.warn(
      `None of the extensions [${names.join(', ')}] were found in the editor schema. Ensure they are included in the editor configuration.`,
    )
  }
  return found
}
