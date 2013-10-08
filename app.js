var gameBuilderServer = require( './server/gameBuilderServer' );

var staticDirectory = __dirname + '/static';
var viewsDirectory = __dirname + '/templates';
var gamesDirectory = __dirname + '/test-game-directory';

console.log( 'static directory ' + staticDirectory );
console.log( 'views directory ' + viewsDirectory );


gameBuilderServer.start( staticDirectory, viewsDirectory, gamesDirectory );
