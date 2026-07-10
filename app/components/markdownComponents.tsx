import type { Components } from 'react-markdown';

// Shared react-markdown renderer overrides.
// Links inside post content open in a new tab so readers don't lose the page.
export const markdownComponents: Components = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
};
