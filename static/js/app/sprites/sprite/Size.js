define( [], function() {

	var Size = function( width, height ) {

		var self = this;

		this.width = width;
		this.height = height;

		this.toJSON = function() {

			var retObject = {};

			retObject[ 'width' ] = self.width;
			retObject[ 'height' ] = self.height;

			return retObject;

		};

	};

	return Size;

} );