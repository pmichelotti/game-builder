define(
		[ 'sprite/SpriteFrame',
		  'sprite/SpriteFrameGroup',
		  'sprite/EditableSpriteFrameGroup',
		  'util/uniqueIdUtil',
		  'sprite/Sprite'],
		function( SpriteFrame, SpriteFrameGroup, EditableSpriteFrameGroup, uniqueIdUtil, Sprite ) {

	var EditableSprite = function( sprite ) {

		var self = this;

		this.sprite = sprite;

		this.name = ko.observable( sprite.name );

		this.spriteFrames = ko.observableArray( sprite.spriteFrames );
		this.spriteFrameGroups = ko.observableArray( sprite.spriteFrameGroups.map(
				function( curSpriteFrameGroup ) {
					return new EditableSpriteFrameGroup( curSpriteFrameGroup );
				} ) );
		this.labels = ko.observableArray( sprite.labels );

		this.addSpriteFrame = function( options ) {

			var newSpriteFrame;

			if ( options.spriteFrame ) {
				newSpriteFrame = SpriteFrame.createAsCopy( options );
				self.spriteFrames.push( newSpriteFrame );
				return newSpriteFrame;
			}
			else {
				if ( !options.id || !options.name ) {
					throw "When adding a sprite either an existing sprite or an id and a name must be specified";
				}

				newSpriteFrame = new SpriteFrame( options.id, {
					name : options.name,
					size : options.size,
					pixelSize : options.pixelSize } );

				self.spriteFrames.push( newSpriteFrame );

				return newSpriteFrame;

			}
		};

		this.removeSpriteFrame = function( frame ) {

			var frameIndex = self.spriteFrames.indexOf( frame );

			if ( self.spriteFrames.indexOf( frame ) === -1 ) {
				return;
			}

			self.spriteFrames.splice( frameIndex, 1 );

			self.spriteFrameGroups().forEach( function( curSpriteFrameGroup ) {
				curSpriteFrameGroup.removeSpriteFrame( frame );
			} );

		};

		this.updateSpriteFrame = function( frame ) {

			var framesWithTheSameId = self.spriteFrames().filter( function( curSpriteFrame ) {
				if ( curSpriteFrame.id === frame.id ) {
					return true;
				}

				return false;
			} );

			if ( framesWithTheSameId.length === 0 ) {
				return;
			}

			if ( framesWithTheSameId.length > 1 ) {
				throw "An error has occurred resulting in duplicate frame IDs";
			}

			var frameIndex = self.spriteFrames.indexOf( framesWithTheSameId[ 0 ] );

			self.spriteFrames.splice( frameIndex, 1, frame );

			self.spriteFrameGroups().forEach( function( curSpriteFrameGroup ) {
				curSpriteFrameGroup.updateSpriteFrame( frame );
			} );
		};

		this.addSpriteFrameGroup = function( options ) {

			var newId = options.id || uniqueIdUtil.getId( options.name );

			var spriteFrameGroup = new SpriteFrameGroup( newId, {
				name : options.name
			} );

			self.spriteFrameGroups.push( new EditableSpriteFrameGroup( spriteFrameGroup ) );
		};

		this.removeSpriteFrameGroup = function( spriteFrameGroup ) {
			//TODO;
		};

		this.addLabel = function( label ) {
			if ( self.labels.indexOf( label ) === -1 ) {
				self.labels.push( label );
			}

			return label;
		};

		this.removeLabel = function( label ) {
			var labelIndex = self.labels.indexOf( label );

			if ( labelIndex !== -1 ) {
				self.labels.splice( labelIndex, 1 );
			}

			return label;
		};

		this.save = function() {

			return new Sprite( self.sprite.id, {
				name : self.name(),
				spriteFrames : self.spriteFrames(),
				spriteFrameGroups : self.spriteFrameGroups(),
				labels : self.labels()
			} );

		};
	};

	return EditableSprite;

} );