angular.module('starter.controllers', [])

  .controller('DashCtrl',['$scope','$http','$location','$ionicPopup', function ($scope,$http,$location,$ionicPopup) {
    $scope.questions = [
      {
        question: 'My booking appointment experience (select all that apply)',
        type: "multiselect",
        answer: [],
        options: [
          {
            "text": "Efficient",
            "checked": true
          },
          {
            "text": "Rushed",
            "checked": false
          },
          {
            "text": "Unpleasant",
            "checked": false
          },
          {
            "text": "Helpful",
            "checked": false
          },
          {
            "text": "Friendly",
            "checked": false
          }],
        show: true
      },
      {
        question: 'The spa ambience is an inviting place to be',
        type: "singleselect",
        options: ["Strongly Agree", "Agree", "Somewhat Agree", "Disagree"],
        show: false
      },
      {
        question: 'The spa employees ware professional and curteous',
        type: "singleselect",
        options: ["Strongly Agree", "Agree", "Somewhat Agree", "Disagree"],
        show: false
      },
      {
        question: 'My services were performed with attention to detail by therapist',
        type: "singleselect",
        options: ["Strongly Agree", "Agree", "Somewhat Agree", "Disagree"],
        show: false
      },
      {
        question: 'How likely is that you would recommend the spa to a friend or colleague',
        type: "singleselect",
        options: ["no at all likely", "likely", "more likely", "extremely likely"],
        show: false
      },
      {
        question: 'Suggestions to enhance the spa experience further',
        type: "textinputs",
        show: false
      },
      {
        question:'User Detail',
        type:'userDetail',
        show:false
      }
    ];

    $scope.onNext = function (question, index) {
      question.show = false;
      $scope.questions[index + 1].show = true;
    }

    $scope.onPrevious = function (question, index) {
      question.show = false;
      $scope.questions[index - 1].show = true;
    }

    $scope.onMultiSelect = function (question, item, isChecked) {
      if (isChecked) {
        question.answer.push(item.text);
      } else {
        var i = question.answer.indexOf(item.text);
        if(i != -1) {
          question.answer.splice(i, 1);
        }
      }
    }

    $scope.onSubmit = function () {
      console.log($scope.questions);
      var responses = [];
      var mailBody = '<div style="width: 500px;border:1px solid black;">'
      for (i = 0; i < $scope.questions.length-1; i++) {
        mailBody =mailBody+'<div style="background-color: #D9D9D9;height: 50px;text-align: center;vertical-align: middle;display: inline-block;width: 500px;;font-size: 16px;">'+$scope.questions[i].question+'</div><div style="height: 50px;padding: 5px;font-size: 14px;">'+$scope.questions[i].answer+'</div>'
        var response = {
          question: $scope.questions[i].question,
          answer: $scope.questions[i].answer
        };
        responses.push(response);
      }
      mailBody = mailBody+'</div>'



      $http({
        method: "POST",
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        data: {
          "key": '5SfGDLDXhDFotflAbyHAtQ',
          "message": {
            "from_email": "yogiswar_1987@yahoo.co.in",
            "to": [
              {
                "email": "patil_pri056@yahoo.com",
                "name": "Yogesh",
                "type": "to"
              }
            ],
            "autotext": "true",
            "subject": "Feedback from"+ $scope.questions[$scope.questions.length-1].answer.email,
            "html": mailBody
          }
        }
      }).success(function(response) {
        var alertPopup = $ionicPopup.alert({
          title: 'Feedback submit successful',
          template: 'Thanks for the feedback',
        });
        alertPopup.then(function(res) {
          $location.path('/chats');
        });
      });
    }
  }])


  .controller('ChatsCtrl', function ($scope, Chats) {

  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
