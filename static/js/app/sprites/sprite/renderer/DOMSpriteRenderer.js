define( [], function() {

	var DOMSpriteRenderer = function() {

		this.render = function( spriteFrame, scale, context ) {

			if ( !spriteFrame ) {
				return $( '<div>' ).addClass( 'rendered-sprite-container' );
			}

			var spriteSize = spriteFrame.size;
			var spritePixelSize = spriteFrame.pixelSize;

			if ( typeof spriteSize === 'function' ) {
				spriteSize = spriteSize();
			}
			if ( typeof spritePixelSize === 'function' ) {
				spritePixelSize = spritePixelSize();
			}

			var containerDOM = $( '<div>' ).css( {
				width : spriteSize.width * spritePixelSize * ( scale + 1 ),
				height : spriteSize.height * spritePixelSize * ( scale + 1 ),
				position : "absolute",
				top : "0px",
				left : "0px"
			} ).addClass( 'rendered-sprite-container' );

			var renderPixel = function( x, y ) {
				var curPixel = spriteFrame.pixels[ x ][ y ];

				var renderedPixel = $( '<div>' ).css( {
					width : spritePixelSize * ( scale + 1 ),
					height : spritePixelSize * ( scale + 1 ),
					position : "absolute",
					top : y * spritePixelSize * ( scale + 1 ),
					left : x * spritePixelSize * ( scale + 1 ),
					"background-color" : curPixel.color,
					opacity : curPixel.opacity
				} ).
				addClass( 'rendered-sprite-pixel' ).
				click( function( event ) {
					if ( this.handleEvent ) {
						this.handleEvent( event, { pixel : curPixel } );
					}
				}.bind( context ) );

				return renderedPixel;
			};

			for ( var curX = 0; curX < spriteSize.width; curX++ ) {
				for ( var curY = 0; curY < spriteSize.height; curY++ ) {

					var renderedPixel = renderPixel( curX, curY );

					containerDOM.append( renderedPixel );
				}
			}

			return containerDOM;

		};

	};

	return DOMSpriteRenderer;

} );