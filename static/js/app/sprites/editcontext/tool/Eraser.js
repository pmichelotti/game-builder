define( [ 'sprite/VirtualPixel' ], function( VirtualPixel ) {

	var Eraser = function() {

		this.name = "Eraser";
		this.id = "eraser-tool";
		this.icon = "icon-eraser";

		this.listeners = {
			"click" : function( event, editContext, eventEliciter, parameters ) {
				/*
				 * Make sure that the event eliciter has a draw method
				 */
				if ( eventEliciter && eventEliciter.draw && parameters.pixel ) {
					var pixel = parameters.pixel;

					var newPixel = new VirtualPixel( { x : pixel.position.x, y : pixel.position.y }, '#FFFFFF', 0 );
					eventEliciter.draw( newPixel );
				}
			}
		};

	};

	return Eraser;

} );