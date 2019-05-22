let git, news;
let env = $app.env;

let app = require("scripts/app.js");
let item = require("scripts/item.js");
let lottie = require("scripts/lottie.js");

let file = app.user();
git = new app.git();
git.log();

$app.autoKeyboardEnabled = true;
$app.keyboardToolbarEnabled = true;
const bottomHandle = {
  type: "matrix",
  props: {
    columns: 1,
    itemHeight: 35,
    spacing: 10,
    scrollEnabled: 0,
    template: {
      props: {
        radius: 10,
        bgcolor: $color("black")
      },
      views: [{
        type: "view",
        views: [{
          type: "image",
          props: {
            id: "button",
            bgcolor: $color("clear"),
          },
          layout: (make, view) => {
            make.left.inset(10);
            make.centerY.equalTo(view.super);
          }
        }, {
          type: "label",
          props: {
            id: "label",
            textColor: $color("white"),
            align: $align.center,
            font: $font(15)
          },
          layout: (make, view) => {
            make.centerY.equalTo(view.super);
            make.left.equalTo(view.prev.right).offset(5);
          },
        }],
        layout: (make, view) => {
          make.width.equalTo(100);
          make.center.equalTo(view.super);
        },
      }]
    },
    data: [{
      button: {
        icon: $icon("109", $color("white"), $size(20, 20))
      },
      label: {
        text: "用户管理"
      }
    }, {
      button: {
        icon: $icon("225", $color("white"), $size(20, 20))
      },
      label: {
        text: "退出应用"
      }
    }]
  },
  layout: (make, view) => {
    make.left.inset(10);
    make.right.inset(70);
    make.bottom.inset(20);
    make.height.equalTo(100);
    make.centerX.equalTo(view.super);
  },
  events: {
    didSelect: async (sender, indexPath, data) => {
      animateOfRO(0, $("left").info)
      if (file.repos) {
        switch (indexPath.row) {
          case 0:
            sender.userInteractionEnabled = false;
            await git.syncToPath(file.repos);
            sender.userInteractionEnabled = true;
            break;
          case 1:
            lottie.wait();
            sender.userInteractionEnabled = false;
            await git.syncToCloud(file.repos);
            sender.userInteractionEnabled = true;
            lottie.lottieStop();
            break;
        }
      } else git.log("Please Choose Repos..");
    }
  }
};
const modifyHandle = {
  type: "matrix",
  props: {
    columns: 2,
    itemHeight: 50,
    spacing: 5,
    scrollEnabled: 0,
    template: {
      props: {},
      views: [{
        type: "view",
        views: [{
          type: "image",
          props: {
            id: "button",
            bgcolor: $color("clear"),
          },
          layout: (make, view) => {
            make.center.equalTo(view.super);
          }
        }, {
          type: "label",
          props: {
            id: "label",
            textColor: $color("black"),
            align: $align.center,
            font: $font(10)
          },
          layout: (make, view) => {
            make.top.equalTo(view.prev.bottom).offset(5);
            make.centerX.equalTo(view.super);
          },
        }],
        layout: $layout.fill
      }]
    },
    data: [{
      button: {
        icon: $icon("166", $color("black"), $size(40, 40))
      },
      label: {
        text: "上传"
      }
    }, {
      button: {
        icon: $icon("165", $color("black"), $size(40, 40))
      },
      label: {
        text: "下载"
      }
    }]
  },
  layout: (make, view) => {
    make.left.inset(10);
    make.right.inset(70);
    make.height.equalTo(80);
    make.centerX.equalTo(view.super);
    make.top.equalTo(view.prev.bottom).offset(5);
  },
  events: {
    didSelect: async (sender, indexPath, data) => {
      animateOfRO(0, $("left").info)
      if (file.repos) {
        switch (indexPath.row) {
          case 0:
            sender.userInteractionEnabled = false;
            await git.syncToPath(file.repos);
            sender.userInteractionEnabled = true;
            break;
          case 1:
            lottie.wait();
            sender.userInteractionEnabled = false;
            await git.syncToCloud(file.repos);
            sender.userInteractionEnabled = true;
            lottie.lottieStop();
            break;
        }
      } else git.log("Please Choose Repos..");
    }
  }
};
const reposHandle = {
  type: "matrix",
  props: {
    square: 1,
    columns: 4,
    itemHeight: 50,
    spacing: 5,
    scrollEnabled: 0,
    template: {
      props: {},
      views: [{
        type: "view",
        views: [{
          type: "image",
          props: {
            id: "button",
            bgcolor: $color("clear"),
          },
          layout: (make, view) => {
            make.center.equalTo(view.super);
          }
        }, {
          type: "label",
          props: {
            id: "label",
            textColor: $color("black"),
            align: $align.center,
            font: $font(10)
          },
          layout: (make, view) => {
            make.top.equalTo(view.prev.bottom).offset(5);
            make.centerX.equalTo(view.super);
          },
        }],
        layout: $layout.fill
      }]
    },
    data: [{
      button: {
        icon: $icon("104", $color("black"), $size(30, 30))
      },
      label: {
        text: "新建"
      }
    }, {
      button: {
        icon: $icon("204", $color("black"), $size(30, 30))
      },
      label: {
        text: "添加"
      }
    }, {
      button: {
        icon: $icon("027", $color("black"), $size(30, 30))
      },
      label: {
        text: "删除"
      }
    }, {
      button: {
        icon: $icon("008", $color("black"), $size(30, 30))
      },
      label: {
        text: "问题"
      }
    }]
  },
  layout: (make, view) => {
    make.left.inset(10);
    make.right.inset(70);
    make.height.equalTo(80);
    make.centerX.equalTo(view.super);
    make.top.equalTo(view.prev.bottom).offset(5);
  },
  events: {
    didSelect: (sender, indexPath, data) => {
      animationOfROView(1);
      switch (indexPath.row) {
        case 0:
          viewAddNewItem(item.create);
          break;
        case 1:
          viewAddNewItem(item.select);
          break;
        case 2:
          viewAddNewItem(item.delete);
          break;
        case 3:
          viewAddNewItem(item.issues);
          break;
      }
    }
  }
};
const roView = {
  type: "view",
  props: {
    alpha: 0,
    id: "ROView",
    bgcolor: $color("#F5F5F5")
  },
  layout: (make, view) => {
    viewsAddShadows(view);
    make.left.inset(10);
    make.right.inset(70);
    make.height.equalTo(200);
    make.centerX.equalTo(view.super);
    make.top.equalTo($("reposBtn").top);
  }
};
const repos = {
  type: "button",
  props: {
    id: "reposBtn",
    title: file ? (file.repos ? file.repos : "Choose Repo") : "Choose Repo",
    //align: $align.left,
    bgcolor: $color("black")
  },
  layout: function (make, view) {
    make.left.inset(10);
    make.right.inset(70);
    make.height.equalTo(30);
    make.centerX.equalTo(view.super);
    make.top.inset($device.isIphoneX ? 60 : 30);
  },
  events: {
    tapped: async sender => {
      sender.userInteractionEnabled = false;
      lottie.fill();
      $("left").info = 1;
      let res = await git.reposCheck();
      lottie.lottieStop();
      let pick = await $pick.data({ props: { items: [res] } });
      sender.userInteractionEnabled = true;

      if (pick[0]) {
        git.folder(pick[0]);
        file.repos = pick[0];
        sender.title = pick[0];
        git.log(`Choose Repo ( ${pick[0]} )`);
        app.user(file.user, file.token, pick[0]);
      }
    }
  }
};

const login = {
  type: "blur",
  props: {
    id: "Login",
    style: 2,
    alpha: file == undefined ? 1 : 0
  },
  views: [
    {
      type: "view",
      props: {
        radius: 20,
        bgcolor: $color("#f5f5f5")
      },
      layout: function (make, view) {
        make.height.equalTo(300);
        make.left.right.inset(20);
        make.center.equalTo(view.super);
      },
      views: [
        {
          type: "image",
          props: {
            bgcolor: $color("clear"),
            icon: $icon("177", $color("black"), $size(35, 35))
          },
          layout: (make, view) => {
            make.top.inset(20);
            make.centerX.equalTo(view.super);
            make.size.equalTo($size(50, 50));
          }
        },
        {
          type: "input",
          props: {
            id: "user",
            type: $kbType.default,
            align: $align.center,
            placeholder: file
              ? file.user
                ? file.user
                : "Please input User"
              : "Please input User"
          },
          layout: function (make, view) {
            //make.top.inset(20)
            make.height.equalTo(40);
            make.left.right.inset(20);
            make.top.equalTo(view.prev.bottom).offset(40);
          },
          events: {
            returned: sender => {
              sender.blur();
            }
          }
        },
        {
          type: "input",
          props: {
            secure: 1,
            id: "token",
            type: $kbType.default,
            align: $align.center,
            placeholder: file
              ? file.token
                ? "**************"
                : "Please input Token"
              : "Please input Token"
          },
          layout: function (make, view) {
            make.height.equalTo(40);
            make.left.right.inset(20);
            make.top.equalTo(view.prev.bottom).offset(20);
          },
          events: {
            returned: sender => {
              sender.blur();
            }
          }
        },
        {
          type: "button",
          props: {
            title: "验证",
            bgcolor: $color("black")
          },
          layout: (make, view) => {
            make.height.equalTo(40);
            make.left.right.inset(30);
            make.centerX.equalTo(view.super);
            make.top.equalTo(view.prev.bottom).offset(20);
          },
          events: {
            tapped: async sender => {
              if ($("user").text && $("token").text) {
                app.user($("user").text, $("token").text);
                await init();
              } else if (file && !$("user").text && !$("token").text)
                animationOfLogin(0);
            }
          }
        }
      ]
    }
  ],
  layout: $layout.fill
};
const blur = {
  type: "view",
  props: {
    alpha: 0,
    id: "leftBG",
    bgcolor: $rgba(0, 0, 0, 0.5)
  },
  layout: $layout.fill
};
const left = {
  type: "view",
  props: {
    info: 0,
    alpha: 0,
    id: "left",
    bgcolor: $color("clear")
  },
  views: [{
    type: "image",
    props: {
      alpha: .8,
      bgcolor: $color("clear"),
      src: "assets/backWhite.png"
    },
    layout: (make, view) => {
      make.size.equalTo($size(35, 35));
      make.centerY.equalTo(view.super);
      make.left.inset(16.5);
    },
    events: {
      tapped: sender => animateOfRO(0, $("left").info)
    }
  }, {
    type: "view",
    props: {
      bgcolor: $color("white")
    },
    layout: (make, view) => {
      make.width.equalTo(view.super);
      make.height.equalTo(view.super);
      make.left.inset(68);
    },
    views: [repos, reposHandle, modifyHandle, roView, bottomHandle]
  }],
  layout: $layout.fill,
};

const logs = {
  title: "logs",
  rows: [
    {
      type: "view",
      views: [
        {
          type: "list",
          props: {
            id: "logs",
            rowHeight: 20,
            bgcolor: $color("#F5F5F5"),
            separatorHidden: false,
            template: {
              props: {
                font: $font(12),
                bgcolor: $color("clear")
              }
            }
          },
          events: {
            didSelect: (sender, indexPath, data) => {
              animationOflistBlur(1);
              $("text").text = data.replace(": ", "\n\n");
            }
          },
          layout: (make, view) => {
            viewsAddShadows(view);
            make.edges.insets($insets(10, 20, 0, 20));
          }
        },
        {
          type: "blur",
          props: {
            id: "listBlur",
            alpha: 0,
            style: 1
          },
          views: [
            {
              type: "text",
              props: {
                editable: 0,
                selectable: 0,
                align: $align.center,
                insets: $insets(20, 5, 20, 5)
              },
              layout: $layout.fill
            }
          ],
          layout: $layout.fill,
          events: {
            tapped: async sender => {
              animationOflistBlur(0);
            }
          }
        }
      ],
      layout: $layout.fill
    }
  ]
};
const top = {
  type: "view",
  props: {
    id: "Title"
  },
  layout: (make, view) => {
    make.height.equalTo(50);
    make.left.right.inset(10);
    make.top.inset($device.isIphoneX ? 40 : 10);
  },
  views: [{
    type: "label",
    props: {
      text: "GitHub",
      align: $align.left,
      font: $font("bold", 35)
    },
    layout: (make, view) => {
      make.width.equalTo(120);
      make.top.left.inset(0);
      make.centerY.equalTo(view.super);
    }
  },
  {
    type: "button",
    props: {
      id: "icon",
      bgcolor: $color("clear"),
      userInteractionEnabled: false,
      icon: $icon("177", $color("black"), $size(35, 35))
    },
    layout: (make, view) => {
      make.centerY.equalTo(view.super);
      make.left.equalTo(view.prev.right);
    },
    events: {
      tapped: async sender => {
        findNewFolder(sender);
      }
    }
  },
  {
    type: "view",
    props: {
      alpha: 0,
      circular: 1,
      id: "newReposTip",
      bgcolor: $color("red")
    },
    layout: (make, view) => {
      make.size.equalTo($size(6, 6));
      make.top.equalTo(view.prev.top);
      make.left.equalTo(view.prev.right);
    }
  }]
};
const LG = {
  type: "list",
  props: {
    id: "LG",
    data: [logs],
    scrollEnabled: 0,
    bgcolor: $color("clear"),
    separatorHidden: true
  },
  layout: (make, view) => {
    make.left.right.inset(0);
    make.height.equalTo(250);
    make.bottom.inset($device.isIphoneX ? 40 : 10);
  },
  events: {
    rowHeight: (sender, indexPath) => {
      if (indexPath.section == 0) {
        return 200;
      }
    }
  }
};
const RO = {
  type: "view",
  props: {
    id: "RO",
    radius: 25,
    bgcolor: $rgba(0, 0, 0, 0.1)
  },
  layout: (make, view) => {
    make.right.inset(-20);
    make.height.equalTo(50);
    make.width.equalTo(70);
    make.centerY.equalTo(view.super);
  },
  views: [{
    type: "image",
    props: {
      alpha: .8,
      info: true,
      id: "RObtn",
      bgcolor: $color("clear"),
      src: "assets/backBlack.png"
    },
    layout: (make, view) => {
      make.size.equalTo($size(35, 35));
      make.centerY.equalTo(view.super);
      make.left.inset(10);
    },
    events: {
      tapped: sender => {
        animateOfRO(1);
        $("left").info = 0;
      }
    }
  }
  ]
};

if (env == $env.app) {
  $ui.render({
    props: {
      id: "MainView",
      statusBarStyle: 0,
      navBarHidden: true
    },
    views: [top, RO, LG, login, blur, left]
  });
  init();
}

function findNewFolder(sender) {
  $ui.action({
    title: "News",
    message: "found a new repos option",
    actions: [
      {
        title: "create repos",
        disabled: false, // Optional
        handler: () => {
          animationOfFolderTips(0);
          sender.userInteractionEnabled = false;
          $delay(3, () => animationOfFolderTips(0));
          news.map(async v => {
            await git.creatRepos(v);
            await git.syncToPath(v);
          });
        }
      },
      {
        title: "ignore option",
        handler: () => {
          animationOfFolderTips(0);
          sender.userInteractionEnabled = false;
          $delay(3, () => animationOfFolderTips(0));
        }
      }
    ]
  });
}
function viewAddNewItem(item) {
  $("ROView").add({
    type: "view",
    props: {
      id: "ROGV"
    },
    layout: $layout.fill,
    views: [
      {
        type: "gallery",
        props: {
          scrollEnabled: 0,
          radius: 10.0,
          items: item
        },
        layout: $layout.fill
      },
      {
        type: "button",
        props: {
          bgcolor: $color("clear"),
          icon: $icon("225", $color("gray"), $size(20, 20)) //新建
        },
        layout: (make, view) => {
          make.right.inset(5);
          make.bottom.inset(5);
        },
        events: {
          tapped: async sender => {
            animationOfROView(0, () => {
              $("ROGV").remove();
            });
          }
        }
      }
    ]
  });
}
function viewsAddShadows(view) {
  //在layout中使用即可 给Views添加阴影
  var layer = view.runtimeValue().invoke("layer");
  layer.invoke("setShadowRadius", 10);
  layer.invoke("setCornerRadius", 10);
  layer.invoke("setShadowOpacity", 0.3);
  layer.invoke("setShadowOffset", $size(3, 3));
  layer.invoke(
    "setShadowColor",
    $color("gray")
      .runtimeValue()
      .invoke("CGColor")
  );
}

function animateOfRO(rotate) {
  let width = $device.info.screen.width;
  $("leftBG").animator.makeOpacity(rotate ? 1 : 0).animateWithCompletion({
    duration: 0.8,
    completion: () => {
      $("left").alpha = 1;
    }
  });
  $("left").animator.moveX(rotate ? -width : width).easeBack.animate(0.6);
}
function animationOfLogin(alpha) {
  $ui.animate({
    duration: 0.4,
    animation: () => {
      $("Login").alpha = alpha;
    },
    completion: () => { }
  });
}
function animationOfROView(alpha, handler) {
  $("ROView").updateLayout(make => {
    make.top.equalTo($("reposBtn").top);
  });

  if (alpha) {
    $("ROView").relayout();
    $("ROView")
      .animator.moveY(35)
      .makeOpacity(1)
      .animateWithCompletion({
        duration: 0.4,
        completion: () => {
          if (handler) handler();
        }
      });
  } else
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
function animationOflistBlur(alpha) {
  $ui.animate({
    duration: 0.4,
    animation: () => {
      $("listBlur").alpha = alpha;
    },
    completion: () => { }
  });
}
function animationOfFolderTips(alpha, handler) {
  $ui.animate({
    duration: 1,
    animation: () => {
      $("newReposTip").alpha = alpha;
    },
    completion: handler
  });
}

async function init() {

  $("logs").data = JSON.parse($file.read("/log").string);

  $thread.background({
    delay: 0.3,
    handler: async () => {
      git.CheckFolder();
    }
  });

  let flag = await git.tokenCheck($("Login").alpha ? lottie.fill : lottie.wait);
  lottie.lottieStop();
  if (flag) {
    animationOfLogin(0);
    $delay(0.5, function () {
      animateOfRO(0, 1);
    });
    // news = await git.folderCheck();
    // if (news.length) folderTipsFlsh();
  } else animationOfLogin(1);

  return flag;
}