'use strict';

var getMturk = function() {
  var awsSettingsDoc= AwsSettings.findOne();
  var creds = {
    accessKey: awsSettingsDoc.awsAccessKey,
    secretKey: awsSettingsDoc.awsSecretKey
  };
  return new MTurk({creds: creds, sandbox: awsSettingsDoc.sandbox});
};

Meteor.methods({
  'AssignQualification': function(params) {
    check(params, {
      "QualificationTypeId": String,
      "WorkerId": String,
      "IntegerValue": Number,
      "SendNotification": Boolean
    });
    var mturk = getMturk();
    var wrapped = Meteor.wrapAsync(mturk.AssignQualification, mturk);
    try {
      return wrapped(params);
    } catch (err) {
      console.error(err);
      throw new Meteor.Error('assign-failed', err.message);
    }
  },
  'RevokeQualification': function(params) {
    check(params, {
      "QualificationTypeId": String,
      "SubjectId": String,
      "Reason": String
    });
    var mturk = getMturk();
    var wrapped = Meteor.wrapAsync(mturk.RevokeQualification, mturk);
    try {
      return wrapped(params);
    } catch (err) {
      console.error(err);
      throw new Meteor.Error('revoke-failed', err.message);
    }
  },
  'NotifyWorkers': function(params) {
    check(params, {
      "Subject": String,
      "MessageText": String,
      "WorkerId": String
    });
    var mturk = getMturk();
    var wrapped = Meteor.wrapAsync(mturk.NotifyWorkers, mturk);
    try {
      return wrapped(params);
    } catch (err) {
      console.error(err);
      throw new Meteor.Error('notify-failed', err.message);
    }
  }
});
