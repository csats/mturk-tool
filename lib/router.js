'use strict';

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {
  name: 'home',
  waitOn: function() {
    return [Meteor.subscribe('awsSettings')];
  },
  data: function() {
    return {
      awsSettingsDoc: AwsSettings.findOne()
    };
  }
});
