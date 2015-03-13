import Ember from "ember";

export default Ember.ArrayController.extend({
  queryParams: ['query'],
  query: null,

  rightCol: function() {
    return this.model.filter(function(note){
      return (note.id % 2 === 0);
    });
  }.property('model'),

  leftCol: function() {
    return this.model.filter(function(note){
      return (note.id % 2 !== 0);
    });
  }.property('model'),

  // //Nothing iterating over this computed property
  // filteredNotes: function () {
  //   if(this.get('query') && this.get('query').trim()){
  //     return this.get('model').filter(function (record) {
  //       return record.get('title').indexOf(this.get('query')) > -1;
  //     }.bind(this));
  //   } else {
  //     return this.get('model');
  //   }
  // }.property('model.@each', 'query'),

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

    deleteNote: function(note) {
      note.destroyRecord().then(function() {
        this.flashMessage('success', 'Woot! That note is gone forever.');
      });
    },

    noteSearch: function() {
      var input = this.get('query');
      this.store.find('note', {query: input}).then(function(notes) {
        this.set('model', notes);
      }.bind(this));
    },
  }
});
