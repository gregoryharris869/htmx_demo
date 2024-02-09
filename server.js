import express from "express";

const app = express();

// Set static folder
app.use(express.static("public"));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Handle GET request to fetch users
app.get("/users", async (req, res) => {
  // const users = [
  //   { id: 1, name: "John Doe" },
  //   { id: 2, name: "Bob Allen" },
  //   { id: 3, name: "Mary Wilson" },
  // ];
  const limit = +req.query.limit || 10;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
  );
  const users = await response.json();

  res.send(`<h1 class="text-2xl font-bold my-4">Users</h1>
  <ul>${users.map((user) => `<li>${user.name}</li>`).join("")}</ul>`);
});
// ////////////////////////////////////////////////////////////////////////
// Handle POST request for temp conversion
app.post("/convert", (req, res) => {
  const fahrenheit = parseFloat(req.body.fahrenheit);
  const celsius = (fahrenheit - 32) * (5 / 9);
  res.send(
    `<p>
  ${fahrenheit} degrees Fahrenheit is equal to ${celsius.toFixed(
      2
    )} degrees Celsius.
  </p>`
  );
});
// //////////////////////////////////////////////////////////////////
// Handle GET request for polling example
let counter = 0;
app.get("/poll", (req, res) => {
  counter++;
  const data = { value: counter };
  res.json(data);
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
