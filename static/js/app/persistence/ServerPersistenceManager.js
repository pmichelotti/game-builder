define( [ 'persistence/deserializationFunctions' ], function( deserializationFunctions ) {

  var PersistenceManager = function( options ) {

    options = options || {};

    var self = this;

    this.gamePathPrefix = options.gamePathPrefix;

    this.saving = ko.observable( false );
    this.loading = ko.observable( false );

    this.saveGame = function( game ) {

      self.saving( true );

      var gameUrl = self.gamePathPrefix + '/' + game.id;

      $.ajax( gameUrl, {

        method : "PUT",
        data : JSON.stringify( game.toJSON() ),
        headers : {
          "content-type" : "application/json"
        },
        success : function() {
          alert( 'Saved Successfully' );
          self.saving( false );
        }

      } );

    };

    this.loadGame = function( gameId, callback ) {

      self.loading( true );

      var gameUrl = self.gamePathPrefix + '/' + gameId + '.json';

      $.ajax( gameUrl, {

        method : "GET",
        success : function( data ) {

          //build the game object and call the callback
          var retGame = deserializationFunctions.makeGame( data );

          callback( true, retGame );

          self.loading( false );

        },
        error : function() {
          alert( 'Error loading game ' + gameId );
          callback( false );
          self.loading( false );
        }
      } );
    };

    this.loadGames = function( callback ) {

      self.loading( true );

      var gameUrl = self.gamePathPrefix + '.json';

      var gamesToLoad;
      var gamesLoaded = Array();
      var gamesFailed = Array();

      /*
       * Run the internal load game method.  If it is successful add the loaded game to the
       * list of games loaded.  If it fails, add the game ID to the list of failures.
       */
      var loadSingleGame = function( gameId ) {

        self.loadGame( gameId, function( success, game ) {
          if ( success ) {
            gamesLoaded.push( game );
          }
          else {
            gamesFailed.push( gameId );
          }

          if ( ( gamesLoaded.length + gamesFailed.length ) >= ( gamesToLoad.length ) ) {
            if ( gamesFailed.length ) {
              callback( false, gamesLoaded, gamesFailed );
              return;
            }

            callback( true, gamesLoaded );
            return;
          }

        } );
      };

      /*
       * Request all the IDs of known games
       */
      $.ajax( gameUrl, {

        method : "GET",
        success : function( data ) {

          gamesToLoad = data;

          if ( gamesToLoad.length === 0 ) {
            callback( true, [] );
            return;
          }

          data.forEach( function( curGameId ) {
            loadSingleGame( curGameId );
          } );

        },
        error : function() {
          alert ( 'An error was encountered loading the game list' );
          callback( false );
        }

      } );
    };
  };

  return PersistenceManager;

} );