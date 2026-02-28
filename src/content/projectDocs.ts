/**
 * Google Doc links with preview images for the Projects page.
 * - docUrl: full Google Doc link (e.g. https://docs.google.com/document/d/YOUR_DOC_ID/edit)
 * - previewImage: path to a screenshot/thumbnail of the doc (e.g. /project-docs/my-doc-preview.png)
 * Add your docs and drop preview images into public/ then reference them here.
 */
export const projectDocs = [
  {
    id: "doc-1",
    title: "Document title",
    docUrl: "https://docs.google.com/document/d/YOUR_DOC_ID/edit",
    previewImage: "/file.svg",
  },
  {
    id: "doc-2",
    title: "Another document",
    docUrl: "https://docs.google.com/document/d/YOUR_DOC_ID/edit",
    previewImage: "/file.svg",
  },
] as const;
