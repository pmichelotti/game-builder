define( [], function() {
	
	var Property = function( name, value ) {
		
		this.id = name;
		this.name = name;
		this.value = value;
		
	};
	
	return Property;
	
} );