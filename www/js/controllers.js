angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope) {
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
        question.answer.splice(item.text);
      }
    }

    $scope.onSubmit = function () {
      console.log($scope.questions);
      var responses = [];

      for (i = 0; i < $scope.questions.length; i++) {
        var response = {
          question: $scope.questions[i].question,
          answer: $scope.questions[i].answer
        };
        responses.push(response);
      }

      console.log(responses);
    }
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
