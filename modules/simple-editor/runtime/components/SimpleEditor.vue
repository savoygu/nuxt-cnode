<script setup lang="ts">
import { EditorContent } from '@tiptap/vue-3'

const modelValue = defineModel<string>()
const { editor } = useProvideEditorStore(modelValue)
</script>

<template>
  <div class="simple-editor">
    <TiptapToolbar v-if="editor">
      <TiptapSpacer />

      <TiptapToolbarGroup>
        <TiptapUndoRedoButton action="undo" />
        <TiptapUndoRedoButton action="redo" />
      </TiptapToolbarGroup>

      <TiptapToolbarSeparator />

      <TiptapToolbarGroup>
        <TiptapMarkButton type="bold" />
        <TiptapMarkButton type="italic" />
        <TiptapMarkButton type="strike" />
        <TiptapMarkButton type="code" />
        <TiptapMarkButton type="underline" />
        <!-- <button
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
          @click="editor.chain().focus().toggleBold().run()"
        >
          bold
        </button> -->
      </TiptapToolbarGroup>

      <TiptapToolbarSeparator />

      <TiptapToolbarGroup>
        <TiptapMarkButton type="superscript" />
        <TiptapMarkButton type="subscript" />
      </TiptapToolbarGroup>

      <TiptapToolbarSeparator />

      <!-- <button
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        italic
      </button>
      <button
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        strike
      </button>
      <button
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
        @click="editor.chain().focus().toggleCode().run()"
      >
        code
      </button>
      <button @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </button>
      <button @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </button>
      <button
        :class="{ 'is-active': editor.isActive('paragraph') }"
        @click="editor.chain().focus().setParagraph().run()"
      >
        paragraph
      </button>
      <button
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        h1
      </button>
      <button
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        h2
      </button>
      <button
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        h3
      </button>
      <button
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      >
        h4
      </button>
      <button
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      >
        h5
      </button>
      <button
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      >
        h6
      </button>
      <button
        :class="{ 'is-active': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        bullet list
      </button>
      <button
        :class="{ 'is-active': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        ordered list
      </button>
      <button
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        code block
      </button>
      <button
        :class="{ 'is-active': editor.isActive('blockquote') }"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        blockquote
      </button>
      <button @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button>
      <button @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </button>
      <button
        :disabled="!editor.can().chain().focus().undo().run()"
        @click="editor.chain().focus().undo().run()"
      >
        undo
      </button>
      <button
        :disabled="!editor.can().chain().focus().redo().run()"
        @click="editor.chain().focus().redo().run()"
      >
        redo
      </button> -->
    </TiptapToolbar>
    <EditorContent :editor="editor" class="mx-auto flex size-full max-w-[648px] flex-1 flex-col" />
  </div>
</template>

<style>
.simple-editor {
  /******************
  Colors variables
  ******************/

  /* Gray alpha (light mode) */
  --tt-gray-light-a-50: rgba(56, 56, 56, 0.04);
  --tt-gray-light-a-100: rgba(15, 22, 36, 0.05);
  --tt-gray-light-a-200: rgba(37, 39, 45, 0.1);
  --tt-gray-light-a-300: rgba(47, 50, 55, 0.2);
  --tt-gray-light-a-400: rgba(40, 44, 51, 0.42);
  --tt-gray-light-a-500: rgba(52, 55, 60, 0.64);
  --tt-gray-light-a-600: rgba(36, 39, 46, 0.78);
  --tt-gray-light-a-700: rgba(35, 37, 42, 0.87);
  --tt-gray-light-a-800: rgba(30, 32, 36, 0.95);
  --tt-gray-light-a-900: rgba(29, 30, 32, 0.98);

  /* Gray (light mode) */
  --tt-gray-light-50: rgba(250, 250, 250, 1);
  --tt-gray-light-100: rgba(244, 244, 245, 1);
  --tt-gray-light-200: rgba(234, 234, 235, 1);
  --tt-gray-light-300: rgba(213, 214, 215, 1);
  --tt-gray-light-400: rgba(166, 167, 171, 1);
  --tt-gray-light-500: rgba(125, 127, 130, 1);
  --tt-gray-light-600: rgba(83, 86, 90, 1);
  --tt-gray-light-700: rgba(64, 65, 69, 1);
  --tt-gray-light-800: rgba(44, 45, 48, 1);
  --tt-gray-light-900: rgba(34, 35, 37, 1);

  /* Gray alpha (dark mode) */
  --tt-gray-dark-a-50: rgba(232, 232, 253, 0.05);
  --tt-gray-dark-a-100: rgba(231, 231, 243, 0.07);
  --tt-gray-dark-a-200: rgba(238, 238, 246, 0.11);
  --tt-gray-dark-a-300: rgba(239, 239, 245, 0.22);
  --tt-gray-dark-a-400: rgba(244, 244, 255, 0.37);
  --tt-gray-dark-a-500: rgba(236, 238, 253, 0.5);
  --tt-gray-dark-a-600: rgba(247, 247, 253, 0.64);
  --tt-gray-dark-a-700: rgba(251, 251, 254, 0.75);
  --tt-gray-dark-a-800: rgba(253, 253, 253, 0.88);
  --tt-gray-dark-a-900: rgba(255, 255, 255, 0.96);

  /* Gray (dark mode) */
  --tt-gray-dark-50: rgba(25, 25, 26, 1);
  --tt-gray-dark-100: rgba(32, 32, 34, 1);
  --tt-gray-dark-200: rgba(45, 45, 47, 1);
  --tt-gray-dark-300: rgba(70, 70, 73, 1);
  --tt-gray-dark-400: rgba(99, 99, 105, 1);
  --tt-gray-dark-500: rgba(124, 124, 131, 1);
  --tt-gray-dark-600: rgba(163, 163, 168, 1);
  --tt-gray-dark-700: rgba(192, 192, 195, 1);
  --tt-gray-dark-800: rgba(224, 224, 225, 1);
  --tt-gray-dark-900: rgba(245, 245, 245, 1);

  /* Brand colors */
  --tt-brand-color-50: rgba(239, 238, 255, 1);
  --tt-brand-color-100: rgba(222, 219, 255, 1);
  --tt-brand-color-200: rgba(195, 189, 255, 1);
  --tt-brand-color-300: rgba(157, 138, 255, 1);
  --tt-brand-color-400: rgba(122, 82, 255, 1);
  --tt-brand-color-500: rgba(98, 41, 255, 1);
  --tt-brand-color-600: rgba(84, 0, 229, 1);
  --tt-brand-color-700: rgba(75, 0, 204, 1);
  --tt-brand-color-800: rgba(56, 0, 153, 1);
  --tt-brand-color-900: rgba(43, 25, 102, 1);
  --tt-brand-color-950: hsla(257, 100%, 9%, 1);

  /* Green */
  --tt-color-green-inc-5: hsla(129, 100%, 97%, 1);
  --tt-color-green-inc-4: hsla(129, 100%, 92%, 1);
  --tt-color-green-inc-3: hsla(131, 100%, 86%, 1);
  --tt-color-green-inc-2: hsla(133, 98%, 78%, 1);
  --tt-color-green-inc-1: hsla(137, 99%, 70%, 1);
  --tt-color-green-base: hsla(147, 99%, 50%, 1);
  --tt-color-green-dec-1: hsla(147, 97%, 41%, 1);
  --tt-color-green-dec-2: hsla(146, 98%, 32%, 1);
  --tt-color-green-dec-3: hsla(146, 100%, 24%, 1);
  --tt-color-green-dec-4: hsla(144, 100%, 16%, 1);
  --tt-color-green-dec-5: hsla(140, 100%, 9%, 1);

  /* Yellow */
  --tt-color-yellow-inc-5: hsla(50, 100%, 97%, 1);
  --tt-color-yellow-inc-4: hsla(50, 100%, 91%, 1);
  --tt-color-yellow-inc-3: hsla(50, 100%, 84%, 1);
  --tt-color-yellow-inc-2: hsla(50, 100%, 77%, 1);
  --tt-color-yellow-inc-1: hsla(50, 100%, 68%, 1);
  --tt-color-yellow-base: hsla(52, 100%, 50%, 1);
  --tt-color-yellow-dec-1: hsla(52, 100%, 41%, 1);
  --tt-color-yellow-dec-2: hsla(52, 100%, 32%, 1);
  --tt-color-yellow-dec-3: hsla(52, 100%, 24%, 1);
  --tt-color-yellow-dec-4: hsla(51, 100%, 16%, 1);
  --tt-color-yellow-dec-5: hsla(50, 100%, 9%, 1);

  /* Red */
  --tt-color-red-inc-5: hsla(11, 100%, 96%, 1);
  --tt-color-red-inc-4: hsla(11, 100%, 88%, 1);
  --tt-color-red-inc-3: hsla(10, 100%, 80%, 1);
  --tt-color-red-inc-2: hsla(9, 100%, 73%, 1);
  --tt-color-red-inc-1: hsla(7, 100%, 64%, 1);
  --tt-color-red-base: hsla(7, 100%, 54%, 1);
  --tt-color-red-dec-1: hsla(7, 100%, 41%, 1);
  --tt-color-red-dec-2: hsla(5, 100%, 32%, 1);
  --tt-color-red-dec-3: hsla(4, 100%, 24%, 1);
  --tt-color-red-dec-4: hsla(3, 100%, 16%, 1);
  --tt-color-red-dec-5: hsla(1, 100%, 9%, 1);

  /* Basic colors */
  --white: rgba(255, 255, 255, 1);
  --black: rgba(14, 14, 17, 1);
  --transparent: rgba(255, 255, 255, 0);

  /******************
  Shadow variables
  ******************/

  /* Shadows Light */
  --tt-shadow-elevated-md:
    0px 16px 48px 0px rgba(17, 24, 39, 0.04), 0px 12px 24px 0px rgba(17, 24, 39, 0.04),
    0px 6px 8px 0px rgba(17, 24, 39, 0.02), 0px 2px 3px 0px rgba(17, 24, 39, 0.02);

  /**************************************************
       Radius variables
    **************************************************/

  --tt-radius-xxs: 0.125rem; /* 2px */
  --tt-radius-xs: 0.25rem; /* 4px */
  --tt-radius-sm: 0.375rem; /* 6px */
  --tt-radius-md: 0.5rem; /* 8px */
  --tt-radius-lg: 0.75rem; /* 12px */
  --tt-radius-xl: 1rem; /* 16px */

  /**************************************************
       Transition variables
    **************************************************/

  --tt-transition-duration-short: 0.1s;
  --tt-transition-duration-default: 0.2s;
  --tt-transition-duration-long: 0.64s;
  --tt-transition-easing-default: cubic-bezier(0.46, 0.03, 0.52, 0.96);
  --tt-transition-easing-cubic: cubic-bezier(0.65, 0.05, 0.36, 1);
  --tt-transition-easing-quart: cubic-bezier(0.77, 0, 0.18, 1);
  --tt-transition-easing-circ: cubic-bezier(0.79, 0.14, 0.15, 0.86);
  --tt-transition-easing-back: cubic-bezier(0.68, -0.55, 0.27, 1.55);

  /******************
  Contrast variables
  ******************/

  --tt-accent-contrast: 8%;
  --tt-destructive-contrast: 8%;
  --tt-foreground-contrast: 8%;
}
</style>

<style>
.simple-editor {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.tiptap-toolbar-group {
  display: flex;
  align-items: center;
  gap: 2px;
}

.tiptap-separator {
  flex-shrink: 0;
  width: 1px;
  height: 24px;
  background-color: #e5e5e5;
}

.tiptap-button {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.15;
  height: 32px;
  min-width: 32px;
  border: none;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  transition-property: background, color, opacity;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.46, 0.03, 0.52, 0.96);
}

/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }
}
</style>
