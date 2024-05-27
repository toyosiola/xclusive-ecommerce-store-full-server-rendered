### Procedures

#### db

- [x] Install mongoose
- [x] Install react-intersection-observer, uuid ( or use crypto instead), http-status-codes, react-toastify, bcryptjs, jwt, server-only
- [x] Create local MongoDB server and copy connection string
- [x] Create connectDB function in src/utils/db/connectDB
  - [x] create connectionUrl const that alternates local or remote DB url as per run environment
- [x] Create productSchema with timestamps and compile in src/models/ProductModel

#### mock data

- [x] Generate mock products data, adhere to defined product schema
- [x] Get products images and upload to cloudinary, add image url to each product
- [x] Populate local DB with compiled schema

#### error instances

- [x] Extend Error constructor, create and export custom:
  - [x] NotFound error class, 404 status
  - [x] unauthenticated error class, 401 status
  - [x] Forbidden error class, 403 status
  - [x] Server error class, 500 status

#### /layout.js

- [x] Setup & apply font on html and make it accessible with tailwind classes
- [x] Invoke connectDb func to establish connection with DB
- [x] Create Nav and Footer UI in /src/components, use usePathname (or selectedLayoutSegment) to identify active navLink
- [x] Render Nav and Footer components in the root layout as shared components
- [x] Create global-error.js - remember 'use client'
  - [x] It will also contain shared Nav and Footer just like root layout
  - [x] It will render error.message or generic error message with status code if available
  - [x] It will contain a Try again button (reset or router.replace) or link as the case may be
  - [x] Content of global-error.js is duplicated into error.js except with the html and body tags

#### /page.js

- [x] Create UI
- [x] Make all product categories links to /products?<category> : flash sales, all main categories, all sub categories, best_selling
- [x] Initiate fetching for featured and best selling products. use promise.all. View more should be link to /products?<category>
- [x] Subcategories should also be link to /products?<category>
- [x] Optimize as much as feasible. Stream async sections, loading skeleton, db field projections, fetching limit, reduce network round-trips etcetera

#### /products :)

- [x] Create products folder with page.js
- [x] pass key prop to overall html element tag, use uuid to generate value
- [x] use same category links from home
- [x] use searchParams to get category
- [x] create filterQuery const, assign empty object
- [x] If category, add appropriate filter property to the query object
- [x] Pass queryObject to Product.find. Should return products, numOfProducts fulfilling the criteria and maxPrice. Remember limits, projections
- [x] Render products with products found
- [x] Pass numOfProducts and maxPrice to MoreProducts component
- [x] export number of productsPerPage variable. Should be a number divisible by 2 \* 3 e.g. 48. Pass variable as prop to MoreProducts

  ##### priceLimit input

  - [x] Price filtering input should be client comp, range type, standalone component
  - [x] min = 0, max = maxPrice gotten from global state (/ parent).
  - [x] create currentValue local state, pass maxPrice as initial value
  - [x] pass currentValue as its value
  - [x] onChange, update currentValue state
  - [x] onMouseup, debounce for 1s, create url const, construct url from:
    - [x] set price value to global state
    - [x] get pathname from usePathname, make it first part of the url
    - [x] searchParams part of the url formulation should be put in a function that accept all variables as parameters
    - [x] get category searchParams as props from parent component, if true, add category to url as urlSearchParams
    - [x] get value of set price, add to url as urlSearchParams
    - [x] get sort from global state, if value is not "none", pass sort to url as urlSearchParams
    - [x] router.replace(url)

  ##### sort input

  - [x] standalone component, should be select type
  - [x] have five options: none (default), price-ascending, price-descending, name a-z, name z-a
  - [x] create currentValue local state, onChange, update local state
  - [x] import the url formulation func, invoke and pass all parameters

  ##### MoreProducts

  - [x] create a MoreProducts client component, render it at the bottom of server rendered products
  - [x] Client component with React fragment enclosure
  - [x] Import useInView from react intersection observer
  - [x] Accept productsPerPage prop from parent component
  - [x] Destructure ref, inView from useInView
  - [x] create a more Products, loading, and page local state
  - [x] Create const num of pages, calculate from num of products / num of products per page. Math.ceil
  - [x] create a useEffect that run once, set numOfProducts and maxPrice to global state
  - [x] Create a use effect with inView, page dependency
  - [x] Run fetching in if block, if inView is true and page is not greater than num of pages
  - [x] Call query string constructor function and add ur api url
  - [x] [spread former and new products] top update more products state
  - [x] Set loading before and after fetching
  - [x] Increase page count after successful loading
  - [x] Render more products, enclosing html tag should have same styles as products in parent component
  - [x] Put a div at the bottom of more products as intersection pointer
  - [x] Put loading that is rendered when fetching
  - [x] Show error toast if error

#### products api route

- [x] get all possible url search params from req url
- [x] construct db filter query, remember limits and projections. Sort if needed
- [x] Return fetched products on

#### single product page

#### /sign-up

- [x] Create sign-up page and sign-up form (client component)
- [x] create sign-up server action and return {success: boolean, message: string}
- [x] Import sign-up server action, import useActionState
- [x] Form input should have First name, last name, email, password, address (not required). email should be unique to user,
- [x] Submit button should be in a separate file in components, import useFormStatus
  - [x] Check for pending, if pending, disable button
- [x] If success, show modal advising to verify mail. Modal should contain button to refresh page or reset form
- [x] If !success, show error with toast. Check react docs how useFormState works
- [ ] Add frontend validation later
- In sign-up server action:
  - [x] Validate required inputs
  - [x] Check if email hasn't been used
    - [ ] (create a functionality later to check this before form is submitted)
  - [x] Hash user password (only if password is modified) with Mongoose pre save middleware
  - [x] Generate verification token with crypto randomBytes, and add to user
  - [x] Add role to each user, create user
    - [x] See to proper mongoose validation error handling
  - [x] send verification mail and advise to check email
  - [x] If verification email sending failed, delete created user and return error

#### /verify-email

- [x] get token and email from searchParams
- [x] get user with email, if !user, error out
- [x] compare verification tokens, if !valid, error out. Update user verification state if valid
- [x] generate jwt (create a func for this. server-only)
  - [x] token contains user last name, userId, role. Add token to cookie. Ensure cookie is http only,secured, maxAge stored in env, same Site. Check Next.js docs on auth
- [x] attach jwt to cookie, return user object with only name for conditional client rendering,
- [x] redirect home on client

#### /login

- [x] Create login page and sign-up form (client component)
- [x] create login server action and return {error: false, message: string}
- [x] Import login server action, import useFormState
- [x] Form input should have email, password
- [x] Submit button should be in a separate file, import useFormStatus
  - [x] Check for pending, if pending, disable button
- [x] If error, show error with toast. Check react docs how useActionState works
- [ ] Forgot password functionality later
- In login server action:

  - [x] Validate required inputs
  - [x] find user with email, error out where necessary
  - [x] compare password, error out where necessary
  - [x] check if user is verified
  - synchronize session cart with user cart:
    - [x] check if session exist
    - [x] check user cart, if a product is in user cart and also session cart, give precedence to session
    - [x] if product in session is not in user cart, add it to user cart. delete session
  - [x] Create token func
  - [ ] May add token refresh / update functionality later on
  - [x] If successful, return user object with only name for conditional client rendering,
  - [x] redirect home on client
  - [x] conditional rendering of login

#### logout

#### add to wishlist functionality

- [x] create a cached verifySession server-only func that verifies if user is logged in. Possible return value: null, {isAuth (false), sessionId}, {isAuth (true), name, userId, role}. Possible error throw: 401 (auth issue), 404(user not found), 500 (db errors out)
  - [x] get session cookie, if !session, return null, if session, verify jwt
    - [x] if jwt throw error, throw authenticated, delete cookie
  - [x] if valid, check for userId or sessionId,
  - [x] if sessionId return {isAuth (false), sessionId}
  - [x] if userId, check for user in db (throw 500 if db errors out), if user is true, return {isAuth (true), name, userId, role}
  - [x] if !user, return 404 user not found , if db error, return 500 an error occurred
- [x] create add to wishlist server action or manage wishlist (add & remove)
- [x] import, invoke and await verifySession in try/catch, assign returned value to session,
- [x] if !session or !session.userId, redirect to login
- [x] if user is logged in, create a wishlist in the database
- [x] revalidate tag

#### remove from wishlist functionality

- [x] create a remove from wishlist
- [x] find and delete, if no product found, return error
- [x] revalidate path

#### add to cart functionality

- [x] create a add to cart server action
- [x] import, invoke and await verifySession in try/catch
- [x] if/else: if session.isAuth, create item in cart collections attaching user and product
  - [x] else, get session with id, create session cart object, push to session.cart in sessions collection
- if !session:
  - [x] create a session document in sessions collection with cart as Array of objects containing product and set quantity to provided quantity or 1
  - [x] sign session with jwt, and add to cookie
  - [x] revalidate tags for session and user

#### remove from cart functionality

- [x] create remove from cart
- [x] get session from cookie, verify, check for userId or session
- [x] if user, remove from card collection with user and product id
- [x] if session, remove from cart in session

#### cart count

- [x] get and verify session
- [x] if increase, increase cartQuantity in session or cart as applicable
- [x] if reduce, reduce cartQuantity in session or cart as applicable

#### /wishlist

- [ ] User should be logged in to see their wishlist
- [ ] Check login status inside page, not middleware.
- [ ] If not logged in, advise to log in with a login page link
- [ ] If logged in, fetch wishlists with userId from wishlists collection. Populate product field, project needed field. Create userId for self if necessary and tie wishlist/cart products to self
- [ ] add to cart from wishlist should be through transaction. check transaction success potential if product not found in wishlist i.e. get product from wishlists collection, add to carts collection, then delete from wishlist. add to cart and wishlist should be done with server action. revalidate path after action
- [ ] move all to cart should also be through transaction and server action. revalidate path after action

  ##### wishlist schema

  - [x] product: objectId type
  - [x] user: objectId type
  - [x] timestamps: ISO

#### /cart

- [ ] cart will be registered to sessions for user not logged in but to carts collection if user is logged in
- [ ] check for access or session token from cookies. Only one should be present, immediately a user is logged in, session cart is synchronized with user and session invalidated
- [ ] For users not logged in:
  - [ ] validate session token, if valid, get populated cart products and render. Project needed fields
- [ ] For logged in users:
  - [ ] validate access token, if valid, get populated cart products from carts collection using userId and render. Project needed fields

#### session schema

- [x] \_id: objectId
- [x] cart: [{ product: ObjectId, cartQuantity }]
- [x] timestamps

#### cart schema

- [x] product: objectId type
- [x] user: objectId type
- [x] cartQuantity
- [x] timestamps

#### user schema

- [x] firstName
- [x] lastName
- [x] email
- [x] password (hashed)
- [x] address (not required)
- [x] Verification token
- [x] Email verified
- [x] password token validity period
- [x] timestamps

#### research on MongoDB search and implement

#### to do

- [x] remove revalidation from home
- [ ] rename all react components to jsx
- [ ] cache featured products get function, revalidate in 3 days
- [ ] enforce that a maximum of 100 items can be added to cart for not-logged-in
- [ ] Implement "add all to cart" functionality in wishlist page
- [ ] create indexes for all db query
- [ ] look into refreshing logged-in user sessions
- [ ] all pages/ actions that redirect to login, redirect back to the actual page after login-in (e.g. add to wishlist)
- [ ] Check error "Cookies can only be modified in a Server Action or Route Handler" because verifySession wants to delete cookie sometimes in server component
- add user reviews to purchased product
- add admin panel for products and user management
- use mongodb transaction to delete and create cart items during login
- delete unused dormant session from db after 7
- work on out of stock product not to be displayed in product list
