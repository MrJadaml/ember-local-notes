import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({
  host: ENV.adapterURL || ENV.ADAPTER_URL
});
