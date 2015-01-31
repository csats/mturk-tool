'use strict';

Template.home.events({
  'click button.NotifyWorkers': function() {
    Meteor.call('NotifyWorkers', {
      "Subject": 'AWS MTurk worker notification test',
      "WorkerId": AwsSettings.findOne().workerId,
      "MessageText": "Hi there, please acknowledge my test. Thanks!"
    }, function(error, result) {
        if (error) {
          console.error(error.message);
        } else {
          console.log('got result', result);
        }
    });
  },
  'click button.AssignQualification': function() {
    Meteor.call('AssignQualification', {
      "QualificationTypeId": AwsSettings.findOne().qualificationTypeId,
      "WorkerId": AwsSettings.findOne().workerId,
      "IntegerValue": 150,
      "SendNotification": true
    }, function(error, result) {
        if (error) {
          console.error(error.message);
        } else {
          console.log('got result', result);
        }
    });
  },
  'click button.RevokeQualification': function() {
    Meteor.call('RevokeQualification', {
      "QualificationTypeId": AwsSettings.findOne().qualificationTypeId,
      "SubjectId": AwsSettings.findOne().workerId,
      "Reason": 'testing'
    }, function(error, result) {
        if (error) {
          console.error(error.message);
        } else {
          console.log('got result', result);
        }
    });
  },
  'change #awsAccessKey': function (event, template) {
    var $elem = $(event.currentTarget);
    var value = $elem.val();
    AwsSettings.update(AwsSettings.findOne()._id, {$set: {awsAccessKey: value}});
  },
  'change #awsSecretKey': function (event, template) {
    var $elem = $(event.currentTarget);
    var value = $elem.val();
    AwsSettings.update(AwsSettings.findOne()._id, {$set: {awsSecretKey: value}});
  },
  'change #qualificationTypeId': function (event, template) {
    var $elem = $(event.currentTarget);
    var value = $elem.val();
    AwsSettings.update(AwsSettings.findOne()._id, {$set: {qualificationTypeId: value}});
  },
  'change #workerId': function (event, template) {
    var $elem = $(event.currentTarget);
    var value = $elem.val();
    AwsSettings.update(AwsSettings.findOne()._id, {$set: {workerId: value}});
  },
  'change select[name=sandbox]': function (event, template) {
    var $elem = $(event.currentTarget);
    var value = ($elem.val() === 'true');
    AwsSettings.update(AwsSettings.findOne()._id, {$set: {sandbox: value}});
  }
});

Template.home.helpers({
  isSelected: function(value) {
    if (AwsSettings.findOne().sandbox === value) {
      return 'selected';
    }
  }
});
