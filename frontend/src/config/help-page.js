// User-facing help content. Kept here (not in HelpView) so it is easy to find
// and update without touching the component that renders it.

export const helpPage = {
  title: 'About App Photo Assistant',
  lede:
    'A personal photo assistant for managing and sorting your photo library — the management side of tools like Lightroom (its Library module), ACDSee or Adobe Bridge: everything except pixel editing.',
  sections: [
    {
      title: 'What it does',
      paragraphs: [
        'It is not about a single task. It brings rating, tagging, people, GPS and capture-time corrections together so you can curate a collection efficiently.',
      ],
      list: [
        { strong: 'Assess & rate', text: ' photos to surface your best shots.' },
        { strong: 'Flag / pick', text: ' the valuable, important photos — the ones that tell the story of a journey.' },
        { strong: 'Tag', text: ' photos with keywords and organize them into collections / journeys.' },
        { strong: 'Correct capture time', text: ' when the camera clock was wrong (including timezone shifts) — without ever destroying the original value.' },
        { strong: 'Assign GPS / location', text: ' where the camera did not record it.' },
        { strong: 'Manage people', text: ' — detect and recognize who is in each photo, and check that everyone on a trip is fairly represented.' },
      ],
    },
    {
      title: 'Non-destructive by design',
      paragraphs: [
        'Originals are never modified. Ratings, flags, tags and capture-time overrides live in a catalog and can optionally be written back later as XMP sidecars.',
      ],
    },
    {
      title: 'Built for large libraries',
      list: [
        'Fast, smooth browsing even on very large libraries.',
        'Two-tier cache — small thumbnails for the grid, larger previews for the single-photo view.',
        'Predictive prefetch — the next photos are ready before you ask for them.',
        'Fast indexing and a virtualized grid — only what you see is rendered.',
      ],
    },
  ],
}
