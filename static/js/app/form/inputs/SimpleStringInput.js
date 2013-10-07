define( [], function() {

	var SimpleStringInput = function( options ) {

		this.className = options.className;

		this.render = function( container, builder, field ) {

			var renderedInput = $( '<input type="text" />' );
			renderedInput.attr( {
				"name" : field.name,
				"data-bind" : "value : value"
			} );

			container.append( renderedInput );

		};

	};

	return SimpleStringInput;

} );