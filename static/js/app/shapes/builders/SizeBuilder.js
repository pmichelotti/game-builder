define( [ 'shapes/Size' ], function( Size ) {

	var SizeBuilder = function( size ) {

		size = size || {};

		var self = this;

		this.width = ko.observable( size.width || 0 );
		this.height = ko.observable( size.height || 0 );

		this.fields = [
		               {
		            	   name : "width",
		            	   label : "W",
		            	   type : "integer",
		            	   value : this.width
		               },
		               {
		            	   name : "height",
		            	   label : "H",
		            	   type : "integer",
		            	   value : this.height
		               }
		               ];

		this.save = function() {
			return new Size( self.width(), self.height() );
		};

	};

	return SizeBuilder;

} );