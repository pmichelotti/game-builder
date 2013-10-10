
ko.bindingHandlers.spritearea = {
  init : function( element, valueAccessor, allBindingsAccessor, viewModel, bindingContext ) {
    var spriteContext = ko.unwrap( valueAccessor() );

    var renderSprite = function() {
      spriteContext.render( element );
    };

    if ( spriteContext.dirty ) {
      spriteContext.dirty.subscribe( function( newValue ) {
        if ( newValue ) {
          renderSprite();
        }
      } );
    }

    renderSprite();

  }
};


ko.extenders.replacable = function( target ) {

  target.replace = function( item ) {
    if ( !item.id ) {
      console.log ( 'Item does not have an id' );
      return;
    }

    if ( !target.splice ) {
      console.log ( 'Target is not an array' );
      return;
    }

    if ( !target().length ) {
      console.log ( 'Array is empty' );
      return;
    }

    var targetArray = target();

    var itemArray = targetArray.filter( function( curTargetItem ) {
      if ( curTargetItem.id && curTargetItem.id === item.id ) {
        return true;
      }
      return false;
    } );

    itemArray.forEach( function( curItem ) {
      target.splice( target.indexOf( curItem ), 1, item );
    } );
  };

  return target;
};