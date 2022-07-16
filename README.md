This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run locally, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The main page shows a list of books with title, author, description, and image. But this will be blank until you add books! Press the `Add book` button to open the form to fill out book information. After you've filled out the info, press save and you will be redirected back to the list of books to see your latest addition. Delete books as you see fit to get the ultimate collection to show to friends and family!

`pages/index.tsx` and `add.tsx` are the core of the app with styles in `styles/Home.module.css`

This is a relatively barebones solution but future work could include adding form validation (Formik?), testing (React Testing Library could be a natural fit), more robust styling including responsive design (styled-components), handling authorization in a more secure manner, adding sorting/filtering of books, the ability to share collections, etc. As always, prioritization of business value should drive the prioritzation of engineering efforts.

Deployed version is available [https://mmhmm-books-mkosowsk.vercel.app/](here).
