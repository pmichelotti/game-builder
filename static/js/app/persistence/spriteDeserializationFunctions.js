define( [
    'sprites/sprite/Sprite',
    'sprites/sprite/SpriteFrameGroup',
    'sprites/sprite/SpriteFrame',
    'sprites/sprite/Size',
    'sprites/sprite/VirtualPixel'
  ],
  function(
    Sprite,
    SpriteFrameGroup,
    SpriteFrame,
    Size,
    VirtualPixel
  ) {

  var createPixelFromJSON = function( json ) {

    return new VirtualPixel( json.position, json.color, json.opacity );

  };

  var createPixelMatrixFromJSON = function( json ) {

    var matrix = Array();

    json.forEach( function( curColumn ) {
      var curMatrixColumn = Array();

      curColumn.forEach( function( curColumnItem ) {
        curMatrixColumn.push( createPixelFromJSON( curColumnItem ) );
      } );

      matrix.push( curMatrixColumn );
    } );

    return matrix;
  };

  var createSizeFromJSON = function( json ) {

    return new Size( json.width, json.height );

  };

  var createSpriteFrameFromJSON = function( json ) {

    var frameOptions = {
      name : json.name,
      size : createSizeFromJSON( json.size ),
      pixelSize : json.pizelSize,
      pixels : createPixelMatrixFromJSON( json.pixels )
    };

    return new SpriteFrame( json.id, frameOptions );
  };

  var createSpriteFrameGroupFromJSON = function( json, frames ) {

    var frameMap = {};

    frames.forEach( function( curFrame ) {
      frameMap[ curFrame.id ] = curFrame;
    } );

    var groupOptions = {
      name : json.name,
      spriteFrames : Array()
    };

    if ( json.spriteFrames && json.spriteFrames.length ) {
      json.spriteFrames.forEach( function( curFrameJson ) {
        groupOptions.spriteFrames.push( frameMap[ curFrameJson ] );
      } );
    }

    return new SpriteFrameGroup( json.id, groupOptions );

  };

  var createSpriteFromJSON = function( json ) {

    var spriteOptions = {
      name : json.name,
      spriteFrames : Array(),
      spriteFrameGroups : Array(),
      labels : json.labels
    };

    if ( json.spriteFrames && json.spriteFrames.length ) {
      json.spriteFrames.forEach( function( curFrameJSON ) {
        spriteOptions.spriteFrames.push( createSpriteFrameFromJSON( curFrameJSON ) );
      } );
    }

    if ( json.spriteFrameGroups && json.spriteFrameGroups.length ) {
      json.spriteFrameGroups.forEach( function( curFrameGroupJSON ) {
        spriteOptions.spriteFrameGroups.push( createSpriteFrameGroupFromJSON( curFrameGroupJSON, spriteOptions.spriteFrames ) );
      } );
    }

    return new Sprite( json.id, spriteOptions );
  };

  var makeSprite = function( json ) {
    return createSpriteFromJSON( json );
  };

  var deserializationFunctions = {
      makeSprite : makeSprite
  };

  return deserializationFunctions;

} );
