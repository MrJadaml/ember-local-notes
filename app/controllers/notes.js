import Ember from "ember";

export default Ember.ArrayController.extend({
  queryParams: ['q'],
  q: null,

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
      var input = this.get('q');
      this.store.find('note', {q: input}).then(function(notes) {
        this.set('model', notes);
      }.bind(this));
      this.set('searchResults', '');
    },
    deleteNote: function(note) {
      note.destroyRecord().then(function() {
        this.flashMessage('success', 'Woot! That note is gone forever.');
      });
    }
  }
});
