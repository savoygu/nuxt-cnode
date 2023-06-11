export const useEditor = () => {
  useHead({
    link: [
      {
        rel: 'stylesheet',
        href: 'https://static.gusaifei.com/editor/editor.css'
        // href: '//lab.lepture.com/editor/editor.css'
      }
    ],
    script: [
      {
        // src: '//lab.lepture.com/editor/editor.js',
        src: 'https://static.gusaifei.com/editor/editor.js'
        // defer: 'true'
      },
      {
        // src: '//lab.lepture.com/editor/marked.js',
        src: 'https://static.gusaifei.com//editor/marked.js'
        // defer: 'true'
      }
    ]
  })
}
