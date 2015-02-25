<?php

	/**
		Result class
	*/
	class Result {

		public $msg = '';

		public $valid = true;

		public $data = null;

		public function error($msg)
		{
			$this->valid = false;
			$this->msg = $msg;
		}
	}
	
	$result =new  Result();
	$file = $_FILES['upload'];

	//	Set header type
	header('Content-Type: application/json');
	
	try
	{
		if(count($file) > 0)
		{
			//	Upload folder path
			$path = 'upload_images/';

			//	Here you can put other name or put the same name of the file
			$newName = $file["name"];

			//	Copy file from Temporary folder ( Client PC ) to your server folder.
			move_uploaded_file($file["tmp_name"], $path . $newName );

			//	Return Ok, with the path of the url.
			$result->data = $path . $newName;
		}else
		{
			$result->valid = false;
			$result->msg = 'Error';
			$result->data = null;
		}	
	} catch (Exception $e) {
		$result->valid = false;
		$result->msg = 'Exception';
		$result->data = null;
	}

	echo json_encode($result);
?>