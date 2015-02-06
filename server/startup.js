'use strict';

Meteor.startup(function() {
  if (AwsSettings.find().count() > 1) {
    throw new Meteor.Error('bad-data', 'too many AWS settings records found.');
  }
});
