define( [
          'sprites/editcontext/panel/EditPanelFactory',
          'sprites/editcontext/panel/ViewPanelFactory',
          'sprites/editcontext/tool/Eraser',
          'sprites/editcontext/tool/EyeDropper',
          'sprites/editcontext/tool/Pencil',
          'sprites/editcontext/panel/Pallet',
          'sprites/editcontext/EditContext',
          'sprites/spriteeditor/SpriteEditor',
          'sprites/manager/SpriteManager',
          'sprites/sprite/renderer/DOMSpriteRenderer'
        ],
        function (
            EditPanelFactory,
            ViewPanelFactory,
            Eraser,
            EyeDropper,
            Pencil,
            Pallet,
            EditContext,
            SpriteEditor,
            SpriteManager, 
            DOMSpriteRenderer
            ) {

  var setup = function() {
    
    var spriteRenderer = new DOMSpriteRenderer();

    var pencil = new Pencil();
    var eraser = new Eraser();
    var eyeDropper = new EyeDropper();

    var pallet = new Pallet();


    var editContext = new EditContext( {
        editPanelFactory : new EditPanelFactory(),
        viewPanelFactory : new ViewPanelFactory(),
        tools : [ pencil, eraser, eyeDropper ],
        pallet : pallet
    } );

    var spriteEditor = new SpriteEditor( {
      spriteFrameEditContext : editContext
    } );

    return new SpriteManager( {
      spriteEditor : spriteEditor,
      spriteRenderer : spriteRenderer
    } );

  };

  return setup;

} );
