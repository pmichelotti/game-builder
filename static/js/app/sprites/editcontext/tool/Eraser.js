define( [ 'sprites/sprite/VirtualPixel' ], function( VirtualPixel ) {

  var ERASING_STATE_NONE = 'none';
  var ERASING_STATE_ERASING = 'erasing';
  
  var Eraser = function() {

    this.name = "Eraser";
    this.id = "eraser-tool";
    this.icon = "icon-eraser";

    var erasingState = ERASING_STATE_NONE;
    var lastPixel = null;
    
    var erasePixel = function( oldPixel, eventEliciter ) {
      
      if ( oldPixel === lastPixel ) {
        return;
      }
      
      var newPixel = new VirtualPixel( { x : oldPixel.position.x, y : oldPixel.position.y }, '#FFFFFF', 0 );
      eventEliciter.draw( newPixel );
      
      lastPixel = newPixel;
      
    };
    
    this.listeners = {
      "mousedown" : function( event, editContext, eventEliciter, parameters ) {
                
        if ( eventEliciter && eventEliciter.draw && parameters.pixel ) {
          
          erasingState = ERASING_STATE_ERASING;
          
          erasePixel( parameters.pixel, eventEliciter );
          
        }
      }, 
      "mouseup" : function( event, editContext, eventEliciter, parameters ) {
        
        erasingState = ERASING_STATE_NONE;
        lastPixel = null;
        
      }, 
      "mouseenter" : function( event, eventContext, eventEliciter, parameters ) {
        
        if ( erasingState === ERASING_STATE_ERASING && eventEliciter && eventEliciter.draw && parameters.pixel ) {
          
          erasePixel( parameters.pixel, eventEliciter );
          
        }
      }
    };

  };

  return Eraser;

} );