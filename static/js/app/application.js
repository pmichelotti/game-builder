define( [
         'application/GameBuilderApplication',
         'persistence/ServerPersistenceManager',
         'game/builder/GameBuilder',
         'screen/manager/ScreenManager',
         'screen/manager/ScreenType',
         'screen/singleFrameScreen/SingleFrameScreen',
         'screen/singleFrameScreen/SingleFrameScreenBuilder',
         'setup/screenFlowManagerSetup',
         'setup/spriteManagerSetup', 
         'setup/interactionManagerSetup'
        ],
          function(
            GameBuilderApplication,
            PersistenceManager,
            GameBuilder,
            ScreenManager,
            ScreenType,
            SingleFrameScreen,
            SingleFrameScreenBuilder,
            screenFlowManagerSetup,
            spriteManagerSetup, 
            interactionManagerSetup
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

  var screenFlowManager = screenFlowManagerSetup();
  
  var spriteManager = spriteManagerSetup();
  
  var interactionManager = interactionManagerSetup();

  var gameBuilder = new GameBuilder( {
    screenManager : screenManager,
    spriteManager : spriteManager, 
    interactionManager : interactionManager,
    screenFlowManager : screenFlowManager
  } );

  var application = new GameBuilderApplication( {
    gameBuilder : gameBuilder,
    persistenceManager : new PersistenceManager( { gamePathPrefix : "/games" } )
  } );

  ko.applyBindings( application );

  application.loadGames();

} );