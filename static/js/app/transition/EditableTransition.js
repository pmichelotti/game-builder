define( [ 'transition/Transition', 'transition/TransitionList' ], function( Transition, TransitionList ) {
  
  var EditableTransition = function( transition ) {
  
    var self = this;
    
    this.transition = transition;
    this.outType = ko.observable( transition.outType );
    this.outDuration = ko.observable( transition.outDuration );
    this.inType = ko.observable( transition.inType );
    this.inDuration = ko.observable( transition.inDuration );
    
    this.typeOptions = TransitionList;
    
    this.save = function() {
    
      return new Transition( {
        outType : self.outType(), 
        outDuration : self.outDuration(),
        inType : self.inType(), 
        inDuration : self.inDuration()
      } );
      
    };
    
  };
  
  return EditableTransition;
  
} );