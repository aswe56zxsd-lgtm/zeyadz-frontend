'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback } from 'react';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const addImage = useCallback(() => {
    const url = window.prompt('أدخل رابط الصورة:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('أدخل الرابط:', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const buttons = [
    {
      icon: 'B',
      title: 'عريض',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      className: 'font-bold',
    },
    {
      icon: 'I',
      title: 'مائل',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      className: 'italic',
    },
    {
      icon: 'S',
      title: 'يتوسطه خط',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
      className: 'line-through',
    },
    { type: 'divider' },
    {
      icon: 'H1',
      title: 'عنوان 1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
    },
    {
      icon: 'H2',
      title: 'عنوان 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
    },
    {
      icon: 'H3',
      title: 'عنوان 3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive('heading', { level: 3 }),
    },
    { type: 'divider' },
    {
      icon: '•',
      title: 'قائمة نقطية',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
    },
    {
      icon: '1.',
      title: 'قائمة مرقمة',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
    },
    {
      icon: '"',
      title: 'اقتباس',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
    },
    {
      icon: '</>',
      title: 'كود',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive('codeBlock'),
    },
    { type: 'divider' },
    {
      icon: '🔗',
      title: 'رابط',
      action: setLink,
      isActive: editor.isActive('link'),
    },
    {
      icon: '🖼️',
      title: 'صورة',
      action: addImage,
    },
    { type: 'divider' },
    {
      icon: '↩️',
      title: 'تراجع',
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: '↪️',
      title: 'إعادة',
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50 rounded-t-lg">
      {buttons.map((button, index) => {
        if (button.type === 'divider') {
          return <div key={index} className="w-px h-6 bg-gray-300 mx-1" />;
        }
        return (
          <button
            key={index}
            type="button"
            onClick={button.action}
            className={`px-2 py-1 rounded text-sm hover:bg-gray-200 transition-colors ${
              button.isActive ? 'bg-gray-200 text-primary-600' : 'text-gray-700'
            } ${button.className || ''}`}
            title={button.title}
          >
            {button.icon}
          </button>
        );
      })}
    </div>
  );
};

export default function Editor({ content, onChange, placeholder = 'ابدأ الكتابة هنا...' }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none',
      },
    },
  });

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="min-h-[400px]" />
    </div>
  );
}
