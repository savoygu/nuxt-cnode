/// <reference types="codemirror" />

declare function Editor(options: Editor.Options): void

declare class Editor<TElement = HTMLElement> {
  constructor(options: Editor.Options<TElement>)

  element: TElement
  options: Editor.Options<TElement>
  codemirror: CodeMirror.Editor

  toolbar: Record<string, HTMLAnchorElement | HTMLElement>

  private _rendered: TElement

  /**
   * Render editor to the given element.
   */
  render(el?: TElement): void
  createToolbar(items: Toolbar[]): HTMLDivElement
  createStatusbar(items: string[]): HTMLDivElement
  /**
   * Get or set the text content.
   */
  value(val?: any): any

  /**
   * Bind instance methods for exports.
   */
  toggleBold(): void
  toggleItalic(): void
  toggleBlockquote(): void
  toggleUnOrderedList(): void
  toggleOrderedList(): void
  drawLink(): void
  drawImage(): void
  undo(): void
  redo(): void
  togglePreview(): void
  toggleFullScreen(): void
}

declare namespace Editor {
  interface Toolbar {
    name: string
    action: any
  }

  type Toolbars = (string | Toolbar)[]

  interface Options<TElement> {
    element: TElement
    toolbar?: false | Toolbar[]
    status?: false | string[]
    actions?: CodeMirror.CommandActions
    shortcuts?: Record<string, (editor: Editor) => void>
  }

  let toolbar: Toolbars

  /**
   * Default markdown render.
   */
  function markdown(text: any): any
  function toggleBold(editor: Editor): void
  function toggleItalic(editor: Editor): void
  function toggleBlockquote(editor: Editor): void
  function toggleUnOrderedList(editor: Editor): void
  function toggleOrderedList(editor: Editor): void
  function drawLink(editor: Editor): void
  function drawImage(editor: Editor): void
  function undo(editor: Editor): void
  function redo(editor: Editor): void
  function togglePreview(editor: Editor): void
  function toggleFullScreen(editor: Editor): void
}

declare let toolbar: Editor.Toolbars
