<?php

session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'Slim/Slim.php';
//require_once 'dbHelper.php';

use Slim\Slim;

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();
//$db = new dbHelper();

require 'CorsSlim.php';
$corsOptions = array(
    "origin" => "http://localhost:8000",
    //"origin" => "*",
    "allowCredentials" => True,
    "allowMethods" => "GET,POST,PUT,DELETE,OPTIONS"
    );

$app->add(new \CorsSlim\CorsSlim($corsOptions));

// respond to preflights
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	header('Content-Type: application/json');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Allow-Origin: http://localhost:8000');
	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        echo '{"status": "OK"}';
        exit;
}

// Audentication
//--------------------------------------
$app->get('/authorize/', 'checkUser');
$app->post('/login/', 'login');
$app->get('/logout/', 'logout');

// Kontakty
//--------------------------------------
$app->get('/employees/', 'getEmployees');
$app->get('/employees/:id', 'getEmployee');
$app->get('/employees/:id/reports', 'getReports');
$app->delete('/employees/:id',	'delEmployee');
$app->put('/employees/:id', 'updateEmployee');
$app->post('/employees/', 'addEmployee');

// Pracownicy PSE Centrum ZT
//---------------------------------------
$app->get('/telekom/', 'getTelekoms');
$app->get('/telekom/:id', 'getEmployee');
$app->put('/telekom/:id', 'updateEmployee');

// Dyzury PSE Centrum ZT
//---------------------------------------
$app->get('/dyzury/', 'getDyzury');
$app->get('/dyzury/:idem', 'getEmpDyzury');
//$app->put('/dyzury/:idem', 'updateEmpDyzury');
$app->post('/dyzury/', 'addDyzury');
$app->delete('/dyzury/:id',	'delEmpDyzury');

// Delegacje PSE CENTRUM ZT
//---------------------------------------
$app->get('/delegacje/', 'getDelegac');
$app->get('/delegacje/:idem', 'getEmpDelegac');
$app->put('/delegacje/:idem', 'updateEmpDelegac');
$app->post('/delegacje/', 'addDelegac');
$app->delete('/delegacje/:id',	'delEmpDelegac');

// Kategorie 
//---------------------------------------
$app->get('/kategorie/', 'getKatAll');
$app->get('/kategorie/:idem', 'getKategoria');
$app->put('/kategorie/:idem', 'updateKategoria');
$app->post('/kategorie/', 'addKategoria');
$app->delete('/kategorie/:id',  'delKategoria');

// Artykuły
//---------------------------------------
$app->get('/artykuly/', 'getArtykuly');
$app->get('/kategorie/:idem/artykuly', 'getKatArtykuly');
$app->get('/artykuly/:idem', 'getArtykul');
$app->put('/artykuly/:idem', 'updateArtykul');
$app->post('/artykuly/', 'addArtykul');
$app->delete('/artykuly/:id',  'delArtykul');

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

function getEmployees() {

    global $app;
    if (isset($_GET['name'])) {
        return getEmployeesByName($_GET['name']);
    } else {
		if (isset($_GET['modifiedSince'])) {
        return getModifiedEmployees($_GET['modifiedSince']);
		} else if (isset($_GET['tags'])) {
			return getEmployeesByTags($_GET['tags']);
		}
    }

    $sql = "select e.id, e.firstName, e.lastName, e.department, e.city, e.title, e.officePhone, e.cellPhone, e.email, e.tags, count(r.id) reportCount " .
            "from employee e left join employee r on r.managerId = e.id " .
			'where not e.department LIKE "PSE Centrum" ' .
            "group by e.id order by e.tags";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $employees = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        $app->status(200);
        $app->contentType('application/json');

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employees);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employees) . ');';
        }

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getEmployee($id) {
     global $app;

    $sql = "select e.id, e.firstName, e.lastName, e.department, e.title, e.city, e.officePhone, e.cellPhone, e.email, e.managerId, e.twitterId, e.tags, CONCAT(m.firstName, ' ', m.lastName) managerName, count(r.id) reportCount " .
            "from employee e " .
            "left join employee r on r.managerId = e.id " .
            "left join employee m on e.managerId = m.id " .
            "where e.id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $employee = $stmt->fetchObject();
        $db = null;
        $app->status(200);
        $app->contentType('application/json');

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employee);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employee) . ');';
        }

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getReports($id) {

    $sql = "select e.id, e.firstName, e.lastName, e.title, e.tags, count(r.id) reportCount " .
            "from employee e left join employee r on r.managerId = e.id " .
            "where e.managerId=:id " .
            "group by e.id order by e.lastName, e.firstName";

    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $employees = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employees);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employees) . ');';
        }

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getEmployeesByName($name) {
    $sql = "select e.id, e.firstName, e.lastName, e.department, e.city,  e.title, e.officePhone, e.cellPhone, e.email, e.tags, count(r.id) reportCount " .
            "from employee e left join employee r on r.managerId = e.id " .
            "WHERE UPPER(CONCAT(e.firstName, ' ', e.lastName)) LIKE :name " .
			'AND not e.department LIKE "PSE Centrum" ' .
            "group by e.id order by e.tags";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $name = "%".$name."%";
        $stmt->bindParam("name", $name);
        $stmt->execute();
        $employees = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employees);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employees) . ');';
        }

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}

function getEmployeesByTags($tags) {
    $sql = "select e.id, e.firstName, e.lastName, e.department, e.city, e.title, e.officePhone, e.cellPhone, e.email, e.tags, count(r.id) reportCount " .
            "from employee e left join employee r on r.managerId = e.id " .
            "WHERE UPPER(e.tags) LIKE :tags " .
            "group by e.id order by e.lastName, e.firstName collate utf8_polish_ci";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $tags = "%".$tags."%";
        $stmt->bindParam("tags", $tags);
        $stmt->execute();
        $employees = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employees);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employees) . ');';
        }

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}

function getModifiedEmployees($modifiedSince) {
    if ($modifiedSince == 'null') {
        $modifiedSince = "1000-01-01";
    }
    $sql = "select * from employee WHERE lastModified > :modifiedSince";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("modifiedSince", $modifiedSince);
        $stmt->execute();
        $employees = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employees);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employees) . ');';
        }

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function updateEmployee($id) {
    global $app;

	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$wine = json_decode($body);
	$sql = "UPDATE employee SET firstName=:firstName, lastName=:lastName, title=:title, city=:city, department=:department, officePhone=:officePhone, cellPhone=:cellPhone, email=:email, tags=:tags WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("firstName", $wine->firstName);
		$stmt->bindParam("lastName", $wine->lastName);
		$stmt->bindParam("title", $wine->title);
		$stmt->bindParam("department", $wine->department);
		$stmt->bindParam("city", $wine->city);
		$stmt->bindParam("officePhone", $wine->officePhone);
		$stmt->bindParam("cellPhone", $wine->cellPhone);
		$stmt->bindParam("email", $wine->email);
		$stmt->bindParam("tags", $wine->tags);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		$app->status(200);
        $app->contentType('application/json');

		//$app->response()->header('Content-Type', 'application/json');
        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($wine);
        } else {
            echo $_GET['callback'] . '(' . json_encode($wine) . ');';
        };
		//echo json_encode($wine); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addEmployee() {

	global $app;

	//error_log('addContact\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$wine = json_decode($request->getBody());
	$sql = "INSERT INTO employee (firstName, lastName, title, department, city, officePhone, cellPhone, email, tags) VALUES (:firstName, :lastName, :title, :department, :city, :officePhone, :cellPhone, :email, :tags)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("firstName", $wine->firstName);
		$stmt->bindParam("lastName", $wine->lastName);
		$stmt->bindParam("title", $wine->title);
		$stmt->bindParam("department", $wine->department);
		$stmt->bindParam("city", $wine->city);
		$stmt->bindParam("officePhone", $wine->officePhone);
		$stmt->bindParam("cellPhone", $wine->cellPhone);
		$stmt->bindParam("email", $wine->email);
		$stmt->bindParam("tags", $wine->tags);
		$stmt->execute();
		$wine->id = $db->lastInsertId();
		$db = null;
		$app->status(200);
	        $app->contentType('application/json');

		//$app->response()->header('Content-Type', 'application/json');
        if (!isset($_GET['callback'])) {
            echo json_encode($wine);
        } else {
            echo $_GET['callback'] . '(' . json_encode($wine) . ');';
        };
	} catch(PDOException $e) {
		//error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function delEmployee($id) {
	$sql = "DELETE FROM employee WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getTelekoms() {
    global $app;

    $sql = "select e.id, e.firstName, e.lastName, e.department, e.city, e.title, e.officePhone, e.cellPhone, e.email, e.tags, count(r.id) reportCount, d.datapocz, d.datakonc, d.grupa " .
            "from employee e ".
			"left join employee r on r.managerId = e.id " .
			"left join dyzury d on d.idem = e.id AND d.datapocz <= CURDATE() AND d.datakonc >= CURDATE() ".
			'where e.department LIKE "PSE Centrum" ' .
			//"AND d.datapocz <= CURDATE() AND d.datakonc > CURDATE() " .
            "group by e.id order by e.lastName";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $employees = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        $app->status(200);
        $app->contentType('application/json');

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employees);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employees) . ');';
        }

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
    //echo "go";
}

function getDyzury() {

    $sql = "select e.id, e.idem, e.datapocz, e.datakonc, e.grupa " .
            "from dyzury e ".
            "order by e.idem, e.datapocz";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $employees = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employees);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employees) . ');';
        }

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
    //echo "go";
}

function getEmpDyzury($idem) {
    global $app;

    $sql = "select e.id, e.idem, e.datapocz, e.datakonc, e.grupa " .
            "from dyzury e " .
            "where e.idem = :idem";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("idem", $idem);
        $stmt->execute();
        $employees = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        $app->status(200);
        $app->contentType('application/json');

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employees);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employees) . ');';
        }

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
    //echo "go";
}

function addDyzury() {
        global $app;

	//error_log('addContact\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$wine = json_decode($request->getBody());
	$sql = "INSERT INTO dyzury (idem, datapocz, datakonc, grupa) VALUES (:idem, :datapocz, :datakonc, :grupa)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("idem", $wine->idem);
		$stmt->bindParam("datapocz", $wine->datapocz);
		$stmt->bindParam("datakonc", $wine->datakonc);
		$stmt->bindParam("grupa", $wine->grupa);
		$stmt->execute();
		$wine->id = $db->lastInsertId();
		$db = null;
        	$app->status(200);
	        $app->contentType('application/json');

		//$app->response()->header('Content-Type', 'application/json');
        if (!isset($_GET['callback'])) {
            echo json_encode($wine);
        } else {
            echo $_GET['callback'] . '(' . json_encode($wine) . ');';
        };
	} catch(PDOException $e) {
		//error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function delEmpDyzury($id) {
	$sql = "DELETE FROM dyzury WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

//------------------  D E L E G A C J E  -------------------------------------
function getDelegac() {

    $sql = "select e.id, e.idem, e.numer, e.datadel, e.do, e.srtrans, e.nadgodziny, e.kilometry " .
            "from delegacje e ".
            "order by e.idem, e.numer";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $delegacje = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($delegacje);
        } else {
            echo $_GET['callback'] . '(' . json_encode($delegacje) . ');';
        }

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
    //echo "go";
}

function getEmpDelegac($idem) {
    global $app;

    $sql = "select e.id, e.idem, e.numer, e.datadel, e.do, e.srtrans, e.nadgodziny, e.kilometry " .
            "from delegacje e " .
            "where e.idem = :idem";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("idem", $idem);
        $stmt->execute();
        $delegacje = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        $app->status(200);
        $app->contentType('application/json');

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($delegacje);
        } else {
            echo $_GET['callback'] . '(' . json_encode($delegacje) . ');';
        }

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
    //echo "go";
}

function addDelegac() {
        global $app;

	//error_log('addContact\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$wine = json_decode($request->getBody());
	$sql = "INSERT INTO delegacje (idem, numer, datadel, do, srtrans, nadgodziny, kilometry) " .
	       "VALUES (:idem, :numer, :datadel, :do, :srtrans, :nadgodziny, :kilometry)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("idem", $wine->idem);
		$stmt->bindParam("numer", $wine->numer);
		$stmt->bindParam("datadel", $wine->datadel);
		$stmt->bindParam("do", $wine->do);
		$stmt->bindParam("srtrans", $wine->srtrans);
		$stmt->bindParam("nadgodziny", $wine->nadgodziny);
		$stmt->bindParam("kilometry", $wine->kilometry);
		$stmt->execute();
		$wine->id = $db->lastInsertId();
		$db = null;
        $app->status(200);
	    $app->contentType('application/json');

		//$app->response()->header('Content-Type', 'application/json');
        if (!isset($_GET['callback'])) {
            echo json_encode($wine);
        } else {
            echo $_GET['callback'] . '(' . json_encode($wine) . ');';
        };
	} catch(PDOException $e) {
		//error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function delEmpDelegac($id) {
	$sql = "DELETE FROM delegacje WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateEmpDelegac($id) {
    global $app;

	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$wine = json_decode($body);
	$sql = "UPDATE delegacje SET numer=:numer, datadel=:datadel, do=:do, srtrans=:srtrans, nadgodziny=:nadgodziny, kilometry=:kilometry WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		//$stmt->bindParam("idem", $wine->idem);
		$stmt->bindParam("numer", $wine->numer);
		$stmt->bindParam("datadel", $wine->datadel);
		$stmt->bindParam("do", $wine->do);
		$stmt->bindParam("srtrans", $wine->srtrans);
		$stmt->bindParam("nadgodziny", $wine->nadgodziny);
		$stmt->bindParam("kilometry", $wine->kilometry);
		$stmt->execute();
		$db = null;
		$app->status(200);
        $app->contentType('application/json');

		//$app->response()->header('Content-Type', 'application/json');
        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($wine);
        } else {
            echo $_GET['callback'] . '(' . json_encode($wine) . ');';
        };
		//echo json_encode($wine);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

//------------------  K A T E G O R I E   -------------------------------------
function getKatAll() {

    $sql = "select e.id, e.kategoria, e.opis, e.idup " .
            "from kategorie e ".
            "order by e.id, e.idup";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $kategorie = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($kategorie);
        } else {
            echo $_GET['callback'] . '(' . json_encode($kategorie) . ');';
        }

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
    //echo "go";
}

function getKategoria($idem) {
    global $app;

    $sql = "select e.id, e.kategoria, e.opis, e.idup " .
            "from kategorie e " .
            //"inner join artykuly r on e.id = r.idkat " .
            "where e.id = :idem";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("idem", $idem);
        $stmt->execute();
        $kategoria = $stmt->fetchObject();
        $db = null;
        $app->status(200);
        $app->contentType('application/json');

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($kategoria);
        } else {
            echo $_GET['callback'] . '(' . json_encode($kategoria) . ');';
        }

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
    //echo "go";
}

function updateKategoria($id) {
    global $app;

	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$wine = json_decode($body);
	$sql = "UPDATE kategorie SET kategoria=:kategoria, opis=:opis WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("kategoria", $wine->kategoria);
		$stmt->bindParam("opis", $wine->opis);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		$app->status(200);
        $app->contentType('application/json');

		//$app->response()->header('Content-Type', 'application/json');
        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($wine);
        } else {
            echo $_GET['callback'] . '(' . json_encode($wine) . ');';
        };
		//echo json_encode($wine);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function addKategoria() {
    global $app;

	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$wine = json_decode($body);
	$sql = "INSERT INTO kategorie SET kategoria=:kategoria, opis=:opis";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("kategoria", $wine->kategoria);
		$stmt->bindParam("opis", $wine->opis);
		$stmt->execute();
		$wine->id = $db->lastInsertId();
		$db = null;
		$app->status(200);
        $app->contentType('application/json');

		//$app->response()->header('Content-Type', 'application/json');
        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($wine);
        } else {
            echo $_GET['callback'] . '(' . json_encode($wine) . ');';
        };
		//echo json_encode($wine);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function delKategoria($id) {
	$sql = "DELETE FROM kategorie WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

//------------------  A R T Y K U L Y   -------------------------------------
function getArtykuly() {

    $sql = "select e.id, e.idkat, r.kategoria, e.tytul, e.autor, e.data, e.plik " .
            "from artykuly e ".
	    "left join kategorie r on r.id = e.idkat " .
            "order by e.idkat, e.data";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $artykuly = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($artykuly);
        } else {
            echo $_GET['callback'] . '(' . json_encode($artykuly) . ');';
        }

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
    //echo "go";
}

function getArtykul($idem) {
    global $app;

    $sql = "select e.id, e.idkat, e.tytul, e.autor, e.data, e.plik ".
           "from artykuly e ".
           "where e.id = :idem";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("idem", $idem);
        $stmt->execute();
        $artykul = $stmt->fetchObject();
        $db = null;
        $app->status(200);
        $app->contentType('application/json');

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($artykul);
        } else {
            echo $_GET['callback'] . '(' . json_encode($artykul) . ');';
        }

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
    //echo "go";
}

function getKatArtykuly($idem) {

    $sql = "select e.id, e.idkat, r.kategoria, e.tytul, e.autor, e.data, e.plik " .
            "from artykuly e ".
	    "left join kategorie r on r.id = e.idkat " .
            "where e.idkat = :idem ".
            "order by e.data";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("idem", $idem);
        $stmt->execute();
        // $stmt = $db->query($sql);
        $artykuly = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($artykuly);
        } else {
            echo $_GET['callback'] . '(' . json_encode($artykuly) . ');';
        }

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
    //echo "go";
}

function updateArtykul($id) {
    global $app;

        $request = Slim::getInstance()->request();
        $body = $request->getBody();
        $wine = json_decode($body);
        $sql = "UPDATE artykuly SET idkat=:idkat, tytul=:tytul, autor=:autor, plik=:plik, data=:data WHERE id=:id";
        try {
                $db = getConnection();
                $stmt = $db->prepare($sql);
                $stmt->bindParam("idkat", $wine->idkat);
                $stmt->bindParam("tytul", $wine->tytul);
                $stmt->bindParam("autor", $wine->autor);
		        $stmt->bindParam("plik", $wine->plik);
		        $stmt->bindParam("data", $wine->data);
                $stmt->bindParam("id", $id);
                $stmt->execute();
                $db = null;
                $app->status(200);
        $app->contentType('application/json');

                //$app->response()->header('Content-Type', 'application/json');
        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($wine);
        } else {
            echo $_GET['callback'] . '(' . json_encode($wine) . ');';
        };
                //echo json_encode($wine);
        } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function addArtykul() {
    global $app;

	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$wine = json_decode($body);
	$sql = "INSERT INTO artykuly SET idkat=:idkat, tytul=:tytul, autor=:autor, plik=:plik, data=:data";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("idkat", $wine->idkat);
        $stmt->bindParam("tytul", $wine->tytul);
        $stmt->bindParam("autor", $wine->autor);
        $stmt->bindParam("plik", $wine->plik);
        $stmt->bindParam("data", $wine->data);
		$stmt->execute();
		$wine->id = $db->lastInsertId();
		$db = null;
		$app->status(200);
        $app->contentType('application/json');

		//$app->response()->header('Content-Type', 'application/json');
        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($wine);
        } else {
            echo $_GET['callback'] . '(' . json_encode($wine) . ');';
        };
		//echo json_encode($wine);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function delArtykul($id) {
	$sql = "DELETE FROM artykuly WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getConnection() {
    $dbhost="127.0.0.1";
    $dbuser="root";
    $dbpass="pse=wti";
    $dbname="directory";
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);  
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}
