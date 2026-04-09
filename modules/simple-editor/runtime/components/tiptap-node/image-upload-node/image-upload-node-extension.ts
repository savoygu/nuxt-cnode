import type { NodeType } from '@tiptap/core'
import type { Component } from 'vue'
import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import ImageUploadNodeComponent from './ImageUploadNode.vue'

export type UploadFunction = (
  file: File,
  onProgress?: (event: { progress: number }) => void,
  abortSignal?: AbortSignal,
) => Promise<string>

export interface ImageUploadNodeOptions {
  type?: string | NodeType | undefined
  accept?: string
  limit?: number
  maxSize?: number
  upload?: UploadFunction
  onSuccess?: (url: string, file: File) => void
  onError?: (error: Error, file: File) => void
  HTMLAttributes?: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageUpload: {
      setImageUploadNode: (options?: ImageUploadNodeOptions) => ReturnType
    }
  }
}

export const ImageUploadNode = Node.create<ImageUploadNodeOptions>({
  name: 'imageUpload',

  group: 'block',

  draggable: true,

  selectable: true,

  atom: true,

  addOptions() {
    return {
      type: 'image',
      accept: 'image/*',
      limit: 1,
      maxSize: 0, // 5 * 1024 * 1024, // 5MB
      upload: undefined,
      onError: undefined,
      onSuccess: undefined,
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      accept: {
        default: this.options.accept,
      },
      limit: {
        default: this.options.limit,
      },
      maxSize: {
        default: this.options.maxSize,
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="image-upload"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes ?? {}, HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(ImageUploadNodeComponent as Component)
  },

  addCommands() {
    return {
      setImageUploadNode: options => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        })
      },
    }
  },

  /**
   * Adds Enter key handler to trigger the upload component when it's selected.
   */
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { selection } = editor.state
        const { nodeAfter } = selection.$from

        if (
          nodeAfter
          && nodeAfter.type.name === 'imageUpload'
          && editor.isActive('imageUpload')
        ) {
          const nodeEl = editor.view.nodeDOM(selection.$from.pos)
          if (nodeEl && nodeEl instanceof HTMLElement) {
            // Since NodeViewWrapper is wrapped with a div, we need to click the first child
            const firstChild = nodeEl.firstChild
            if (firstChild && firstChild instanceof HTMLElement) {
              firstChild.click()
              return true
            }
          }
        }
        return false
      },
    }
  },
})
