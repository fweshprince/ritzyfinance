$(function () {
  setAnimation();
});

function setAnimation() {
  var controller = new ScrollMagic.Controller();

  //////////////////////////////////
  // FIRST section scene TOP half//
  ////////////////////////////////

  var parallaxTl1 = new TimelineMax();
  parallaxTl1.from("#paragraph-rule--center-section1", 1, {
    width: "0%",
    ease: Power0.easeNone
  });

  // build a scene
  var ourScene1 = new ScrollMagic.Scene({
    triggerElement: "#paragraph-container--center-section1 p",
    triggerHook: 'onEnter',
    duration: "90%"
  })
  .setTween(parallaxTl1)
  .addTo(controller);

  /////////////////////////////////////
  // FIRST section scene BOTTOM half//
  ///////////////////////////////////

  var parallaxTl2 = new TimelineMax();
  parallaxTl2
    .set("#community", { zIndex: 12 })
    .from("#community", 4, { x: "50px", opacity: 0, ease: Power0.easeNone })
    .fromTo(
      "#declaration",
      4,
      { y: "25%", opacity: 0, ease: Power0.easeNone },
      { y: "-25%", opacity: 1, ease: Power0.easeNone },
      "-=0"
    )
    .from(
      "#subhead-rule--right-section1",
      2,
      { width: "0%", left: "175px", ease: Power0.easeNone },
      "-=4"
    )
    .fromTo(
      "#blank-faces",
      5,
      { y: "15%", ease: Power0.easeNone },
      { y: "-15%", ease: Power0.easeNone },
      "-=5"
    );

  // build a scene
  var ourScene2 = new ScrollMagic.Scene({
    triggerElement: "#section-breaks-section1",
    triggerHook: 'onEnter',
    duration: "100%"
  })
  .setTween(parallaxTl2)
  .addTo(controller);

  ///////////////////////////////////
  // SECOND section scene TOP half//
  /////////////////////////////////

  var parallaxTl3 = new TimelineMax();
  parallaxTl3.from("#paragraph-rule--center-section2", 1, {
    width: "0%",
    ease: Power0.easeNone
  });

  // build a scene
  var ourScene3 = new ScrollMagic.Scene({
    triggerElement: "#paragraph-container--center-section2 p",
    triggerHook: 'onEnter',
    duration: "90%"
  })
  .setTween(parallaxTl3)
  .addTo(controller);

  //////////////////////////////////////
  // SECOND section scene BOTTOM half//
  ////////////////////////////////////

  var parallaxTl4 = new TimelineMax();
  parallaxTl4
    .set("#growing", { zIndex: 12 })
    .from("#growing", 4, { x: "-50px", opacity: 0, ease: Power0.easeNone })
    .fromTo(
      "#shovels",
      4,
      { y: "25%", opacity: 0, ease: Power0.easeNone },
      { y: "-25%", opacity: 1, ease: Power0.easeNone },
      "-=0")
    .fromTo(
      "#cupolas",
      6,
      { y: "15%", ease: Power0.easeNone },
      { y: "-15%", ease: Power0.easeNone },
      "-=6"
    )
    .from(
      "#subhead-rule--left-section2",
      4,
      { width: "0%", left: "175px", ease: Power0.easeNone },
      "-=3"
    );

  // build a scene
  var ourScene4 = new ScrollMagic.Scene({
    triggerElement: "#section-breaks-section2",
    triggerHook: 'onEnter',
    duration: "90%"
  })
  .setTween(parallaxTl4)
  .addTo(controller);

  //////////////////////////
  // THIRD section scene //
  ////////////////////////

  var parallaxTl5 = new TimelineMax();
  parallaxTl5.from("#paragraph-rule--center-section3", 1, {
    width: "0%",
    ease: Power0.easeNone
  });

  // build a scene
  var ourScene5 = new ScrollMagic.Scene({
    triggerElement: "#paragraph-container--center-section3 p",
    triggerHook: 'onEnter',
    duration: "90%"
  })
  .setTween(parallaxTl5)
  .addTo(controller);

  ///////////////////////////////////
  // FOURTH section scene TOP half//
  /////////////////////////////////

  var parallaxTl6 = new TimelineMax();
  parallaxTl6.from("#paragraph-rule--center-section4", 1, {
    width: "0%",
    ease: Power0.easeNone
  });

  // build a scene
  var ourScene6 = new ScrollMagic.Scene({
    triggerElement: "#paragraph-container--center-section4 p",
    triggerHook: 'onEnter',
    duration: "90%"
  })
  .setTween(parallaxTl6)
  .addTo(controller);

  //////////////////////////////////////
  // FOURTH section scene BOTTOM half//
  ////////////////////////////////////

  var parallaxTl7 = new TimelineMax();
  parallaxTl7
  .set("#revolution", { zIndex: 12 })
    .from("#revolution", 4, { x: "50px", opacity: 0, ease: Power0.easeNone })
    .fromTo(
      "#ribbon-cutting",
      4,
      { y: "25%", opacity: 0, ease: Power0.easeNone },
      { y: "-25%", opacity: 1, ease: Power0.easeNone },
      "-=0"
    )
    .fromTo(
      "#lady-justice",
      7,
      { y: "25%", ease: Power0.easeNone },
      { y: "-15%", ease: Power0.easeNone },
      "-=7"
    )
    .from(
      "#subhead-rule--right-section4",
      4,
      { width: "0%", left: "175px", ease: Power0.easeNone },
      "-=3"
    );

  // build a scene
  var ourScene7 = new ScrollMagic.Scene({
    triggerElement: "#section-breaks-section4",
    triggerHook: 'onEnter',
    duration: "90%"
  })
  .setTween(parallaxTl7)
  .addTo(controller);
}
