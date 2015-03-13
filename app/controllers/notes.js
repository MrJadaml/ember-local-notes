import Ember from "ember";

export default Ember.ArrayController.extend({
  queryParams: ['query'],
  query: null,

  rightCol: function() {
    return this.store.filter('note', function(note){
      return (note.id % 2 == 0);
    });
  }.property(),
  leftCol: function () {
    return this.store.filter('note', function(note){
      return (note.id % 2 !== 0);
    });
  }.property(),


  actions: {
    newNote: function() {
      var body = this.get('noteCopy');
      if (body) {
        var note = this.store.createRecord('note', {
          title: this.get('noteTitle'),
          body: this.get('noteCopy')
        });
        note.save();
      }
      this.set('noteTitle', '');
      this.set('noteCopy', '');
    },
    noteSearch: function() {
      var input = this.get('query');
      this.store.find('note', {query: input}).then(function(notes) {
        this.set('model', notes);
      }.bind(this));
      debugger;
      this.set('searchResults', '');
    },
    deleteNote: function(note) {
      note.destroyRecord().then(function() {
        this.flashMessage('success', 'Woot! That note is gone forever.');
      });
    }
  }
});
