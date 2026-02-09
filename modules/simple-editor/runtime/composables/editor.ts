import type { ModelRef, TemplateRef } from 'vue'
import { Highlight } from '@tiptap/extension-highlight'
import { TaskItem, TaskList } from '@tiptap/extension-list'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TextAlign } from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import { useEditor } from '@tiptap/vue-3'

export const [useProvideEditorStore, useEditorStore] = createInjectionState((config: {
  editorRef: TemplateRef<HTMLElement>
  modelValue: ModelRef<string | undefined>
}) => {
  const { editorRef, modelValue } = config

  const editor = useEditor({
    content: modelValue.value,
    extensions: [
      StarterKit,
      Superscript,
      Subscript,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
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
