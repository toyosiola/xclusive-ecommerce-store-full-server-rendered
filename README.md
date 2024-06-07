This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Xclusive Store docs

- A user can add and remove product from Cart either the user is logged in or not
- Only a logged-in user can checkout products, checkout button is hidden from user that is not logged in. A user that is not logged-in is asked to log in before checkout button can be visible.

- Only a logged in user can add product or access the wishlist.

- All products that user adds to cart before logging in is attached to a session, the session is stored in the db while the sessionId is turned to a jwt and stored on the client as cookie
- All products that have been added to (session) cart before a user is logged in is synchronized to user profile during logging-in i.e. the products will be moved from session to normal cart collection. The session is deleted on successful login

## session management

- If a user is logged in, name (first name) and userId is stored in jwt and stored as a cookie.
- If a user is not logged in but has added product to cart, a session is created in the database, the sessionId is stored is jwt as cookie i.e. logged in user jwt contains name and userId while not-logged-in user jwt contains only sessionId

## session verification

- On the server side, the verifySession function is used to authenticate the user session:
  - if there is no existing session i.e. if user did not add any product to cart or user is not logged-in, verifySession will return null
  - if user is not logged but has added a product to cart, that means a session exist. verifySession will verify the jwt and return an object: { isAuth: false, sessionId: string }
  - if user is logged in, verifySession will verify the jwt and return an object: { isAuth: true, userId: string }
- If the jwt in the cookie is not valid, verifySession will throw 401 error. if the user in the jwt is not found in the db, verifySession will throw 404 error. At both error instances, verifySession will delete the cookie on the client (still working on deleting the cookie when verifySession is invoked in a server component as Next.js only allow reading cooking in server components)

## caching

- getUser function is cached to minimize db call at each instance of verifySession. The result is revalidated once a day and when a user is logging out. Should also be revalidated when admin edits the user (future feature)
- getUserWishlist is cached, revalidated when user add or remove product from the wishlist. Also revalidated on logout
- getUserCart is cached, revalidated when user add/remove item from cart or user adjust cart quantity
- featuredProducts displayed in home is cached, auto revalidated once a day. The featured products are sampled at random so that not-the-same products are displayed in home page everyday
- getInitialProducts is cached. It fetches it initial products displayed in product page, it is not revalidated, will be revalidated when admin edit the products in the product collection (this is a future feature). More products are fetched when the user scrolls to the bottom of the product page. The fetching is handled with react query on the client side. The react-query is disabled from automatic fetching on mount which automatically disable it from revalidation.
- searched products is handled on the client side with react-query. it is cached for 30mins with react query on the client side.
