PHAMNS PERSONAL WEBSITE — FLAT FILES, NO FOLDERS TO UPLOAD

MENU: Home | Research by topics | Publications by date | Teaching | Blog and Note

IMPORTANT: You do not have to edit any HTML to update content or add a blog post.
All files are in ONE directory; GitHub can upload them together without folders.

1. DOWNLOAD AND UNZIP the package on your computer.
2. GitHub > repository phamns/phamns.github.io > Code > Add file > Upload files.
3. Select ALL files from the unzipped directory (not the .zip itself).
4. Commit changes to main.
5. Settings > Pages > Source: Deploy from a branch; Branch: main; Folder: /(root).
6. Keep the empty file .nojekyll at the repository root to disable Jekyll.
   GitHub Pages can still show its normal deployment workflow in Actions.
7. If old .github/workflows/ files are in the repository, remove those custom
   Jekyll workflows separately to avoid misleading failing Action runs.

TO EDIT (IN GITHUB WEB EDITOR):
- Home: content--home.md
- Research by topics: content--research-by-topics.md
- Publications by date: content--publication-by-date.md
- Teaching: content--teaching.md
- Blog and Note: content--blog.md

TO ADD A NEW POST:
- GitHub > Add file > Create new file > name: post--my-new-note.md
- Copy/edit the text in NEW_POST_TEMPLATE.md, and Commit changes.
- Open content--blog.md, add a link: [My new note](post.html?slug=my-new-note)
- Commit changes. No HTML or terminal commands are needed.

HOW THIS WORKS:
- Existing HTML pages provide a static fallback. When the browser loads, site.js
  reads and renders the matching root Markdown source to show your edits.
- Markdown parsing uses a pinned external CDN; mathematical formula display uses MathJax CDN.
  An internet connection is required for the live Markdown updates and math typesetting.
- Content was migrated from a prior WordPress export. Please review external URLs.
- HTML pages are generated snapshots and should not be edited manually.
