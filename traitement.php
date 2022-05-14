

<?php echo json_encode($_POST);

$id_stats=$_POST['id_stats'];
$id=$_POST['id'];
$highscore=$_POST['highscore'];

mySQLi_query($con,"INSERT INTO statistiques (id_stats,id,highscore)
			VALUES ('$id_stats','$id','$highscore')");
			echo "";