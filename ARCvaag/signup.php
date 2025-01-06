<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "users_db";

// Create connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Check if the username already exists
    $checkUsername = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($checkUsername);

    if ($result->num_rows > 0) {
        // Username already exists
        echo "Username is already taken. Please choose a different one.";
    } else {
        // Insert new user if the username is not taken
        $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";
        
        if ($conn->query($sql) === TRUE) {
            echo "New user registered successfully!";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
    
    $conn->close();
}
?>
