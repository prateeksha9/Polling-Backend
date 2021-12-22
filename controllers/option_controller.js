const Questions = require("../models/question");
const Options = require("../models/option");

module.exports.addVote = function (req, res) {
  Options.findById({ _id: req.params.id }, function (err, option) {
    if (err) {
      return res.json(500, {
        message: "Error in finding message",
        data: err,
      });
    }

    if (option) {
      const currentvote = option.votes + 1;
      console.log("currentvote", option.votes);
      Options.updateOne(
        { _id: req.params.id },
        { votes: currentvote },
        function (err, updatedVotes) {
          if (err) {
            return res.json(500, {
              message: "Votes not updated",
              data: err,
            });
          }
          return res.json(200, {
            message: "Option votes updated",
          });
        }
      );
      option.save();
    }
  });
};

module.exports.deleteOption = function (req, res) {
  Options.findById({ _id: req.params.id }, function (err, option) {
    if (err) {
      return res.json(500, {
        message: "option not found",
        data: err,
      });
    }
    if (option) {
      //   const optionId = option._id;
      //   const questionId = option.question;
      //   console.log(optionId, questionId);

      //   Questions.findOne(
      //     { _id: option.question },
      //     function (err, question) {
      //       if (err) {
      //         return res.json(500, {
      //           message: "Question to related option is not found",
      //           data: err,
      //         });
      //       }

      //       if (question) {
      //         Questions.updateOne(
      //           { _id: option.question },
      //           {
      //             $pull: {
      //               option: [optionId],
      //             },
      //           }
      //         );
      //       }
      //     },
      //     function (err, questionUpdated) {
      //       if (err) {
      //         return res.json(500, {
      //           message: "Question cannot be updated",
      //           data: err,
      //         });
      //       }

      //       return res.json(200, {
      //         message: "Option from Question deleted",
      //       });
      //     }
      //   );
      //   question.save();

      Options.findByIdAndDelete(
        { _id: req.params.id },
        function (err, deletedOption) {
          if (err) {
            return res.json(500, {
              message: "Option Cannot be deleted",
              message: data,
            });
          }

          return res.json(200, {
            message: "Option deleted Successfully",
          });
        }
      );
    }
  });
};
