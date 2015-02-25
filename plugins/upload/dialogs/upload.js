CKEDITOR.dialog.tabEnable = 0;
//CKEDITOR.dialog.url_uploader = "file_upload.php";
CKEDITOR.dialog.add( 'uploadDialog', function ( editor ) {
    return {
		title: 'Add images',
		minWidth: 400,
		minHeight: 200,
		resizable:  CKEDITOR.DIALOG_RESIZE_NONE,
		contents: [
			{
				id:'tab1',
				label:'Upload Image',
				elements:[
					{
					    type: 'file',
					    id: 'upload',
					    label: 'Select file from your computer',
					    size: 38,
					    validate: function() {
					    	if(CKEDITOR.dialog.tabEnable != 0) return true;

					        if ( !this.getValue() ) {
					            return false;
					        }
					    }
					}
					,{
		                type: 'text',
					    id: 'txtAttr',
					    label: 'Alt',
					    'default': ''
		            }
		            ,{
		            	type: 'hbox',
	            		children: [
	            			{
				                type: 'text',
							    id: 'txtW',
							    label: 'Width ( ex:50%, 50px, 2em )',
							    'default': ''
							}
							,{
				                type: 'text',
							    id: 'txtH',
							    label: 'Height ( ex:50%, 50px, 2em )',
							    'default': ''
							}
		            	]
		            }
				]
			}
			,{
				id:'tab2',
				label:'Add url Image',
				elements:[
					{
		                type: 'text',
					    id: 'txtUrl',
					    label: 'URL',
					    'default': '',
					    validate: function() {
					    	if(CKEDITOR.dialog.tabEnable != 1) return true;
					        if ( !this.getValue() ) {
					            return false;
					        }
					    }
		            }
		            ,{
		                type: 'text',
					    id: 'txtAttr',
					    label: 'Alt',
					    'default': ''
		            }
		            ,{
		            	type: 'hbox',
	            		children: [
	            			{
				                type: 'text',
							    id: 'txtW',
							    label: 'Width ( ex:50%, 50px, 2em )',
							    'default': ''
							}
							,{
				                type: 'text',
							    id: 'txtH',
							    label: 'Height ( ex:50%, 50px, 2em )',
							    'default': ''
							}
		            	]
		            }
				]
			}
		],
		onLoad : function(e){
			this.on( 'selectPage', function( e ){ 
				if(e.data.page == 'tab1'){
					CKEDITOR.dialog.tabEnable = 0;
				}else{
					CKEDITOR.dialog.tabEnable = 1;
				}
			 });
		},
		onOk : function(e){
            var editor = this.getParentEditor();

            var ajaxCall = function(urlServer, file, onComplete){

            	var formData = new FormData();
            	formData.append('upload', file);

				var request = new XMLHttpRequest();
				request.open("POST", urlServer);
				request.onload = function(oEvent) {
					try{
						if (request.status == 200) {

							if(oEvent.target.response != null)
							{
								var resp = JSON.parse(oEvent.target.response);

								if(resp.valid)
								{
									onComplete(resp.data);
								}else{
									alert("There are a problem with the server. Try again later.");
								}
							}
					    } else {
					      alert("The server page is not working. Try again later.");
					    }
					}catch(err) {
						alert("Unexpected error");
						console.log(err);
					}
				};

				request.send(formData);
            }


            var renderImg = function(src,w,h,alt){
            	if(src === undefined) return;

            	w = w === undefined ? null : w;
            	h = h === undefined ? null : h;
            	alt = alt === undefined ? null : alt;

            	var strImg = '<img src="' + src + '"';
				if(w != "" && w != null){
					strImg += ' width="' + w + '"';
				}
				if(h != "" && h != null){
					strImg += ' height="' + h + '"';
				}
				if(alt != "" && alt != null){
					strImg += ' alt="' + alt + '"';
				}
				strImg += "></img>"

				var editorStr = editor.getData();
				editorStr += strImg;
				editor.setData(editorStr);
            }


            if( CKEDITOR.dialog.tabEnable === 0)
            {
            	var up = this.getContentElement( 'tab1', 'upload' ).getInputElement().$;

	            var txtW = this.getContentElement( 'tab1', 'txtW' ).getInputElement().$.value;
	            var txtH = this.getContentElement( 'tab1', 'txtH' ).getInputElement().$.value;
	            var txtAttr = this.getContentElement( 'tab1', 'txtAttr' ).getInputElement().$.value;

	            //	AJAX Call
	            if(CKEDITOR.dialog.url_uploader)
	            {
	            	ajaxCall(CKEDITOR.dialog.url_uploader, up.files[0], function(src){
		            	renderImg(src,txtW,txtH.txtAttr );
		            });	
	            }else{
	            	console.log("you need the upload url.");
	            }
            }
            else if(CKEDITOR.dialog.tabEnable === 1)
            {
            	var txtUrl = this.getContentElement( 'tab2', 'txtUrl' ).getInputElement().$.value;
	            var txtW = this.getContentElement( 'tab2', 'txtW' ).getInputElement().$.value;
	            var txtH = this.getContentElement( 'tab2', 'txtH' ).getInputElement().$.value;
	            var txtAttr = this.getContentElement( 'tab2', 'txtAttr' ).getInputElement().$.value;	

	            renderImg(txtUrl,txtW,txtH.txtAttr );
            }
		}
    };
});