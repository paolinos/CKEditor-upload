# CKEditor-upload
I make a plugin to upload images to the WYSIWYG CKEditor

For sure works in the last browsers.


To use it, you need to copy the upload plugin ( inside plugin folder ), to CKEditor plugin folder.

Then, you need to configure.
In the "index.html" you can see that the example that I make:

CKEDITOR.replace( 'editor', {
	//	Add the Upload plugin ( check the folder: "plugins/upload" )
	extraPlugins : 'upload'
} );

And also you need to add this line, to specify the upload server file.
		CKEDITOR.dialog.url_uploader = "file_upload.php";
/*
	Also the "Uploader" return need the same structure that we use in this php file.

	If you want to make other check to change the return value and check to change the plugin.

	The server need to return a JSON structure:
	{
		msg:'',
		valid:true,
		data:null
	}

	when:
		data 	=> is the url with the path, to read the file
		valid 	=> true or false
*/

In the PHP you can see an example, to how use it in the server side.


Ahh, check de html, because, I making reference to locak CKEditor script:
	<script type="text/javascript" src="ckeditor.js"></script>


Enjoy it!