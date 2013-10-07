define( [ 'shapes/builders/SizeBuilder' ], function( SizeBuilder ) {

	var SingleFrameScreenBuilder = function( screen ) {

		var self = this;

		this.name = ko.observable( screen.name );
		this.size = new SizeBuilder( screen.size );
		this.sprite =


		this.fields = [
		               {
		            	   name : "name",
		            	   label : "Name",
		            	   type : "string",
		            	   value : ko.observable( screen.name )
		               },
		               {
		            	   name : "size",
		            	   label : "Size",
		            	   type : "size",
		            	   value : ko.observable( screen.size )
		               },
		               {
		            	   name : "preview",
		            	   label : "Preview",
		            	   type : "single-frame-screen-preview",
		            	   value : null
		               }
		               ];

	};

	return SingleFrameScreenBuilder;

} );
