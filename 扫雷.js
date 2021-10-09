var grids = document.getElementsByClassName("grids")[0],
  bottomL = document.getElementsByClassName("icon-hongqi1")[0],
  gridRow0 = grids.children[0].children,
  gridRow1 = grids.children[1].children,
  gridRow2 = grids.children[2].children,
  gridRow3 = grids.children[3].children,
  gridRow4 = grids.children[4].children,
  gridRow5 = grids.children[5].children,
  gridRow6 = grids.children[6].children,
  gridRow7 = grids.children[7].children,
  gridRow8 = grids.children[8].children,
  gridRow9 = grids.children[9].children,
  gridWhole = [
    gridRow0,
    gridRow1,
    gridRow2,
    gridRow3,
    gridRow4,
    gridRow5,
    gridRow6,
    gridRow7,
    gridRow8,
    gridRow9,
  ],
  mine = parseInt(Math.random() * 4 + 13),
  ranMine1,
  ranMine2,
  around = 0,
  gridClick,
  flagCount = 0,
  key = 0,
  mines,
  btn = document.getElementsByClassName("btn")[0],
  icon = btn.getElementsByTagName("i")[0];

// 结束
function end() {
  for (var i = 0; i < mines.length; i++) {
    mines[i].className += " iconfont icon-saoleix click";
  }
  grids.removeEventListener("click", handle, false);
  bottomL.removeEventListener("click", handle1, false);
}

// 选中周围8个
function surround(target) {
  var arr = [];
  if (
    Number(target.getAttribute("x")) - 1 != -1 &&
    Number(target.getAttribute("Y")) - 1 != -1
  ) {
    arr.push(
      gridWhole[Number(target.getAttribute("x")) - 1][
        Number(target.getAttribute("Y")) - 1
      ]
    );
  }
  if (Number(target.getAttribute("x")) - 1 != -1) {
    arr.push(
      gridWhole[Number(target.getAttribute("x")) - 1][
        Number(target.getAttribute("Y"))
      ]
    );
  }
  if (
    Number(target.getAttribute("x")) - 1 != -1 &&
    Number(target.getAttribute("Y")) + 1 != 10
  ) {
    arr.push(
      gridWhole[Number(target.getAttribute("x")) - 1][
        Number(target.getAttribute("Y")) + 1
      ]
    );
  }
  if (Number(target.getAttribute("Y")) - 1 != -1) {
    arr.push(
      gridWhole[Number(target.getAttribute("x"))][
        Number(target.getAttribute("Y")) - 1
      ]
    );
  }
  if (Number(target.getAttribute("Y")) + 1 != 10) {
    arr.push(
      gridWhole[Number(target.getAttribute("x"))][
        Number(target.getAttribute("Y")) + 1
      ]
    );
  }
  if (
    Number(target.getAttribute("x")) + 1 != 10 &&
    Number(target.getAttribute("Y")) - 1 != -1
  ) {
    arr.push(
      gridWhole[Number(target.getAttribute("x")) + 1][
        Number(target.getAttribute("Y")) - 1
      ]
    );
  }
  if (Number(target.getAttribute("x")) + 1 != 10) {
    arr.push(
      gridWhole[Number(target.getAttribute("x")) + 1][
        Number(target.getAttribute("Y"))
      ]
    );
  }
  if (
    Number(target.getAttribute("x")) + 1 != 10 &&
    Number(target.getAttribute("Y")) + 1 != 10
  ) {
    arr.push(
      gridWhole[Number(target.getAttribute("x")) + 1][
        Number(target.getAttribute("Y")) + 1
      ]
    );
  }
  return arr;
}

// 随机炸弹
function ranMine() {
  ranMine1 = parseInt(Math.random() * 10);
  ranMine2 = parseInt(Math.random() * 10);
  if (gridWhole[ranMine1][ranMine2].className == "grid") {
    gridWhole[ranMine1][ranMine2].className += " mine";
  } else {
    ranMine();
  }
}

// 重置红旗按钮
function resetL() {
  flagCount = 0;
  bottomL.className = "grid iconfont icon-hongqi1";
}

// 扩散
function main(target) {
  var arr1 = surround(target);
  if (
    (target.className == "grid" ||
      (target.className == "grid iconfont icon-hongqi1" && key == 0)) &&
    flagCount == 0
  ) {
    target.className = "grid click";
    key = 0;
    for (var i = 0; i < arr1.length; i++) {
      if (
        arr1[i].className == "grid mine" ||
        arr1[i].className == "grid mine iconfont icon-hongqi1"
      ) {
        around++;
      }
    }
    if (around == 0) {
      for (var i = 0; i < arr1.length; i++) {
        if (
          arr1[i].className == "grid" ||
          arr1[i].className == "grid iconfont icon-hongqi1"
        ) {
          main(arr1[i]);
        }
      }
    } else {
      switch (around) {
        case 1:
          target.style.color = "#00f";
          break;
        case 2:
          target.style.color = "#008000";
          break;
        case 3:
          target.style.color = "#f00";
          break;
        case 4:
          target.style.color = "#000080";
          break;
        case 5:
          target.style.color = "#2196f3";
          break;
        case 6:
          target.style.color = "#4caf50";
          break;
        case 7:
          target.style.color = "#ffeb3b";
          break;
        case 8:
          target.style.color = "#795548";
          break;
      }
      target.innerText = around;
      around = 0;
    }
    gridClick = document.getElementsByClassName("grid click").length;
    if (100 - gridClick == mine) {
      end();
    }
  } else if (target.className == "grid mine" && flagCount == 0) {
    target.className += " red";
    end();
  } else if (
    flagCount % 2 == 1 &&
    (target.className == "grid" || target.className == "grid mine")
  ) {
    target.className += " iconfont icon-hongqi1";
    // resetL();
  } else if (
    flagCount % 2 == 1 &&
    target.className == "grid iconfont icon-hongqi1"
  ) {
    target.className = "grid";
    // resetL();
  } else if (
    flagCount % 2 == 1 &&
    target.className == "grid mine iconfont icon-hongqi1"
  ) {
    target.className = "grid mine";
    // resetL();
  }
}

// 给格子加事件
addEvent(grids, "click", handle);
function handle(e) {
  var event = e || window.event;
  var target = event.target || event.srcElement;
  key++;
  main(target);
}

// 给红旗按钮加事件
addEvent(bottomL, "click", handle1);
function handle1() {
  flagCount++;
  if (flagCount % 2 == 1) {
    bottomL.className += " click";
  } else {
    resetL();
  }
}

// 随机13~16个炸弹
for (var i = 0; i < mine; i++) {
  ranMine();
}
mines = document.getElementsByClassName("grid mine");

btn.onmousedown = function (e) {
  if (e.button == 0) {
    btn.style.width = "26px";
    btn.style.height = "26px";
    icon.style.top = "-6px";
    icon.style.fontSize = "17px";
    btn.onmouseleave = function () {
      location.reload();
    };
    btn.onmouseup = function () {
      location.reload();
    };
  }
};
