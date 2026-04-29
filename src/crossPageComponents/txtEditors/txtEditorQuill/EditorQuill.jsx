import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const RichTextEditorQuill = ({ value, onChange, placeholder }) => {
  const containerRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !quillRef.current) {
      // Initialize Quill
      quillRef.current = new Quill(containerRef.current, {
        theme: 'snow',
        placeholder: placeholder || 'Write something...',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'], 
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'clean'] 
          ]
        }
      });

      quillRef.current.on('text-change', () => {
        const html = quillRef.current.root.innerHTML;
        onChange(html);
      });
    }

    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value || '';
    }
  }, [value, onChange, placeholder]);

  return (
    <div className="border rounded bg-white">
      <div ref={containerRef} style={{ minHeight: '150px' }} />
    </div>
  );
};

export default RichTextEditorQuill;