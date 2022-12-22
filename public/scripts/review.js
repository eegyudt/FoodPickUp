


//login route - POST
app.post('/menu', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Checking if both email and password has been entered
  if (!email || !password) {
    return res.status(400).send(`<h1>You must enter both email and password to login!<h1> <a href ="/login">Back to Login</a>`);
  }

  const user = getUserByEmail(email, users);

  // Checking if email is registered
  if (!user) {
    return res.status(400).send(`<h1>You haven't registered this email!<h1> <a href ="/register">Back to Registration</a>`);
  }

  // Checking if password matches user's password
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).send(`<h1>Email or password is incorrect!<h1> <a href ="/login">Back to Login</a>`);
  }

  const user_id = user.id;
  req.session.user_id = user_id;
  res.redirect('/urls');
});
