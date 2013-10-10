define( [
          'sprites/sprite/renderer/DOMSpriteRenderer',
          'sprites/editcontext/panel/EditPanel',
          'sprites/editcontext/panel/ViewPanel',
          'sprites/editcontext/tool/Eraser',
          'sprites/editcontext/tool/EyeDropper',
          'sprites/editcontext/tool/Pencil',
          'sprites/editcontext/panel/Pallet',
          'sprites/editcontext/EditContext',
          'sprites/spriteeditor/SpriteEditor',
          'sprites/manager/SpriteManager'
        ],
        function (
            DOMSpriteRenderer,
            EditPanel,
            ViewPanel,
            Eraser,
            EyeDropper,
            Pencil,
            Pallet,
            EditContext,
            SpriteEditor,
            SpriteManager
            ) {

  var setup = function() {

    /*
     * Sprite Manager Setup
     */
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

    return new SpriteManager( {
      spriteEditor : spriteEditor,
      spriteRenderer : spriteRenderer
    } );

  };

  return setup;

} );
