define( [ 'sprites/sprite/VirtualPixel' ], function( VirtualPixel ) {

  var DRAWING_STATE_NONE = 'none';
  var DRAWING_STATE_DRAWING = 'drawing';
  
  var Pencil = function() {

    this.name = "Pencil";
    this.id = "pencil-tool";
    this.icon = "icon-pencil";

    var drawingState = DRAWING_STATE_NONE;
    var lastPixel = null;
    
    this.listeners = {
      "mousedown" : function( event, editContext, eventEliciter, parameters ) {
        
        if ( eventEliciter && eventEliciter.draw && parameters.pixel ) {
          drawingState = DRAWING_STATE_DRAWING;
          
          if ( parameters.pixel === lastPixel ) {
            return;
          }
          
          var pixel = parameters.pixel;

          var newPixel = new VirtualPixel( { x : pixel.position.x, y : pixel.position.y }, editContext.pallet.color(), editContext.pallet.opacity() );
          eventEliciter.draw( newPixel );
          
          lastPixel = newPixel;
          
        }
      }, 
      "mouseup" : function( event, editContext, eventEliciter, parameters ) {
        
        drawingState = DRAWING_STATE_NONE;
        lastPixel = null;
        
      }, 
      "mouseenter" : function( event, editContext, eventEliciter, parameters ) {
        
        if ( drawingState === DRAWING_STATE_DRAWING && eventEliciter && eventEliciter.draw && parameters.pixel ) {
           
          if ( parameters.pixel === lastPixel ) {
            return;
          }
          
          var pixel = parameters.pixel;

          var newPixel = new VirtualPixel( { x : pixel.position.x, y : pixel.position.y }, editContext.pallet.color(), editContext.pallet.opacity() );
          eventEliciter.draw( newPixel );
          
          lastPixel = newPixel;
          
        }
      }
    };
    
    this.reset = function() {
      drawingState = DRAWING_STATE_NONE;
    };

  };

  return Pencil;

} );