define( [], function() {

	var Pallet = function() {

		this.color = ko.observable( "#FFFFFF" );
		this.opacity = ko.observable( 1 );

	};

	return Pallet;

} );