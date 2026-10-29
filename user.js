
const users = [];

function registerUser(username, password) {
  const existingUser = users.find(
    (user) => user.username === username
  );

  if (existingUser) {
    return { success: false, message: "User already exists" };
  }

  users.push({ username, password });

  return {
    success: true,
    message: "User registered successfully",
  };
}

function loginUser(username, password) {
  const user = users.find(
    (item) =>
      item.username === username &&
      item.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid username or password",
    };
  }

  return {
    success: true,
    message: "Login successful",
  };
}

module.exports = { registerUser, loginUser };
