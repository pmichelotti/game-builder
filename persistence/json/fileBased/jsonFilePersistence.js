var fs = require( 'fs-extra' );
var nameSanitizer = require( '../../../utils/names/sanitizeUtils.js' );

//NTS - https://github.com/jprichardson/node-fs-extra

var VALUE_JSONS_FILENAME = 'value.jsons';

var persist = function( obj, startDir, callback ) {

  /*
   * Create the directory using fs-extra.mkdirs so that
   * it creates the hierarchy if it does not already exist.  Once
   * the directory to save into is created, the object is
   * serialized.
   */
  var makeAndSerialize = function() {
    fs.mkdirs( startDir, function( error ) {
      if ( error ) {
        callback( false, error );
        return;
      }
      serializeObjectValue( null, obj, startDir, callback );
    } );
  };

  /*
   * Check and see if the directory which we want to save into already exists.  If
   * it does, remove it and re-create it
   */
  fs.exists( startDir, function( dirExists ) {
    if ( dirExists ) {
      console.log( 'Directory ' + startDir + ' already exists - removing' );
      fs.remove( startDir, function( error ) {
        if ( error ) {
          callback( false, error );
          return;
        }
        makeAndSerialize();
      } );
    }
    else {
      makeAndSerialize();
    }

    return;
  } );

};

var persistKeyedObject = function( obj, keys, startDir, callback ) {

  var keysSuccessful = Array();
  var keysFailed = Array();

  keys.forEach( function( curKey ) {
    fs.mkdir( startDir + '/' + curKey.folder, function() {

      serializeObjectValue( curKey.key, obj[ curKey.key ], startDir + '/' + curKey.folder, function( success, msg ) {

        if ( success ) {
          keysSuccessful.push( curKey );
        }
        else {
          keysFailed.push( curKey );
        }

        if ( keysSuccessful.length + keysFailed.length >= keys.length ) {
          if ( keysFailed.length ) {
            callback( false, keysFailed );
            return;
          }
          else {
            callback( true );
            return;
          }
        }
      } );

    } );
  } );

};

/**
 * Given a starting directory which already exists and is empty
 *
 * 1. Create a value.jsons file representing the object
 * 2. Create a folder for each key in the current object
 * 3. Serialize the value for each key into its respective folder
 */
var persistJsonObject = function( obj, startDir, callback ) {

  var keysToWrite = Array();

  for ( var curKey in obj ) {
    keysToWrite.push( { "key" : curKey, "folder" : nameSanitizer.sanitizeForFolderName( curKey ) } );
  }

  var valueJsons = {
    "type" : "object",
    "keys" : keysToWrite
  };

  fs.writeFile( startDir + '/' + VALUE_JSONS_FILENAME, JSON.stringify( valueJsons ), function( error ) {
    if ( error ) {
      callback( false, error );
      return;
    }

    persistKeyedObject( obj, keysToWrite, startDir, callback );

  } );
};

var persistJsonArray = function( val, startDir, callback ) {

  var keysToWrite = Array();

  for ( var curKey in val ) {
    keysToWrite.push( { "key" : curKey, "folder" : nameSanitizer.sanitizeForFolderName( curKey ) } );
  }

  var valueJsons = {
      type : 'array',
      keys : keysToWrite
  };

  fs.writeFile( startDir + '/' + VALUE_JSONS_FILENAME, JSON.stringify( valueJsons ), function( error ) {

    if ( error ) {
      callback( false, error );
      return;
    }
    else {
      persistKeyedObject( val, keysToWrite, startDir, callback );
      return;
    }
  } );
};

/**
 * Given an existing starting directory, write an appropriate value.jsons for the literal
 */
var persistJsonLiteral = function( val, startDir, callback ) {

  var valueJsons = {
    type : ( typeof val ),
    value : val
  };

  fs.writeFile( startDir + '/' + VALUE_JSONS_FILENAME, JSON.stringify( valueJsons ), function( error ) {
    if ( error ) {
      callback( false, error );
      return;
    }
    else {
      callback( true );
      return;
    }
  } );

};

var serializeObjectValue = function( key, val, startDir, callback ) {

  if ( Array.isArray( val ) ) {
    console.log( 'JsonFilePersistence.serializeObjectValue - Determined value is of type Array' );
    persistJsonArray( val, startDir, callback );
    return;
  }

  if ( typeof val === 'object' ) {
    console.log( 'JsonFilePersistence.serializeObjectValue - Determined value is of type Object' );
    persistJsonObject( val, startDir, callback );
    return;
  }

  console.log( 'JsonFilePersistence.serializeObjectValue - Determined value is of type Literal' );
  persistJsonLiteral( val, startDir, callback );
  return;

};


/**
 *
 * @param callback Takes parameters success and data
 */
var deserialize = function( objectPath, callback ) {

  console.log( 'JsonFilePersistence.deserialize : deserializing ' + objectPath );

  fs.exists( objectPath, function( pathExists ) {
    if ( !pathExists ) {
      callback( false, 404 );
      return;
    }

    deserializeValue( objectPath, callback );

  } );

};

var deserializeObject = function( objectPath, keys, callback ) {

  var completedObject = {};

  var keysDeserialized = Array();
  var keysFailed = Array();

  keys.forEach( function( curKey ) {
    deserializeValue( objectPath + '/' + curKey.folder, function( success, curVal ) {
      if ( success ) {
        keysDeserialized.push( curKey );
        completedObject[ curKey.key ] = curVal;
      }
      else {
        keysFailed.push( curKey );
      }

      if ( keysDeserialized.length + keysFailed.length >= keys.length ) {
        if ( keysFailed.length ) {
          callback( false, keysFailed );
          return;
        }
        else {
          callback( true, completedObject );
          return;
        }
      }
    } );

  } );

};

var deserializeArray = function( objectPath, keys, callback ) {

  var completedArray = Array();

  deserializeObject( objectPath, keys, function( success, obj ) {

    if ( !success ) {
      callback( false, obj );
      return;
    }

    keys.forEach( function( curKey ) {
      completedArray.push( obj[ curKey.key ] );
    } );

    callback( true, completedArray );

  } );

};

var deserializeValue = function( objectPath, callback ) {

  fs.readFile( objectPath + '/' + VALUE_JSONS_FILENAME, function( error, data ) {
      if ( error ) {
        callback( false, error );
        return;
      }

      jsonsData = JSON.parse( data );

      console.log( 'JSONFilePersistence.deserializeValue : Item determined to be of type ' + jsonsData.type );

      switch( jsonsData.type ) {
        case( 'object' ):
          if ( jsonsData.value === null ) {
            callback( true, null );
          }
          else {
            deserializeObject( objectPath, jsonsData.keys, callback );
          }
          break;
        case( 'array' ):
          deserializeArray( objectPath, jsonsData.keys, callback );
          break;
        case( 'number' ):
          callback( true, Number( jsonsData.value ) );
          break;
        case( 'string' ):
          callback( true, jsonsData.value );
          break;
        case( 'boolean' ):
          callback( true, jsonsData.value !== 'false' );
          break;
      }
    } );

};

exports.put = persist;
exports.get = deserialize;

