define( [], function() {

	var VirtualPixel = function( position, color, opacity ) {

		var self = this;

		this.position = position || { x : 0, y : 0 };
		this.color = color || "#FFFFFF";
		this.opacity = opacity || 0;

		this.toJSON = function() {

			var retObject = {};

			retObject[ 'position' ] = { x : self.position.x, y : self.position.y };
			retObject[ 'color' ] = self.color;
			retObject[ 'opacity' ] = self.opacity;

			return retObject;

		};

	};

	VirtualPixel.createAsCopy = function( pixel ) {

		var position = { x : pixel.position.x, y : pixel.position.y };
		var color = pixel.color;
		var opacity = pixel.opacity;

		return new VirtualPixel( position, color, opacity );

	};

	return VirtualPixel;

} );