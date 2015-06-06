<?php

$takenUsernames = array ('bill', 'ted', 'thehoss');

sleep(2);

if (!in_array( $_REQUEST['username'], $takenUsernames )) {
	echo 'okay';
} else {
	echo 'taken';
}

?>
