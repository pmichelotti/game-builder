define( [ 'screenFlow/EditableScreenFlow', 'screenFlow/EditableScreenFlowNode', 'screenFlow/EditableScreenFlowBranch', 'screenFlow/manager/NewScreenFlowNodeForm', 'screenFlow/manager/NewScreenFlowBranchForm' ], function( EditableScreenFlow, EditableScreenFlowNode, EditableScreenFlowBranch, NewScreenFlowNodeForm, NewScreenFlowBranchForm ) {
  
  var ScreenFlowManager = function( options ) {
    
    var self = this;
    
    this.game = ko.observable();
    
    this.currentEditableScreenFlowNode = ko.observable();
    this.currentEditableScreenFlowBranch = ko.observable();
    
    this.newScreenFlowNodeForm = ko.observable(); 
    this.newScreenFlowBranchForm = new NewScreenFlowBranchForm( {
      callback : function( screenFlowBranch ) {
        if ( self.currentEditableScreenFlowNode() ) {
          self.currentEditableScreenFlowNode().branches.push( screenFlowBranch );
        }
      }
    } );
    
    this.manage = function( game ) {
      self.clear();
      self.game( game );
      
      self.newScreenFlowNodeForm( new NewScreenFlowNodeForm( {
        screens : self.game().screens, 
        callback : function( screenFlowNode ) {
          if ( self.game() && self.game().screenFlow ) {
            self.game().screenFlow.screenFlowNodes.push( screenFlowNode );
          }
        }
      } ) );
    };
    
    this.editScreenFlowNode = function( node ) {
      self.currentEditableScreenFlowNode( new EditableScreenFlowNode( node ) );  
      self.currentEditableScreenFlowBranch( null );
    };
    
    this.editScreenFlowBranch = function( branch ) {
      self.currentEditableScreenFlowBranch( new EditableScreenFlowBranch( branch ) );
    };
    
    this.removeBranchFromCurrentNode = function( branch ) {
      if ( self.currentEditableScreenFlowNode() ) {
        self.currentEditableScreenFlowNode().branches.remove( branch );
      }
    };
    
    this.saveCurrentNode = function() {
      if ( self.currentEditableScreenFlowNode() ) {
        self.game().screenFlow.screenFlowNodes.replace( self.currentEditableScreenFlowNode().save() );
        self.currentEditableScreenFlowNode( null );
        self.currentEditableScreenFlowBranch( null );
      }
    };
    
    this.saveCurrentBranch = function() {
      if ( self.currentEditableScreenFlowBranch() && self.currentEditableScreenFlowNode() ) {
        self.currentEditableScreenFlowNode().branches.replace( self.currentEditableScreenFlowBranch().save() );
        self.currentEditableScreenFlowBranch( null );
      }
    };
    
    this.clear = function() {
      self.game( null );
      self.currentEditableScreenFlowNode( null );
      self.currentEditableScreenFlowBranch( null );
      
      if ( self.newScreenFlowNodeForm() ) {
        self.newScreenFlowNodeForm().clear();
      }
      
      self.newScreenFlowBranchForm.clear();
    };
    
  };
  
  return ScreenFlowManager;
  
} );