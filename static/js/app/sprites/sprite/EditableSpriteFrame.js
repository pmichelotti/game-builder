define( [ 'sprites/sprite/SpriteFrame', 'sprites/sprite/VirtualPixel', 'sprites/sprite/EditableSize', 'sprites/sprite/EditableVirtualPixel' ], function( SpriteFrame, VirtualPixel, EditableSize, EditablePixel ) {

  var EditableSpriteFrame = function( spriteFrame ) {

    var self = this;
    
    this.spriteFrame = spriteFrame;
    
    this.name = ko.observable( spriteFrame.name );
    this.size = new EditableSize( spriteFrame.size ); 
    this.pixelSize = ko.observable( spriteFrame.pixelSize );
    this.pixels = ko.observableArray();
    
    var initializePixelMatrix = function() {
    
      /*
       * Empty the array of pixels
       */
      self.pixels.removeAll();
      
      for ( var curX = 0; curX < self.size.width(); curX++ ) {
        
        var curYArray = ko.observableArray();

        for ( var curY = 0; curY < self.size.height(); curY++ ) {
          if ( self.spriteFrame.pixels && self.spriteFrame.pixels[ curX ][ curY ] ) {
            curYArray.push( new EditablePixel( self.spriteFrame.pixels[ curX ][ curY ] ) );
          }
          else {
            curYArray.push( new EditablePixel( { x : curX, y : curY } ) );
          }
        }

        self.pixels.push( curYArray );
        
      }

    };
    
    initializePixelMatrix();
    
    var updatePixelMatrix = function() {
      
      /*
       * Save off the current pixels
       */
      var oldFrame = Array();
      
      for ( var curX = 0; curX < self.pixels().length; curX++ ) {
        var curYArray = Array();
        
        for ( var curY = 0; curY < self.pixels()[ curX ]().length; curY++ ) {
          
          curYArray.push( self.pixels()[ curX ]()[ curY ] );
          
        }
        
        oldFrame.push( curYArray );
        
      }
      
      self.pixels.removeAll();
      
      /*
       * Place the saved pixels into the newly sized matrix
       */
      for ( var curX = 0; curX < self.size.width(); curX++ ) {
        
        var curYArray = ko.observableArray();

        for ( var curY = 0; curY < self.size.height(); curY++ ) {
          if ( oldFrame[ curX ] && oldFrame[ curX ][ curY ] ) {
            curYArray.push( oldFrame[ curX ][ curY ] );
          }
          else {
            curYArray.push( new EditablePixel( { x : curX, y : curY } ) );
          }
        }
        
        self.pixels.push( curYArray );
        
      }
      
    };
    
    this.size.subscribe( updatePixelMatrix );

    
    this.draw = function( pixel ) {

      if ( self.pixels && self.pixels()[ pixel.position.x ] && self.pixels()[ pixel.position.x ]()[ pixel.position.y ] ) {
        self.pixels()[ pixel.position.x ]()[ pixel.position.y ].update( pixel );
        return;
      }

      throw "Pixel to draw is at position " + pixel.position.x + ", " + pixel.position.y + " which is outside the area of the Sprite";

    };

    this.erase = function( pixel ) {

      this.draw( new VirtualPixel( { x : pixel.position.x, y : pixel.position.y } ) );

    };

    this.save = function() {
      
      var savedPixelMatrix = Array();
      var savedSize = self.size.save();
      
      for ( var curX = 0; curX < savedSize.width; curX++ ) {
        var curYArray = Array();
        
        for ( var curY = 0; curY < savedSize.height; curY++ ) {
          curYArray.push( self.pixels()[ curX ]()[ curY ].save() );
        }
        
        savedPixelMatrix.push( curYArray );
      }
      

      var newSpriteFrame = new SpriteFrame( self.spriteFrame.id, {
        name : self.name(),
        size : savedSize,
        pixelSize : self.pixelSize(),
        pixels : savedPixelMatrix
      } );

      return newSpriteFrame;

    };

  };

  return EditableSpriteFrame;

} );