
// const {
//   gsap: { registerPlugin, set, to, timeline },
//   MorphSVGPlugin,
//   Draggable,
// } = window;
// registerPlugin(MorphSVGPlugin); // Used to calculate distance of "tug"

// let startX;
// let startY;

// const STATE = {
//   ON: false,
// };
// const CORD_DURATION = 0.1;
// const CORDS = document.querySelectorAll(".toggle-scene__cord");
// const HIT = document.querySelector(".toggle-scene__hit-spot");
// const DUMMY = document.querySelector(".toggle-scene__dummy-cord");
// const DUMMY_CORD = document.querySelector(".toggle-scene__dummy-cord line");
// const PROXY = document.createElement("div"); // set init position

// const ENDX = DUMMY_CORD.getAttribute("x2");
// const ENDY = DUMMY_CORD.getAttribute("y2");

// const RESET = () => {
//   set(PROXY, {
//     x: ENDX,
//     y: ENDY,
//   });
// };

// RESET();
// const CORD_TL = timeline({
//   paused: true,
//   onStart: () => {
//     STATE.ON = !STATE.ON;
//     set(document.documentElement, {
//       "--on": STATE.ON ? 1 : 0,
//     });
//     set([DUMMY, HIT], {
//       display: "none",
//     });
//     set(CORDS[0], {
//       display: "block",
//     });
//   },
//   onComplete: () => {
//     set([DUMMY, HIT], {
//       display: "block",
//     });
//     set(CORDS[0], {
//       display: "none",
//     });
//     RESET();
//   },
// });

// for (let i = 1; i < CORDS.length; i++) {
//   CORD_TL.add(
//     to(CORDS[0], {
//       morphSVG: CORDS[i],
//       duration: CORD_DURATION,
//       repeat: 1,
//       yoyo: true,
//     })
//   );
// }

// Draggable.create(PROXY, {
//   trigger: HIT,
//   type: "x,y",
//   onPress: (e) => {
//     startX = e.x;
//     startY = e.y;
//   },
//   onDrag: function () {
//     set(DUMMY_CORD, {
//       attr: {
//         x2: this.x,
//         y2: this.y,
//       },
//     });
//   },
//   onRelease: function (e) {
//     const DISTX = Math.abs(e.x - startX);
//     const DISTY = Math.abs(e.y - startY);
//     const TRAVELLED = Math.sqrt(DISTX * DISTX + DISTY * DISTY);
//     to(DUMMY_CORD, {
//       attr: {
//         x2: ENDX,
//         y2: ENDY,
//       },
//       duration: CORD_DURATION,
//       onComplete: () => {
//         if (TRAVELLED > 50) {
//           CORD_TL.restart();
//         } else {
//           RESET();
//         }
//       },
//     });
//   },
// });

//button
(function () {
  "use strict";

  class Menu {
    constructor(settings) {
      this.menuRootNode = settings.menuRootNode;
      this.isOpened = false;
    }

    changeMenuState(menuState) {
      return (this.isOpened = !menuState);
    }

    changeToggleHint(toggleHint, toggleNode) {
      toggleNode.textContent = toggleHint;
      return toggleHint;
    }
  }

  const menuClassesNames = {
    rootClass: "menu",
    activeClass: "menu_activated",
    toggleClass: "menu__toggle",
    toggleHintClass: "menu__toggle-hint",
  };

  const jsMenuNode = document.querySelector(`.${menuClassesNames.rootClass}`);
  const demoMenu = new Menu({
    menuRootNode: jsMenuNode,
  });

  function getCurrentToggleHint(currentMenuState) {
    return currentMenuState !== true ? "Open menu" : "Close menu";
  }

  function toggleMenu(event) {
    let currentMenuState = demoMenu.changeMenuState(demoMenu.isOpened);
    let toggleHint = getCurrentToggleHint(currentMenuState);

    demoMenu.changeToggleHint(
      toggleHint,
      demoMenu.menuRootNode.querySelector(
        `.${menuClassesNames.toggleHintClass}`
      )
    );
    demoMenu.menuRootNode.classList.toggle(`${menuClassesNames.activeClass}`);

    return currentMenuState;
  }

  jsMenuNode
    .querySelector(`.${menuClassesNames.toggleClass}`)
    .addEventListener("click", toggleMenu);
})();
