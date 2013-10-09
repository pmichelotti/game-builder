define( [
         'application/GameBuilderApplication',
         'persistence/ServerPersistenceManager',
         'game/builder/GameBuilder',
         'screen/manager/ScreenManager',
         'screen/manager/ScreenType',
         'screen/singleFrameScreen/SingleFrameScreen',
         'screen/singleFrameScreen/SingleFrameScreenBuilder'
        ],
          function(
            GameBuilderApplication,
            PersistenceManager,
            GameBuilder,
            ScreenManager,
            ScreenType,
            SingleFrameScreen,
            SingleFrameScreenBuilder
          ) {

  /*
   * Screen Manager Setup
   */
  var screenTypes = [
                     new ScreenType( {
                      name : "Single Frame Screen",
                      screenConstructor : SingleFrameScreen,
                      screenBuilder : SingleFrameScreenBuilder
                     } )
                     ];

  var screenManager = new ScreenManager( {
    types : screenTypes
  } );

  /*
   * Sprite Manager Setup
   *
  var spriteRenderer = new DOMSpriteRenderer();

  var editPanel = new EditPanel( {
    spriteRenderer : spriteRenderer
  } );

  var viewPanel = new ViewPanel( {
    spriteRenderer : spriteRenderer
  } );

  var pencil = new Pencil();
  var eraser = new Eraser();
  var eyeDropper = new EyeDropper();

  var pallet = new Pallet();


  var editContext = new EditContext( {
      editPanel : editPanel,
      viewPanel : viewPanel,
      tools : [ pencil, eraser, eyeDropper ],
      pallet : pallet
  } );

  var spriteEditor = new SpriteEditor( {
    spriteFrameEditContext : editContext
  } );

  var spriteManagerOptions = {

  };
  */

  var gameBuilder = new GameBuilder( {
    screenManager : screenManager
  } );

  var application = new GameBuilderApplication( {
    gameBuilder : gameBuilder,
    persistenceManager : new PersistenceManager( { gamePathPrefix : "/games" } )
  } );

  ko.applyBindings( application );

  application.loadGames();

} );