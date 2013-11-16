define( [ 'sprites/sprite/renderer/SimpleDOMSpriteRenderer' ], function( SpriteRenderer ) {
  
  var spriteRenderer = new SpriteRenderer();
  
  ko.bindingHandlers.simplesprite = {
    
      update : function( element, valueAccessor, allBindingsAccessor, viewModel, bindingContext ) {
        
        var frame = ko.unwrap( valueAccessor() );
        
        if ( frame ) {
        
          var $element = $( element );
          
          var renderedSprite = spriteRenderer.render( frame );
          
          $element.empty();
          $element.append( renderedSprite );
          
        }
        
      }
  
  };
  
} );