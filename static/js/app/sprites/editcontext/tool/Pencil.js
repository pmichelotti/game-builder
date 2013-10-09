define( [ 'sprite/VirtualPixel' ], function( VirtualPixel ) {

	var Pencil = function() {

		this.name = "Pencil";
		this.id = "pencil-tool";
		this.icon = "icon-pencil";

		this.listeners = {
			"click" : function( event, editContext, eventEliciter, parameters ) {
				/*
				 * Make sure that the event eliciter has a draw method
				 */
				if ( eventEliciter && eventEliciter.draw && parameters.pixel ) {
					var pixel = parameters.pixel;

					var newPixel = new VirtualPixel( { x : pixel.position.x, y : pixel.position.y }, editContext.pallet.color(), editContext.pallet.opacity() );
					eventEliciter.draw( newPixel );
				}
			}
		};

	};

	return Pencil;

} );