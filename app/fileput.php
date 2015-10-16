<?php
/**
* @param string $filename <p>file name including folder.
* example :: /path/to/file/filename.ext or filename.ext</p>
* @param string $data <p> The data to write.
* </p>
* @param int $flags same flags used for file_put_contents.
* more info: http://php.net/manual/en/function.file-put-contents.php
* @return bool <b>TRUE</b> file created succesfully <br> <b>FALSE</b> failed to create file.
*/

/**
$argc = $_SERVER['argc'];
$argv = $_SERVER['argv'];

if($argc != 3)
{
echo "This command save contents in filename\n";
echo "command usage: $argv[0]  directory contents\n";
echo "\n";
exit;
}
*/

function file_force_contents($filename, $data, $flags = 0){
    if(!is_dir(dirname($filename)))
        mkdir(dirname($filename).'/', 0777, TRUE);
    return file_put_contents($filename, $data, $flags);
}
// usage

//file_force_contents('test1.txt','test1 content');  // test1.txt created

//file_force_contents('test2/test2.txt','test2 content');
// test2/test2.txt created "test2" folder.

//file_force_contents('~/test3/test3.txt','test3 content');
// /path/to/user/directory/test3/test3.txt created "test3" folder in user directory (check on linux "ll ~/ | grep test3").

if ($_GET) {
    $directory = $_GET['arg1'];
    $contents = $_GET['arg2'];
} else {
    $directory = $argv[1];
    $contents = $argv[2];
};

echo "$directory - $contents";
file_force_contents($directory, $contents);

?>
