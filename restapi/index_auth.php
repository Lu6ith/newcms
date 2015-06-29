<?php

session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

// respond to preflights
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	echo '{"status": "OK"}';
	exit;
}

require_once "Slim/Slim.php";

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim(array('debug' => true));

$app->get("/authorize/", "checkUser");
$app->post("/login/", "login");
$app->get("/logout/", "logout");

// items
$app->get("/items/", "getItems");
$app->get("/items/:id", "getItemsItem");
$app->post("/items/", authorize('user'), "addItems");
$app->put("/items/:id", authorize('user'), "updateItems");
$app->delete("/items/:id", authorize('user'), "deleteItems");

$app->run();

function login() {
	$request_body = file_get_contents("php://input");
	$data = json_decode($request_body);
	file_put_contents("test.txt", $data);
	if($data->login != '' && $data->login == 'admin' && $data->pass != '' && $data->pass == 'admin') {
    	$_SESSION['user'] = 'admin';
    	echo '{"status": "OK", "user": "' . $data->login . '"}';
    } else {
    	echo '{"status":0, "error": "session expired"}';
    }
}


function logout() {
	session_destroy();
    echo '{"status": "OK"}';
}

function checkUser(){
	if(!empty($_SESSION['user'])) {
		echo '{"status": "OK"}';
	} else {
		echo '{"status":0, "error": "session expired"}';
	}
}

function authorize($role = "user") {

    return function () use ( $role ) {
        // Get the Slim framework object
        $app = \Slim\Slim::getInstance();
        // First, check to see if the user is logged in at all
        if(!empty($_SESSION['user'])) {
            return true;
        }
        else {
            // If a user is not logged in at all, return a 401
            $app->halt(401, 'You shall not pass!');
        }
    };
}

function addItems() {

	$app = \Slim\Slim::getInstance();
        $request = $app->request();

    $work = json_decode($request->getBody());
	$sql = "INSERT INTO items (title, description, img, price)
	        VALUES (:title, :description, :img, :price)";
	try {
    		$db = getConnection();
    		$stmt = $db->prepare($sql);
    		$stmt->bindParam("title", $work->title);
    		$stmt->bindParam("description", $work->description);
    		$stmt->bindParam("img", $work->img);
    		$stmt->bindParam("price", $work->price);
    		$stmt->execute();
    		$work->id = $db->lastInsertId();
    		$db = null;
    		echo '{"status": "OK", "data":' . json_encode($work, JSON_NUMERIC_CHECK) . '}';
    	} catch(PDOException $e) {
    		echo '{"status": 0, "error":{"text":'. $e->getMessage() .'}}';
    	}
}


function getItems() {

	$sql = "select * FROM items ORDER BY id DESC";
    	try {
    		$db = getConnection();
    		$stmt = $db->query($sql);
    		$works = $stmt->fetchAll(PDO::FETCH_OBJ);
    		$db = null;
    		echo '{"status": "OK", "data":' . json_encode($works, JSON_NUMERIC_CHECK) . '}';
    	} catch(PDOException $e) {
    		echo '{"status": 0, "error": {"text":' . $e->getMessage() . '}}';
    	}
}

function getItemsItem($id) {
	$sql = "SELECT * FROM items WHERE id=:id ORDER BY id DESC";
    	try {
    		$db = getConnection();
    		$stmt = $db->prepare($sql);
    		$stmt->bindParam("id", $id);
    		$stmt->execute();
    		$work = $stmt->fetchObject();
    		$db = null;
    		echo '{"status": "OK", "data":' . json_encode($work) . '}';
    	} catch(PDOException $e) {
    		echo '{"status": 0, "error":{"text":'. $e->getMessage() .'}}';
    	}
}

function updateItems($id) {
	$app = \Slim\Slim::getInstance();
    $request = $app->request();
	$body = $request->getBody();
	$work = json_decode($body);
	$sql = "UPDATE items SET title=:title, description=:description, img=:img, price=:price
	WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
        $stmt->bindParam("title", $work->title);
        $stmt->bindParam("description", $work->description);
        $stmt->bindParam("img", $work->img);
        $stmt->bindParam("price", $work->price);
		$stmt->execute();
		$db = null;
		echo '{"status": "OK"}';
	} catch(PDOException $e) {
		echo '{"status": 0, "error":{"text":'. $e->getMessage() .'}}';
	}
}

function deleteItems($id) {
	$sql = "DELETE FROM items WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo '{"status": "OK"}';
	} catch(PDOException $e) {
		echo '{"status":0, "error": "session expired"}';
	}
}


function getConnection() {
	$dbhost="";
	$dbuser="";
	$dbpass="";
	$dbname="";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>