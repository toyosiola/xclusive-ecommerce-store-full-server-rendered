### Procedures

#### db

- [x] Install mongoose
- [ ] Install react-intersection-observer, uuid ( or use crypto instead), http-status-codes, react-toastify, bcryptjs, jwt, server-only
- [x] Create local MongoDB server and copy connection string
- [x] Create connectDB function in src/utils/db/connectDB
  - [x] create connectionUrl const that alternates local or remote DB url as per run environment
- [x] Create productSchema with timestamps and compile in src/models/ProductModel

#### mock data

- [x] Generate mock products data, adhere to defined product schema
- [x] Get products images and upload to cloudinary, add image url to each product
- [x] Populate local DB with compiled schema

#### error instances

- [ ] Extend Error constructor, create and export custom:
  - [ ] NotFound error class, 404 status
  - [ ] unauthenticated error class, 401 status
  - [ ] Forbidden error class, 403 status
  - [ ] Server error class, 500 status

#### /layout.js

- [ ] Setup & apply font on html and make it accessible with tailwind classes
- [x] Invoke connectDb func to establish connection with DB
- [ ] Create Nav and Footer UI in /src/components, use usePathname (or electedLayoutSegment) to identify active navLink
- [ ] Render Nav and Footer components in the root layout as shared components
- [ ] Create global-error.js - remember 'use client'
  - [ ] It will also contain shared Nav and Footer just like root layout
  - [ ] It will render error.message or generic error message with status code if available
  - [ ] It will contain a Try again button (reset or router.replace) or link as the case may be
  - [ ] Content of global-error.js is duplicated into error.js except with the html and body tags

#### /page.js

- [ ] Create UI
- [ ] Make all product categories links to /products?<category>
- [ ] Initiate fetching for featured and best selling products. use promise.all. View more should be link to /products?<category>
- [ ] Subcategories should also be link to /products?<category>
- [ ] Optimize as much as feasible. Stream async sections, loading skeleton, db field projections, fetching limit, reduce network round-trips etcetera

#### /products :)

- [ ] Create products folder with page.js
- [ ] pass key prop to overall html element tag, use uuid to generate value
- [ ] use same category links from home
- [ ] use searchParams to get category
- [ ] create filterQuery const, assign empty object
- [ ] If category, add appropriate filter property to the query object
- [ ] Pass queryObject to Product.find. Should return products, numOfProducts fulfilling the criteria and maxPrice. Remember limits, projections
- [ ] Render products with products found
- [ ] Pass numOfProducts and maxPrice to MoreProducts component

- [ ] export number of productsPerPage variable. Should be a number divisible by 2 \* 3 e.g. 48. Pass variable as prop to MoreProducts

  ##### priceLimit input

  - [ ] Price filtering input should be client comp, range type, standalone component
  - [ ] min = 0, max = maxPrice gotten from global state (/ parent).
  - [ ] create currentValue local state, pass maxPrice as initial value
  - [ ] pass currentValue as its value
  - [ ] onChange, update currentValue state
  - [ ] onMouseup, debounce for 1s, create url const, construct url from:
    - [ ] set price value to global state
    - [ ] get pathname from usePathname, make it first part of the url
    - [ ] searchParams part of the url formulation should be put in a function that accept all variables as parameters
    - [ ] get category searchParams as props from parent component, if true, add category to url as urlSearchParams
    - [ ] get value of set price, add to url as urlSearchParams
    - [ ] get sort from global state, if value is not "none", pass sort to url as urlSearchParams
    - [ ] router.replace(url)

  ##### sort input

  - [ ] standalone component, should be select type
  - [ ] have five options: none (default), price-ascending, price-descending, name a-z, name z-a
  - [ ] create currentValue local state, onChange, update local state
  - [ ] import the url formulation func, invoke and pass all parameters

  ##### MoreProducts

  - [ ] create a MoreProducts client component, render it at the bottom of server rendered products
  - [ ] Client component with React fragment enclosure
  - [ ] Import useInView from react intersection observer
  - [ ] Accept productsPerPage prop from parent component
  - [ ] Destructure ref, inView from useInView
  - [ ] create a more Products, loading, and page local state
  - [ ] Create const num of pages, calculate from num of products / num of products per page. Math.ceil
  - [ ] create a useEffect that run once, set numOfProducts and maxPrice to global state
  - [ ] Create a use effect with inView, page dependency
  - [ ] Run fetching in if block, if inView is true and page is not greater than num of pages
  - [ ] Call query string constructor function and add ur api url
  - [ ] [spread former and new products] top update more products state
  - [ ] Set loading before and after fetching
  - [ ] Increase page count after successful loading
  - [ ] Render more products, enclosing html tag should have same styles as products in parent component
  - [ ] Put a div at the bottom of more products as intersection pointer
  - [ ] Put loading that is rendered when fetching

#### products api route

- [ ] get all possible url search params from req url
- [ ] construct db filter query, remember limits and projections. Sort if needed
- [ ] Return fetched products on response

#### /sign-up

- [ ] Create sign-up page and sign-up form (client component)
- [ ] create sign-up server action and return {success: boolean, message: string}
- [ ] Import sign-up server action, import useFormState
- [ ] Form input should have First name, last name, email, password, address (not required). email should be unique to user,
- [ ] Submit button should be in a separate file in components, import useFormStatus
  - [ ] Check for pending, if pending, disable button (aerial-disable)
- [ ] If success, show modal advising to verify mail. Modal should contain button to refresh page or reset form
- [ ] If !success, show error with toast. Check react docs how useFormState works
- [ ] Add frontend validation later
- [ ] In sign-up server action:
  - [ ] Validate required inputs
  - [ ] Check if email hasn't been used
    - [ ] (create a functionality later to check this before form is submitted)
  - [ ] Hash user password (only if password is modified) with Mongoose pre save middleware
  - [ ] Generate verification token with crypto randomBytes, and add to user
  - [ ] Add role to each user, create user, send verification mail and advise to check email
    - [ ] See to proper mongoose validation error handling
  - [ ] If verification email sending failed, delete created user and return error

#### /verify-email

- [ ] get token and email from searchParams
- [ ] get user with email, if !user, error out
- [ ] compare verification tokens, if !valid, error out. Update user verification state if valid
- [ ] generate jwt (create a func for this. server-only)
  - [ ] Generate secret key and store in env. Try this command to generate a secret key: `openssl rand -base64 32` (It should generate a 32 character random string)
  - [ ] token contains user last name, userID, include role only if user is admin. Add token to cookie. Ensure cookie is http only,secured, maxAge stored in env, same Site. Check Next.js docs on auth
- [ ] attach jwt to cookie, return user object with only name for conditional client rendering,
- [ ] redirect home on client

#### /login

- [ ] Create login page and sign-up form (client component)
- [ ] create login server action and return {error: false, message: string}
- [ ] Import login server action, import useFormState
- [ ] Form input should have email, password
- [ ] Submit button should be in a separate file, import useFormStatus
  - [ ] Check for pending, if pending, disable button (aerial-disable)
- [ ] If error, show error with toast. Check react docs how useFormState works
- [ ] If success, redirect home from server
- [ ] Forgot password functionality later
- [ ] In login server action:
  - [ ] Validate required inputs
  - [ ] find user with email, error out where necessary
  - [ ] compare password, error out where necessary
  - [ ] check if user is verified
  - [ ] synchronize session cart with user cart
    - [ ] check if session exist
    - [ ] check user cart, if a product is in user cart and also session cart, update count to session count
    - [ ] if product in session is not in user cart, add it to user cart. delete session
  - [ ] Create token func
  - [ ] May add token refresh / update functionality later on
  - [ ] If successful, return user object with only name for conditional client rendering,
  - [ ] redirect home on client

#### add to wishlist functionality

- [ ] create a cached verifySession server-only func that verifies if user is logged in. Possible return value: null, {isAuth (false), sessionId}, {isAuth (true), name, userId, role}. Possible error throw: 401 (auth issue), 404(user not found), 500 (db errors out)
  - [ ] get session cookie, if !session, return null, if session, verify jwt
    - [ ] if jwt throw error, throw authenticated, delete cookie
  - [ ] if valid, check for userId or sessionId,
  - [ ] if sessionId return {isAuth (false), sessionId}
  - [ ] if userId, check for user in db, if user is true, return {isAuth (true), name, userId, role}
  - [ ] if !user, return 404 user not found , if db error, return 500 an error occurred
- [ ] create add to wishlist server action or manage wishlist (add & remove)
- [ ] import, invoke and await verifySession in try/catch, assign returned value to session,
- [ ] if !session or !session.userId, redirect to login
- [ ] if user is logged in, create a wishlist in the database
- [ ] revalidate path

#### remove from wishlist functionality

- [ ] create a remove from wishlist
- [ ] find and delete, if no product found, return error
- [ ] revalidate path

#### add to cart functionality

- [ ] create a add to cart server action
- [ ] import, invoke and await verifySession in try/catch
- [ ] if/else: if session.isAuth, create item in cart collections attaching user and product
  - [ ] else, get session with id, create session cart object, push to session.cart in sessions collection
- [ ] if !session, create a crypto session token as id
  - [ ] create a session document in sessions collection in db with sessionId, cartArray and add productId and set quantity to provided quantity or 1
  - [ ] sign session with jwt, and add to cookie

#### remove from cart functionality

- [ ] create remove from cart
- [ ] get session from cookie, verify, check for userId or session
- [ ] if user, remove from card collection with user and product id
- [ ] if session, remove from cart in session

#### cart count

- [ ] get and verify session
- [ ] if increase, increase cartQuantity in session or cart as applicable
- [ ] if reduce, reduce cartQuantity in session or cart as applicable

#### /wishlist

- [ ] User should be logged in to see their wishlist
- [ ] Check login status inside page, not middleware.
- [ ] If not logged in, advise to log in with a login page link
- [ ] If logged in, fetch wishlists with userId from wishlists collection. Populate product field, project needed field. Create userId for self if necessary and tie wishlist/cart products to self
- [ ] add to cart from wishlist should be through transaction. check transaction success potential if product not found in wishlist i.e. get product from wishlists collection, add to carts collection, then delete from wishlist. add to cart and wishlist should be done with server action. revalidate path after action
- [ ] move all to cart should also be through transaction and server action. revalidate path after action

  ##### wishlist schema

  - [ ] product: objectId type
  - [ ] user: objectId type
  - [ ] timestamps: ISO

#### /cart

- [ ] cart will be registered to sessions for user not logged in but to carts collection if user is logged in
- [ ] check for access or session token from cookies. Only one should be present, immediately a user is logged in, session cart is synchronized with user and session invalidated
- [ ] For users not logged in:
  - [ ] validate session token, if valid, get populated cart products and render. Project needed fields
- [ ] For logged in users:
  - [ ] validate access token, if valid, get populated cart products from carts collection using userId and render. Project needed fields

#### session schema

- [ ] session (ID): hashed string or objectId
- [ ] cart: [{ product: ObjectId, cartQuantity }]
- [ ] timestamps

#### cart schema

- [ ] product: objectId type
- [ ] user: objectId type
- [ ] cartQuantity
- [ ] timestamps

#### user schema

- [ ] firstName
- [ ] lastName
- [ ] email
- [ ] password (hashed)
- [ ] address (not required)
- [ ] Verification token
- [ ] Email verified
- [ ] token validity period
- [ ] timestamps

#### research on MongoDB search and implement
