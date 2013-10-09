define( [], function() {

	var EyeDropper = function() {

		this.name = "Eye Dropper";
		this.id = "eye-dropper";
		this.icon = "icon-tint";

		this.listeners = {
			"click" : function( event, editContext, eventEliciter, parameters ) {
				if ( parameters && parameters.pixel ) {
					editContext.pallet.color( parameters.pixel.color );
					editContext.pallet.opacity( parameters.pixel.opacity );
				}
			}
		};

	};

	return EyeDropper;

} );