<?php
// Nagłówki pozwalające na obsługę CORS, jeśli używasz serwera lokalnego
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Obsługa danych z POST (lub GET)
$data = $_POST['key'] ?? 'default value';

// Przykładowa odpowiedź w formacie JSON
$response = [
    'status' => 'success',
    'message' => 'Dane odebrane poprawnie!',
    'data_received' => $data
];

// Wyślij odpowiedź JSON
echo json_encode($response);
?>