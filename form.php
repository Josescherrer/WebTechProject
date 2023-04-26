<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $last_name = $_POST['Last-name'] ?? '';
    $first_name = $_POST['First-name'] ?? '';
    $email = $_POST['Email'] ?? '';
    $rating = $_POST['gender'] ?? '';
    $feedback = $_POST['comments'] ?? '';


    // redirect the user to a confirmation page
    header('Location: formsubmitted.html');
    exit();
}
?>