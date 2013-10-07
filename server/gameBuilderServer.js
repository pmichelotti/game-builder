var express = require( 'express' );
var app = express();

var start = function( staticDirectory, viewsDirectory ) {

	/*
	 * Setup the JADE Engine
	 */
	app.engine( 'jade', require( 'jade' ).__express );
	app.set( 'views', viewsDirectory );

	/*
	 * Setup Static Handling
	 */
	app.use( express.static( staticDirectory ) );

	/*
	 * Setup the index rendering
	 */
	app.get( '/', function( req, res ) {
		res.render( 'index.jade' );
	} );


	app.listen( 8000 );

	console.log( 'Game Builder Server Started - Listening at port 8000' );

};

exports.start = start;
