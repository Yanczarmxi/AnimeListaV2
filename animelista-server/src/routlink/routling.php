<?php
/*
*    ROUTLING
*
*    Na razie obsługuje tylko GET i POST
*/

$method = $_SERVER['REQUEST_METHOD']; //Pobiera metodę wywołania
$path   = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH); //Pobiera ścieżkę URI z URL

$routling = [
    'GET' => [
        '/'         => 'Home', //Strona główna. Pusta. Sprawdza czy jesteśmy zalogowani czy nie
        '/login'    => 'Login',
        '/anime'    => 'AnimeList',
        '/user'     => 'UserConfig',
        '/get-anime'  => 'GetAnimeData', //Pobieranie danych po uwierzytelnieniu
    ],

    'POST' => [
        '/valid-user' => 'ValidUser',
        '/rec-anie'   => 'RecAnime',
        '/rec-group'  => 'RecGroup',
        '/edit-anime' => 'EditRecord',
        '/delete-anime' => 'DeleteRecord'
    ]
];

if (isset($routling[$method][$path])) {
    $function = $routling[$method][$path];
    $function();
}
else {
    http_response_code(404);
    echo ("Błąd 404"); //To jest do podmiany
}
?>