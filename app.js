var gameBuilderServer = require( './server/gameBuilderServer' );

var staticDirectory = __dirname + '/static';
var viewsDirectory = __dirname + '/templates';

console.log( 'static directory ' + staticDirectory );
console.log( 'views directory ' + viewsDirectory );


gameBuilderServer.start( staticDirectory, viewsDirectory );
