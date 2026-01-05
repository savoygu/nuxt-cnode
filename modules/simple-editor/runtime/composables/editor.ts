import type { ModelRef } from 'vue'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TextAlign } from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import { useEditor } from '@tiptap/vue-3'

export const [useProvideEditorStore, useEditorStore] = createInjectionState((modelValue: ModelRef<string | undefined>) => {
  const editor = useEditor({
    content: modelValue.value,
    extensions: [
      StarterKit,
      Superscript,
      Subscript,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
    onUpdate({ editor }) {
      modelValue.value = editor.getHTML()
    },
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

  return { editor, canCommand: editor.value?.can }
})
