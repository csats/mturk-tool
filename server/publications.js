'use strict';

Meteor.publish('awsSettings', function() {
  var awsSettingsCursor = AwsSettings.find();
  if (awsSettingsCursor.count() < 1) {
    console.log('no awsSettingsDoc found, creating...');
    AwsSettings.insert({sandbox:true});
  }
  return [ awsSettingsCursor ];
});

AwsSettings.allow({
  update: function(userId, doc, fieldNames, modifier) {
    return true;
  }
});
