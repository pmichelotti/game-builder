define( [], function() {

  var SimpleDOMSpriteRenderer = function() {

    this.render = function( spriteFrame, position ) {

      if ( !spriteFrame ) {
        return $( '<div>' ).addClass( 'rendered-sprite-container' );
      }
      
      position = position || { x : 0, y : 0 };

      var spriteSize = spriteFrame.size;
      var spritePixelSize = spriteFrame.pixelSize;

      if ( typeof spriteSize === 'function' ) {
        spriteSize = spriteSize();
      }
      if ( typeof spritePixelSize === 'function' ) {
        spritePixelSize = spritePixelSize();
      }

      var containerDOM = $( '<div>' ).css( {
        width : spriteSize.width * spritePixelSize,
        height : spriteSize.height * spritePixelSize,
        position : "absolute",
        top : position.y + "px",
        left : position.x + "px"
      } ).addClass( 'rendered-sprite-container' );

      var renderPixel = function( x, y ) {
        var curPixel = spriteFrame.pixels[ x ][ y ];
        
        var renderedPixel = $( '<div>' ).css( {
          width : spritePixelSize,
          height : spritePixelSize,
          position : "absolute",
          top : y * spritePixelSize,
          left : x * spritePixelSize,
          "background-color" : curPixel.color,
          opacity : curPixel.opacity
        } ).
        addClass( 'rendered-sprite-pixel' );

        return renderedPixel;
      };

      for ( var curX = 0; curX < spriteSize.width; curX++ ) {
        for ( var curY = 0; curY < spriteSize.height; curY++ ) {

          var renderedPixel = renderPixel( curX, curY );

          containerDOM.append( renderedPixel );
        }
      }

      return containerDOM;

    };

  };

  return SimpleDOMSpriteRenderer;

} );