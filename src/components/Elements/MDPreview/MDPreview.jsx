import createDOMPurify from 'dompurify';
import marked from 'marked';

const DOMPurify = createDOMPurify(window);

/** @typedef {{ value: string }} MDPreviewProps */

/** @param props {MDPreviewProps} */
export const MDPreview = ({ value = '' }) => {
  return (
    <div
      className="p-2 w-full prose prose-indigo"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(marked(value)),
      }}
    />
  );
};
