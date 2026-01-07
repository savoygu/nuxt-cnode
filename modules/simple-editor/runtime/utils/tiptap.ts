import type { Node as TiptapNode } from '@tiptap/pm/model'
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
 * 检测节点是否在 schema 中
 */
export function isNodeInSchema(nodeName: string, editor: Editor | undefined) {
  if (!editor?.schema) {
    return false
  }
  return editor.schema.spec.nodes.get(nodeName) !== undefined
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

/**
 * 检测位置是否有效
 */
export function isValidPosition(pos: number | null | undefined): pos is number {
  return typeof pos === 'number' && pos >= 0
}

/**
 * 获取指定位置的节点
 */
export function findNodeAtPosition(editor: Editor, position: number) {
  try {
    const node = editor.state.doc.nodeAt(position)
    if (!node) {
      console.warn(`No node found at position ${position}`)
      return null
    }
    return node
  }
  catch (error) {
    console.error(`Error getting node at position ${position}:`, error)
    return null
  }
}

/**
 * 获取指定位置的节点和位置
 */
export function findNodePosition(props: {
  editor: Editor | null
  node?: TiptapNode | null
  nodePos?: number | null
}): { pos: number, node: TiptapNode } | null {
  const { editor, node, nodePos } = props

  if (!editor || !editor.state?.doc)
    return null

  // Zero is valid position
  const hasValidNode = node !== undefined && node !== null
  const hasValidPos = isValidPosition(nodePos)

  if (!hasValidNode && !hasValidPos) {
    return null
  }

  // First search for the node in the document if we have a node
  if (hasValidNode) {
    let foundPos = -1
    let foundNode: TiptapNode | null = null

    editor.state.doc.descendants((currentNode, pos) => {
      // TODO: Needed?
      // if (currentNode.type && currentNode.type.name === node!.type.name) {
      if (currentNode === node) {
        foundPos = pos
        foundNode = currentNode
        return false
      }
      return true
    })

    if (foundPos !== -1 && foundNode !== null) {
      return { pos: foundPos, node: foundNode }
    }
  }

  // If we have a valid position, use findNodeAtPosition
  if (hasValidPos) {
    const nodeAtPos = findNodeAtPosition(editor, nodePos!)
    if (nodeAtPos) {
      return { pos: nodePos!, node: nodeAtPos }
    }
  }

  return null
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
