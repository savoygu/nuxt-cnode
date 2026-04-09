import type { ModelRef, TemplateRef } from 'vue'
import { Highlight } from '@tiptap/extension-highlight'
import { Image } from '@tiptap/extension-image'
import { TaskItem, TaskList } from '@tiptap/extension-list'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TextAlign } from '@tiptap/extension-text-align'
import { Typography } from '@tiptap/extension-typography'
import { Selection } from '@tiptap/extensions'
import StarterKit from '@tiptap/starter-kit'
import { useEditor } from '@tiptap/vue-3'
import { ImageUploadNode } from '../components/tiptap-node/image-upload-node/image-upload-node-extension'

export const [useProvideEditorStore, useEditorStore] = createInjectionState((config: {
  editorRef: TemplateRef<HTMLElement>
  modelValue: ModelRef<string | undefined>
}) => {
  const { editorRef, modelValue } = config

  const editor = useEditor({
    content: modelValue.value,
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      Superscript,
      Subscript,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Typography,
      Selection,
      Image,
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: error => console.error('Upload failed:', error),
      }),
    ],
    editorProps: {
      attributes: {
        class: 'simple-editor',
      },
    },
    onUpdate({ editor }) {
      modelValue.value = editor.getHTML()
    },
  })

  const appendTo = computed(() => {
    return editorRef.value || document.body
  })

  watch(modelValue, (value) => {
    const isSame = editor.value?.getHTML() === value
    if (isSame) {
      return
    }

    editor.value?.commands.setContent(value ?? '')
  })

  onBeforeUnmount(() => {
    editor.value?.destroy()
  })

  return { editorRef, editor, appendTo, canCommand: editor.value?.can }
})
