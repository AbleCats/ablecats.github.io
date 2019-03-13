let app = require("scripts/app.js");
let lottie = require("scripts/lottie.js");

let git = new app.git();

function animationOfROView(alpha, handler) {
  if (alpha)
    $("ROView")
      .animator.moveY(35)
      .makeOpacity(1)
      .animateWithCompletion({
        duration: 0.4,
        completion: () => {
          if (handler) handler();
        }
      });
  else
    $("ROView")
      .animator.moveY(-35)
      .makeOpacity(0)
      .animateWithCompletion({
        duration: 0.4,
        completion: () => {
          if (handler) handler();
        }
      });
}

const Future = [
  {
    type: "view",
    props: {},
    layout: $layout.fill,
    views: [
      {
        type: "label",
        props: {
          align: $align.center,
          font: $font("bold", 20),
          text: "This is Future, Building..."
        },
        layout: (make, view) => {
          make.top.inset(20);
          make.width.equalTo(view.super);
        }
      }
    ]
  }
];

const Create = [
  {
    type: "view",
    props: {},
    views: [
      {
        type: "label",
        props: {
          align: $align.center,
          font: $font("bold", 20),
          text: "Create A New Repos"
        },
        layout: (make, view) => {
          make.top.inset(20);
          make.width.equalTo(view.super);
        }
      },
      {
        type: "button",
        props: {
          title: "Next"
        },
        layout: function (make, view) {
          make.bottom.inset(20);
          make.width.equalTo(64);
          make.centerX.equalTo(view.super);
        },
        events: {
          tapped: sender => {
            $("gallery").page++;
          }
        }
      }
    ]
  },
  {
    type: "view",
    props: {},
    views: [
      {
        type: "label",
        props: {
          id: "reposNameTitle",
          align: $align.center,
          text: "New Repo Name",
          font: $font("bold", 20)
        },
        layout: (make, view) => {
          make.top.inset(20);
          make.width.equalTo(view.super);
        }
      },
      {
        type: "label",
        props: {
          text: "Must",
          align: $align.center,
          font: $font("bold", 12),
          textColor: $color("#cccccc")
        },
        layout: (make, view) => {
          make.top.equalTo(view.prev.bottom).offset(5);
          make.width.equalTo(view.super);
        }
      },
      {
        type: "input",
        props: {
          id: "reposName",
          type: $kbType.ascii,
          align: $align.center,
          placeholder: "Here Input Your New Repo Name"
        },
        layout: (make, view) => {
          make.height.equalTo(32);
          make.left.right.inset(20);
          make.center.equalTo(view.super);
        }
      },
      {
        type: "button",
        props: {
          title: "Next"
        },
        layout: (make, view) => {
          make.bottom.inset(20);
          make.width.equalTo(64);
          make.centerX.equalTo(view.super);
        },
        events: {
          tapped: sender => {
            $("reposName").blur();
            if ($("reposName").text.length) $("gallery").page++;
            else {
              $device.taptic(2);
              $("reposNameTitle").textColor = $color("red");
            }
          }
        }
      }
    ]
  },
  {
    type: "view",
    props: {},
    views: [
      {
        type: "label",
        props: {
          id: "reposHomePageTitle",
          align: $align.center,
          text: "HomePage URL",
          font: $font("bold", 20)
        },
        layout: (make, view) => {
          make.top.inset(20);
          make.width.equalTo(view.super);
        }
      },
      {
        type: "label",
        props: {
          text: "optional",
          align: $align.center,
          font: $font("bold", 12),
          textColor: $color("#cccccc")
        },
        layout: (make, view) => {
          make.top.equalTo(view.prev.bottom).offset(5);
          make.width.equalTo(view.super);
        }
      },
      {
        type: "input",
        props: {
          id: "reposHomePage",
          type: $kbType.ascii,
          align: $align.center,
          placeholder: "Here Input Your New Repo HomePage"
        },
        layout: (make, view) => {
          make.height.equalTo(32);
          make.left.right.inset(20);
          make.center.equalTo(view.super);
        }
      },
      {
        type: "button",
        props: {
          title: "Next"
        },
        layout: (make, view) => {
          make.bottom.inset(20);
          make.width.equalTo(64);
          make.centerX.equalTo(view.super);
        },
        events: {
          tapped: sender => {
            $("gallery").page++;
            $("reposHomePage").blur();
          }
        }
      }
    ]
  },
  {
    type: "view",
    props: {},
    views: [
      {
        type: "label",
        props: {
          id: "reposDescriptionTitle",
          align: $align.center,
          text: "Description",
          font: $font("bold", 20)
        },
        layout: (make, view) => {
          make.top.inset(20);
          make.width.equalTo(view.super);
        }
      },
      {
        type: "label",
        props: {
          text: "optional",
          align: $align.center,
          font: $font("bold", 12),
          textColor: $color("#cccccc")
        },
        layout: (make, view) => {
          make.top.equalTo(view.prev.bottom).offset(5);
          make.width.equalTo(view.super);
        }
      },
      {
        type: "input",
        props: {
          id: "reposDescription",
          type: $kbType.ascii,
          align: $align.center,
          placeholder: "Here Input Your New Repo Description"
        },
        layout: (make, view) => {
          make.height.equalTo(32);
          make.left.right.inset(20);
          make.center.equalTo(view.super);
        }
      },
      {
        type: "button",
        props: {
          title: "Next"
        },
        layout: (make, view) => {
          make.bottom.inset(20);
          make.width.equalTo(64);
          make.centerX.equalTo(view.super);
        },
        events: {
          tapped: async sender => {
            $("gallery").page++;
            $("reposDescription").blur();
            lottie.animationOfLottie(1);
            $("lottie").play({
              handler: finished => {
                lottie.animationOfLottie(0);
              }
            });
            let data = await git.creatRepos({
              name: $("reposName").text,
              description: $("reposHomePage").text,
              homepage: $("reposDescription").text,
              private: false,
              has_issues: true,
              has_projects: true,
              has_wiki: true
            });
            lottie.lottieStop();
            $("reposResultsLabel").text = $("reposName").text;
            if (data.errors) {
              $("reposResultsTitle").text = "Creating A New Repo Failed";
              data.errors.map(v => git.log(`${v.field} error : ${v.code}`));
            } else
              $("reposResultsTitle").text = "Creating A New Repo Successful";
          }
        }
      }
    ]
  },
  {
    type: "view",
    props: {
      id: "reposResultsView"
    },
    views: [
      {
        type: "label",
        props: {
          id: "reposResultsTitle",
          align: $align.center,
          font: $font("bold", 20)
        },
        layout: (make, view) => {
          make.top.inset(20);
          make.width.equalTo(view.super);
        }
      },
      {
        type: "label",
        props: {
          id: "reposResultsLabel",
          align: $align.center,
          font: $font("bold", 15),
          textColor: $color("#cccccc")
        },
        layout: (make, view) => {
          make.top.equalTo(view.prev.bottom).offset(5);
          make.width.equalTo(view.super);
        }
      },
      {
        type: "button",
        props: {
          title: "Done"
        },
        layout: (make, view) => {
          make.bottom.inset(20);
          make.width.equalTo(64);
          make.centerX.equalTo(view.super);
        },
        events: {
          tapped: async sender => {
            if ($("reposResultsTitle").text == "Creating A New Repo Successful")
              animationOfROView(0, () => {
                $("ROGV").remove();
              });
            else $("gallery").page = 0;
          }
        }
      },
      lottie.lottie("loading", "Please Wait...", 1, $layout.fill)
    ]
  }
];

const Delete = [
  {
    type: "view",
    props: {},
    views: [
      {
        type: "label",
        props: {
          align: $align.center,
          font: $font("bold", 20),
          text: "Delete Repos",
          textColor: $color("red")
        },
        layout: (make, view) => {
          make.top.inset(20);
          make.width.equalTo(view.super);
        }
      },
      {
        type: "button",
        props: {
          title: "Next"
        },
        layout: function (make, view) {
          make.bottom.inset(20);
          make.width.equalTo(64);
          make.centerX.equalTo(view.super);
        },
        events: {
          tapped: sender => {
            $("deleteReposName").text = $("reposBtn").title;
            $("gallery").page++;
          }
        }
      }
    ]
  },
  {
    type: "view",
    props: {},
    views: [
      {
        type: "label",
        props: {
          //id: "reposNameTitle",
          align: $align.center,
          text: "Repo Will Be Delete",
          font: $font("bold", 20)
        },
        layout: (make, view) => {
          make.top.inset(20);
          make.width.equalTo(view.super);
        }
      },
      {
        type: "label",
        props: {
          //text: "Must",
          align: $align.center,
          font: $font("bold", 15),
          textColor: $color("#cccccc")
        },
        layout: (make, view) => {
          make.top.equalTo(view.prev.bottom).offset(10);
          make.width.equalTo(view.super);
        }
      },
      {
        type: "label",
        props: {
          font: $font("bold", 20),
          id: "deleteReposName",
          type: $kbType.ascii,
          align: $align.center,
          textColor: $color("red")
        },
        layout: (make, view) => {
          make.height.equalTo(32);
          make.left.right.inset(20);
          make.center.equalTo(view.super);
        }
      },
      {
        type: "button",
        props: {
          title: "Next"
        },
        layout: (make, view) => {
          make.bottom.inset(20);
          make.width.equalTo(64);
          make.centerX.equalTo(view.super);
        },
        events: {
          tapped: sender => {
            if ($("deleteReposName").text == "Choose Repo") $device.taptic(2);
            else $ui.alert({
              title: "Two-factor Authentication",
              message: "Confirm delete",
              actions: [
                {
                  title: "Yes",
                  handler: async () => {
                    lottie.wait();
                    let type = await git.deleteRepos($("deleteReposName").text);
                    if (type == "") {
                      git.log(`Repos (${$("deleteReposName").text}) is Delete Successful!`);
                      animationOfROView(0, () => {
                        $("ROGV").remove();
                        let file = app.user();
                        app.user(file.user, file.token, "");
                        $ui.alert({ title: "Successful" });
                        $("reposBtn").title = "Choose Repo";
                      });
                    } else {
                      $ui.alert({ title: "failure" });
                      git.log(`Repos (${$("deleteReposName").text}) is Delete failure!`);
                    }
                    lottie.lottieStop();
                  }
                },
                {
                  title: "NO",
                  handler: function () {

                  }
                }
              ]
            })
          }
        }
      }
    ]
  }
];

const Select = [ //
  {
    type: "view",
    props: {},
    views: [
      {
        type: "label",
        props: {
          align: $align.center,
          font: $font("bold", 20),
          text: "Select File Upload"
        },
        layout: (make, view) => {
          make.top.inset(20);
          make.width.equalTo(view.super);
        }
      },
      {
        type: "button",
        props: {
          title: "Next"
        },
        layout: function (make, view) {
          make.bottom.inset(20);
          make.width.equalTo(64);
          make.centerX.equalTo(view.super);
        },
        events: {
          tapped: async (sender) => {
            let data = await $drive.open();
            if (data) {
              $("gallery").page++;
              $("ROView").info = data;
              $("selectFileName").text = data.fileName;
            }
          }
        }
      }
    ]
  }, {
    type: "view",
    props: {},
    views: [
      {
        type: "label",
        props: {
          align: $align.center,
          font: $font("bold", 20),
          text: "Confirm File Name"
        },
        layout: (make, view) => {
          make.top.inset(20);
          make.width.equalTo(view.super);
        }
      }, {
        type: "input",
        props: {
          id: "selectFileName",
          align: $align.center,
        },
        layout: (make, view) => {
          make.height.equalTo(32);
          make.left.right.inset(40);
          make.center.equalTo(view.super);
        }
      },
      {
        type: "button",
        props: {
          title: "Next"
        },
        layout: function (make, view) {
          make.bottom.inset(20);
          make.width.equalTo(64);
          make.centerX.equalTo(view.super);
        },
        events: {
          tapped: sender => {
            git.selectFileUpload($("selectFileName").text, $("ROView").info);
            $ui.alert({
              title: "Wait a Moment",
              message: "Result Look At The Log",
            });
          }
        }
      }
    ]
  },
];

const Issues = [
  {
    type: "view",
    props: {},
    views: [
      {
        type: "label",
        props: {
          align: $align.center,
          font: $font("bold", 20),
          text: "Report An Issue"
        },
        layout: (make, view) => {
          make.top.inset(20);
          make.width.equalTo(view.super);
        }
      }, {
        type: "button",
        props: {
          title: "Next"
        },
        layout: function (make, view) {
          make.bottom.inset(20);
          make.width.equalTo(64);
          make.centerX.equalTo(view.super);
        },
        events: {
          tapped: sender => {
            $("gallery").page++;
          }
        }
      }
    ]
  }, {
    type: "view",
    props: {},
    views: [
      {
        type: "label",
        props: {
          id: "issuesTitleLabel",
          align: $align.center,
          font: $font("bold", 20),
          text: "Title"
        },
        layout: (make, view) => {
          make.top.inset(20);
          make.width.equalTo(view.super);
        }
      }, {
        type: "input",
        props: {
          id: "issuesTitle",
          align: $align.center,
        },
        layout: (make, view) => {
          make.height.equalTo(32);
          make.left.right.inset(40);
          make.center.equalTo(view.super);
        }
      }, {
        type: "button",
        props: {
          title: "Next"
        },
        layout: function (make, view) {
          make.bottom.inset(20);
          make.width.equalTo(64);
          make.centerX.equalTo(view.super);
        },
        events: {
          tapped: sender => {
            if (!$("issuesTitle").text) {
              $device.taptic(2);
              $("issuesTitleLabel").textColor = $color("red");
            }
            else {
              $("gallery").page++;
              $("issuesTitleLabel").textColor = $color("black");
            }
          }
        }
      }
    ]
  }, {
    type: "view",
    props: {},
    views: [
      {
        type: "label",
        props: {
          id: "issuesBodyLabel",
          align: $align.center,
          font: $font("bold", 20),
          text: "Detailed Description"
        },
        layout: (make, view) => {
          make.top.inset(20);
          make.width.equalTo(view.super);
        }
      }, {
        type: "text",
        props: {
          radius: 10,
          id: "issuesBody",
          align: $align.center,
          bgcolor: $rgba(255, 255, 255, .6)
        },
        layout: (make, view) => {
          make.height.equalTo(80);
          make.left.right.inset(40);
          make.center.equalTo(view.super);
        }
      }, {
        type: "button",
        props: {
          id: "issueBtn",
          title: "Next"
        },
        layout: function (make, view) {
          make.bottom.inset(20);
          make.width.equalTo(64);
          make.centerX.equalTo(view.super);
        },
        events: {
          tapped: async (sender) => {
            if (!$("issuesBody").text) {
              $device.taptic(2);
              $("issuesBodyLabel").textColor = $color("red");
            }
            else {
              $("issuesTitleLabel").textColor = $color("black");
              if ($("issuesBody").text && $("issuesTitle").text) {
                lottie.wait();
                await git.repostIssuse($("issuesTitle").text, $("issuesBody").text);
                lottie.lottieStop();
                animationOfROView(0);
              }
            }
          }
        }
      }
    ]
  },
];

module.exports = {
  future: Future,
  create: Create,
  delete: Delete,
  select: Select,
  issues: Issues
};
