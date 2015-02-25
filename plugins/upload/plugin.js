CKEDITOR.plugins.add( 'upload', {
    icons: 'upload',
    init: function( editor ) {

    	editor.addCommand( 'upload', new CKEDITOR.dialogCommand( 'uploadDialog' ) );

        editor.ui.addButton( 'Upload files', {
            label: 'Upload files label',
            command: 'upload',

            //  Tollbar that we want to add. If we not set the toolbar, the icon will be added at the end.
            //  more info:      http://docs.ckeditor.com/#!/guide/dev_toolbar-section-toolbar-groups-configuration
            toolbar: 'insert,0',
            icon: this.path + 'icons/icon.png'
        });

        //  Load JS
        CKEDITOR.dialog.add( 'uploadDialog', this.path + 'dialogs/upload.js' );
    }
});