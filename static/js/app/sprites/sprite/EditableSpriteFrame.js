define( [ 'sprite/SpriteFrame', 'sprite/VirtualPixel' ], function( SpriteFrame, VirtualPixel ) {

	var EditableSpriteFrame = function( spriteFrame ) {

		var self = this;

		this.spriteFrame = spriteFrame;

		this.newName = ko.observable( spriteFrame.name );
		this.name = this.newName;
		this.newSize = ko.observable( spriteFrame.size );
		this.size = this.newSize;
		this.newPixelSize = ko.observable( spriteFrame.pixelSize );
		this.pixelSize = this.newPixelSize;

		this.pixels = null;

		var initializePixelMatrix = function() {
			var newMatrix = Array();

			for ( var curX = 0; curX < self.newSize().width; curX++ ) {
				var curYArray = Array();

				for ( var curY = 0; curY < self.newSize().height; curY++ ) {
					if ( self.spriteFrame.pixels && self.spriteFrame.pixels[ curX ][ curY ] ) {
						curYArray.push( self.spriteFrame.pixels[ curX ][ curY ] );
					}
					else {
						curYArray.push( new VirtualPixel( { x : curX, y : curY } ) );
					}
				}

				newMatrix.push( curYArray );
			}

			self.pixels = newMatrix;
		};

		var updatePixelMatrix = function() {
			var newMatrix = Array();

			for ( var curX = 0; curX < self.newSize().width; curX++ ) {
				var curYArray = Array();

				for ( var curY = 0; curY < self.newSize().height; curY++ ) {
					if ( self.pixels != null && self.pixels[ curX ][ curY ] ) {
						curYArray.push( self.pixels[ curX ][ curY ] );
					}
					else {
						curYArray.push( new VirtualPixel( { x : curX, y : curY } ) );
					}
				}

				newMatrix.push( curYArray );
			}

			self.pixels = newMatrix;
		};

		initializePixelMatrix();

		this.newSize.subscribe( updatePixelMatrix );



		this.draw = function( pixel ) {

			if ( self.pixels && self.pixels[ pixel.position.x ][ pixel.position.y ] ) {
				self.pixels[ pixel.position.x ][ pixel.position.y ] = pixel;
				return;
			}

			throw "Pixel to draw is at position " + pixel.position.x + ", " + pixel.position.y + " which is outside the area of the Sprite";

		};

		this.erase = function( pixel ) {

			this.draw( new VirtualPixel( { x : pixel.position.x, y : pixel.position.y } ) );

		};

		this.save = function() {

			var newSpriteFrame = new SpriteFrame( self.spriteFrame.id, {
				name : self.newName(),
				size : self.newSize(),
				pixelSize : self.newPixelSize(),
				pixels : self.pixels
			} );

			return newSpriteFrame;

		};

	};

	return EditableSpriteFrame;

} );