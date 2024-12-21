# Travlr - Vacation Booking

## Architecture

- Compare and contrast the types of frontend development you used in your full
  stack project, including Express HTML, JavaScript, and the single-page
  application (SPA).
  In this course, we started out by building a static website served with an
  Express backend. The backend used the handlebars templating engine to render
  the HTML on the server side before sending it back to the client. We then connected
  a self-hosted MongoDB database to the API to start serving dynamic data. Finally,
  we built an admin dashboard using Angular, which uses client-side rendering to
  create a SPA.

- Why did the backend use a NoSQL MongoDB database?
  MongoDB is a good choice for this project because it offers flexibility in
  the structure of data. Different vacation packages may require different
  fields, which would add bloat to a traditional relational database.
  MongoDB also has the advantage of fast development time, which helps get the
  product to the market more efficiently.

## Functionality

- How is JSON different from JavaScript and how does JSON tie together the
  frontend and backend development pieces?
  JSON is not a programming language, it is a notation for specifying objects.
  JavaScript is a programming language that runs in the browser, and since the
  release of Node.js, it now has a more flexible runtime environment that
  doesn't require a browser. JSON ties together the frontend and backend
  because JavaScript recognizes JSON as objects, so it is convenient to send
  data in JSON format over the network. As a result, all popular backend
  languages have support for recognizing the JSON format.

- Provide instances in the full stack process when you refactored code to
  improve functionality and efficiencies, and name the benefits that come from
  reusable user interface (UI) components.
  The first major refactor came when we stopped using static JSON files to
  pull data from. We set up a MongoDB database and connected to it using the
  Mongoose ODM. This allowed us to easily update and retrieve the data
  programmatically, at the same time increasing scalability and efficiency.
  Reusable UI components allow code to follow Don't Repeat Yourself (DRY)
  practices. It also helps to maintain consistency between parent
  user-interface components that reuse the same child component. It is the
  same as creating a variable or constant that can be reused anywhere that
  it's in scope, so that if the variable needs to be changed, it only needs to
  be changed in one place.

## Testing

- Methods for request and retrieval necessitate various types of API testing of
  endpoints, in addition to the difficulties of testing with added layers of security.
  Explain your understanding of methods, endpoints, and security in a full
  stack application.
  For the four CRUD operations create, read, update, delete, there are HTTP methods
  that correspond to each of them. To create a document, a POST request is
  made. To read a document, a GET request is made. To update a document, a PUT
  request is made. Finally, to delete a document, a DELETE request is made. An
  endpoint in an API is mapped to a URI and an HTTP method. A _router_
  intercepts requests and calls the appropriate endpoint. For example, if a
  POST request is made to a server, the router running on that server
  intercepts the request, inspects it, and calls the appropriate route, passing
  along the data it received. Middleware can be injected between routes, which
  are functions that can perform some intermediate transformations or analysis
  of the request data (or anything really, they're just functions that take the
  request and response object as input pass it along to the next middleware or
  endpoint). A common use-case for middleware is security authorization and
  authentication. Servers often set JSON Web Tokens (JWTs) in cookies. Cookies
  are used because they are automatically sent with each request between the
  client and the server. JWTs are signed using a secret key that only the server
  has access to, then the server can inspect incoming JWTs against its secret
  key to authenticate the request.

## Reflection

- How has this course helped you in reaching your professional goals? What
  skills have you learned, developed, or mastered in this course to help you
  become a more marketable candidate in your career field?
  Throughout this course, I have gotten familiar with the Angular, which is
  a popular frontend framework used in enterprise applications. This diversifies
  my skillset beyond my previous knowledge of only React. I have learned the
  handlebars templating language used in server-side rendering. Overall, these
  skills have expanded my skillset and knowledge of full-stack applications, and
  have provided me with new ways of thinking about solving problems in web applications.
