/**
 * Google Doc links with preview images for the Projects page.
 * - docUrl: full Google Doc link (e.g. https://docs.google.com/document/d/YOUR_DOC_ID/edit)
 * - previewImage: path to a screenshot/thumbnail of the doc (e.g. /project-docs/my-doc-preview.png)
 * Add your docs and drop preview images into public/ then reference them here.
 */
export const projectDocs = [
  {
    id: "pentest-plus",
    title: "Pentest +",
    docUrl: "https://docs.google.com/document/d/1yRflovKm9R-j3dz0DIXXsVXkkRsQz4MmO39L-ohdj04/edit?usp=sharing",
    previewImage: "/project-docs/pentest-preview.png",
  },
  {
    id: "cysa-plus",
    title: "CySA+",
    docUrl: "https://docs.google.com/document/d/1NIYrfh5lBDo7sarflfNvP0-hmvMDIUoMtwGRLpYwGS4/edit?usp=sharing",
    previewImage: "/project-docs/cysa-preview.png",
  },
] as const;
