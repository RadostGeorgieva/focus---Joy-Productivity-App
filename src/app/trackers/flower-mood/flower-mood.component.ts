import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flower-mood',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './flower-mood.component.html',
  styleUrls: ['./flower-mood.component.css']
})
export class FlowerMoodComponent implements AfterViewInit {

  tlHappy = gsap.timeline() as gsap.core.Timeline;
  tlCool = gsap.timeline() as gsap.core.Timeline;
  tlCrazy = gsap.timeline() as gsap.core.Timeline;
  tlSexy = gsap.timeline() as gsap.core.Timeline;

  isAnimationInitialized = false;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.timelineInit();
    }, 0);
  }


  timelineInit() {
    const stem_1 = document.getElementById("tige");
    const head = document.getElementById("head");
    const leaf_group_1 = document.getElementById("leaf-group-1");
    const leaf_group_2 = document.getElementById("leaf-group-2");
    const leaf_group_3 = document.getElementById("leaf-group-3");
    const leaf_group_4 = document.getElementById("leaf-group-4");
    const leaf_stem_1 = document.getElementById("leaf-stem-1");
    const leaf_stem_2 = document.getElementById("leaf-stem-2");
    const leaf_stem_3 = document.getElementById("leaf-stem-3");
    const leaf_stem_4 = document.getElementById("leaf-stem-4");
    const leaf_1 = document.getElementById("leaf-1");
    const leaf_2 = document.getElementById("leaf-2");
    const leaf_3 = document.getElementById("leaf-3");
    const leaf_4 = document.getElementById("leaf-4");
    const face = document.getElementById("face");
    gsap.set(stem_1, {
      scaleY: 1,
      rotation: 0,
      transformOrigin: "center bottom"
    });
    gsap.set(head, {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "center bottom"
    });
    gsap.set(leaf_group_1, {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "right bottom"
    });
    gsap.set(leaf_group_2, {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "right bottom"
    });
    gsap.set(leaf_group_3, {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "left bottom"
    });
    gsap.set(leaf_group_4, {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "left bottom"
    });
    gsap.set(head, { y: 0 });
    gsap.set(face, { x: 0, y: 0 });
    gsap.set(leaf_stem_1, { attr: { x2: 289, y2: 360 } });
    gsap.set(leaf_stem_2, { attr: { x2: 287.2, y2: 287 } });
    gsap.set(leaf_stem_3, { attr: { x2: 313.3, y2: 278.1 } });
    gsap.set(leaf_stem_4, { attr: { x2: 312.6, y2: 351.2 } });
    gsap.set(leaf_1, { x: 0, y: 0 });
    gsap.set(leaf_2, { x: 0, y: 0 });
    gsap.set(leaf_3, { x: 0, y: 0 });
    gsap.set(leaf_4, { x: 0, y: 0 });
    gsap.set(stem_1, {
      attr: { d: "M300.8,398.4c0,0,2.1-60.3,1.7-80.3c-0.5-23-6.2-92-6.2-92" }
    });

  }
  setCrazyAnimation() {
    const stem_1 = document.getElementById("tige");
    const pathElement = stem_1 as unknown as SVGPathElement;
    const head = document.getElementById("head");
    const leaf_group_1 = document.getElementById("leaf-group-1");
    const leaf_group_2 = document.getElementById("leaf-group-2");
    const leaf_group_3 = document.getElementById("leaf-group-3");
    const leaf_group_4 = document.getElementById("leaf-group-4");
    const leaf_stem_1 = document.getElementById("leaf-stem-1");
    const leaf_stem_2 = document.getElementById("leaf-stem-2");
    const leaf_stem_3 = document.getElementById("leaf-stem-3");
    const leaf_stem_4 = document.getElementById("leaf-stem-4");
    const leaf_1 = document.getElementById("leaf-1");
    const leaf_2 = document.getElementById("leaf-2");
    const leaf_3 = document.getElementById("leaf-3");
    const leaf_4 = document.getElementById("leaf-4");
    const face = document.getElementById("face");
    gsap.set("svg", { visibility: "visible" });

    this.tlCrazy = gsap.timeline({ paused: true, repeat: -1 });
    this.tlCrazy
      .to(stem_1, { duration: 0.3, scaleY: 0.65, transformOrigin: "center bottom" }, "one")
      .set(head, { duration: 0.3, y: 60 }, "one")
      .set(face, { duration: 0.3, y: 3 }, "one")
      .set(leaf_group_1, { duration: 0.3, y: 20 }, "one")
      .set(leaf_group_2, { duration: 0.3, y: 45 }, "one")
      .set(leaf_group_3, { duration: 0.3, y: 45 }, "one")
      .set(leaf_group_4, { duration: 0.3, y: 20 }, "one")
      .set(
        stem_1,
        { duration: 0.3, scaleY: 1, rotation: -15, transformOrigin: "center bottom" },
        "two"
      )
      .to(
        head,
        { duration: 0.3, y: 5, x: -40, rotation: -15, transformOrigin: "center bottom" },
        "two"
      )
      .to(face, { duration: 0.3, x: -2, y: -3 }, "two")
      .to(
        leaf_group_1,
        { duration: 0.3, y: 0, x: -7, rotation: -15, transformOrigin: "right bottom" },
        "two"
      )
      .to(
        leaf_group_2,
        { duration: 0.3, y: 10, x: -22, rotation: -15, transformOrigin: "right bottom" },
        "two"
      )
      .to(
        leaf_group_3,
        { duration: 0.3, y: 10, x: -24, rotation: -15, transformOrigin: "left bottom" },
        "two"
      )
      .to(
        leaf_group_4,
        { duration: 0.3, y: 0, x: -7, rotation: -15, transformOrigin: "left bottom" },
        "two"
      )
      .to(
        stem_1,
        { duration: 0.3, scaleY: 0.65, rotation: 0, transformOrigin: "center bottom" },
        "three"
      )
      .to(
        head,
        { duration: 0.3, y: 60, x: 0, rotation: 0, transformOrigin: "center bottom" },
        "three"
      )
      .to(face, { duration: 0.3, x: 0, y: 3 }, "three")
      .to(
        leaf_group_1,
        { duration: 0.3, y: 20, x: 0, rotation: 0, transformOrigin: "right bottom" },
        "three"
      )
      .to(
        leaf_group_2,
        { duration: 0.3, y: 45, x: 0, rotation: 0, transformOrigin: "right bottom" },
        "three"
      )
      .to(
        leaf_group_3,
        { duration: 0.3, y: 45, x: 0, rotation: 0, transformOrigin: "left bottom" },
        "three"
      )
      .to(
        leaf_group_4,
        { duration: 0.3, y: 20, x: 0, rotation: 0, transformOrigin: "left bottom" },
        "three"
      )
      .to(
        stem_1,
        { duration: 0.3, scaleY: 1, rotation: 15, transformOrigin: "center bottom" },
        "four"
      )
      .to(
        head,
        { duration: 0.3, y: 5, x: 40, rotation: 15, transformOrigin: "center bottom" },
        "four"
      )
      .to(face, { duration: 0.3, x: 2, y: -3 }, "four")
      .to(
        leaf_group_1,
        { duration: 0.3, y: 0, x: 7, rotation: 15, transformOrigin: "right bottom" },
        "four"
      )
      .to(
        leaf_group_2,
        { duration: 0.3, y: 0, x: 24, rotation: 15, transformOrigin: "right bottom" },
        "four"
      )
      .to(
        leaf_group_3,
        { duration: 0.3, y: 0, x: 28, rotation: 15, transformOrigin: "left bottom" },
        "four"
      )
      .to(
        leaf_group_4,
        { duration: 0.3, y: 0, x: 12, rotation: 15, transformOrigin: "left bottom" },
        "four"
      )
      .to(
        stem_1,
        { duration: 0.3, scaleY: 0.65, rotation: 0, transformOrigin: "center bottom" },
        "five"
      )
      .to(
        head,
        { duration: 0.3, y: 60, x: 0, rotation: 0, transformOrigin: "center bottom" },
        "five"
      )
      .to(face, { duration: 0.3, x: 0, y: 3 }, "five")
      .to(
        leaf_group_1,
        { duration: 0.3, y: 20, x: 0, rotation: 0, transformOrigin: "right bottom" },
        "five"
      )
      .to(
        leaf_group_2,
        { duration: 0.3, y: 45, x: 0, rotation: 0, transformOrigin: "right bottom" },
        "five"
      )
      .to(
        leaf_group_3,
        { duration: 0.3, y: 45, x: 0, rotation: 0, transformOrigin: "left bottom" },
        "five"
      )
      .to(
        leaf_group_4,
        { duration: 0.3, y: 20, x: 0, rotation: 0, transformOrigin: "left bottom" },
        "five"
      )
      .to(
        stem_1,
        { duration: 0.3, scaleY: 1, rotation: 0, transformOrigin: "center bottom" },
        "six"
      )
      .to(
        head,
        { duration: 0.3, y: 0, x: 0, rotation: 0, transformOrigin: "center bottom" },
        "six"
      )
      .to(face, { duration: 0.3, x: 0, y: 0 }, "six")
      .to(
        leaf_group_1,
        { duration: 0.3, y: 0, x: 0, rotation: 0, transformOrigin: "right bottom" },
        "six"
      )
      .to(
        leaf_group_2,
        { duration: 0.3, y: 0, x: 0, rotation: 0, transformOrigin: "right bottom" },
        "six"
      )
      .to(
        leaf_group_3,
        { duration: 0.3, y: 0, x: 0, rotation: 0, transformOrigin: "left bottom" },
        "six"
      )
      .to(
        leaf_group_4,
        { duration: 0.3, y: 0, x: 0, rotation: 0, transformOrigin: "left bottom" },
        "six"
      );
    this.tlCrazy.timeScale(1.6);
    this.tlCrazy?.play()

  }

  setSexyAnimation() {
    const stem_1 = document.getElementById("tige");
    const head = document.getElementById("head");
    const leaf_group_1 = document.getElementById("leaf-group-1");
    const leaf_group_2 = document.getElementById("leaf-group-2");
    const leaf_group_3 = document.getElementById("leaf-group-3");
    const leaf_group_4 = document.getElementById("leaf-group-4");

    gsap.set("svg", { visibility: "visible" });

    const targetPathTige = "M300.8,398.4c0,0,2.1-60.3,1.7-80.3c-0.5-23-6.2-92-6.2-92";
    const targetPathTige1 = "M298.2,399.8c-3.1-5.4-9-15-12.1-20.3c-5.5-9.6-9.2-23.4-8-34.4c1.8-15.6,12.5-28.4,21.5-41.2c5.9-8.5,20.9-19.3,21.3-32.7c0.4-16.4-14.1-35.8-21.3-46.3";
    const targetPathTige2 = "M300.5,399.8c3.1-5.4,9-15,12.1-20.3c5.5-9.6,9.2-23.4,8-34.4c-1.8-15.6-12.5-28.4-21.5-41.2c-5.9-8.5-20.9-19.3-21.3-32.7c-0.4-16.4,14.1-35.8,21.3-46.3";
    const targetPathTige3 = "M298.1,398.4c0,0-2.1-60.3-1.7-80.3c0.5-23,6.2-92,6.2-92";

    this.tlSexy = gsap.timeline({ paused: true, repeat: -1 });
    this.tlSexy
      .to(stem_1, {
        duration: 0.3,
        attr: { d: targetPathTige1 },
        ease: "none",
      }, "one")
      .to(
        head,
        0.3,
        {
          y: 0,
          x: 0,
          rotation: -15,
          transformOrigin: "center bottom",
          ease: "none"
        },
        "one"
      )
      .to(
        leaf_group_1,
        0.3,
        {
          y: 0,
          x: -18,
          rotation: -20,
          transformOrigin: "right bottom",
          ease: "none"
        },
        "one"
      )
      .to(
        leaf_group_2,
        0.3,
        {
          y: 0,
          x: 0,
          rotation: 15,
          transformOrigin: "right bottom",
          ease: "none"
        },
        "one"
      )
      .to(
        leaf_group_3,
        0.3,
        {
          y: 0,
          x: 8,
          rotation: 30,
          transformOrigin: "left bottom",
          ease: "none"
        },
        "one"
      )
      .to(
        leaf_group_4,
        0.3,
        {
          y: 0,
          x: -22,
          rotation: -5,
          transformOrigin: "left bottom",
          ease: "none"
        },
        "one"
      )
      .to(stem_1, {
        duration: 0.3,
        attr: { d: targetPathTige},
        ease: "none",
      }, "two")
  .to(
    head,
    0.3,
    {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "center bottom",
     ease: "none"
    },
    "two"
  )
  .to(
    leaf_group_1,
    0.3,
    {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "right bottom",
       ease: "none"
    },
    "two"
  )
  .to(
    leaf_group_2,
    0.3,
    {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "right bottom",
       ease: "none"
    },
    "two"
  )
  .to(
    leaf_group_3,
    0.3,
    {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "left bottom",
       ease: "none"
    },
    "two"
  )
  .to(
    leaf_group_4,
    0.3,
    {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "left bottom",
      ease: "none"
    },
    "two"
  )
      .to(stem_1, {
        duration: 0.3,
        attr: { d: targetPathTige3 },
        ease: "none",
      }, "three")
      .to(
        head,
        0.3,
        {
          y: 0,
          x: 0,
          rotation: 15,
          transformOrigin: "center bottom",
          ease: "none"
        },
        "three"
      )
      .to(
        leaf_group_1,
        0.3,
        {
          y: 0,
          x: 16,
          rotation: 10,
          transformOrigin: "right bottom",
          ease: "none"
        },
        "three"
      )
      .to(
        leaf_group_2,
        0.3,
        {
          y: 0,
          x: -4,
          rotation: -30,
          transformOrigin: "right bottom",
          ease: "none"
        },
        "three"
      )
      .to(
        leaf_group_3,
        0.3,
        {
          y: 0,
          x: -10,
          rotation: -5,
          transformOrigin: "left bottom",
          ease: "none"
        },
        "three"
      )
      .to(
        leaf_group_4,
        0.3,
        {
          y: 0,
          x: 14,
          rotation: 20,
          transformOrigin: "left bottom",
          ease: "none"
        },
        "three"
      )
      .to(stem_1, {
        duration: 0.3,
        attr: { d: targetPathTige2 },
        ease: "none",
      }, "four")
      .to(
        head,
        0.3,
        {
          y: 0,
          x: 0,
          rotation: 0,
          transformOrigin: "center bottom",
          ease: "none"
        },
        "four"
      )
      .to(
        leaf_group_1,
        0.3,
        {
          y: 0,
          x: 0,
          rotation: 0,
          transformOrigin: "right bottom",
          ease: "none"
        },
        "four"
      )
      .to(
        leaf_group_2,
        0.3,
        {
          y: 0,
          x: 0,
          rotation: 0,
          transformOrigin: "right bottom",
          ease: "none"
        },
        "four"
      )
      .to(
        leaf_group_3,
        0.3,
        {
          y: 0,
          x: 0,
          rotation: 0,
          transformOrigin: "left bottom",
          ease: "none"
        },
        "four"
      )
      .to(
        leaf_group_4,
        0.3,
        {
          y: 0,
          x: 0,
          rotation: 0,
          transformOrigin: "left bottom",
          ease: "none"
        },
        "four"
      );

    this.tlSexy.timeScale(0.6);
  }


  setHappyAnimation() {
    const stem_1 = document.getElementById("tige");
    const pathElement = stem_1 as unknown as SVGPathElement;
    const head = document.getElementById("head");
    const leaf_group_1 = document.getElementById("leaf-group-1");
    const leaf_group_2 = document.getElementById("leaf-group-2");
    const leaf_group_3 = document.getElementById("leaf-group-3");
    const leaf_group_4 = document.getElementById("leaf-group-4");
    const leaf_stem_1 = document.getElementById("leaf-stem-1");
    const leaf_stem_2 = document.getElementById("leaf-stem-2");
    const leaf_stem_3 = document.getElementById("leaf-stem-3");
    const leaf_stem_4 = document.getElementById("leaf-stem-4");
    const leaf_1 = document.getElementById("leaf-1");
    const leaf_2 = document.getElementById("leaf-2");
    const leaf_3 = document.getElementById("leaf-3");
    const leaf_4 = document.getElementById("leaf-4");
    const face = document.getElementById("face");



    const stemElement = document.querySelector("#tige") as SVGPathElement;
    const targetPathData = "M300.8,398.4c0,0,2.1-60.3,1.7-80.3c-0.5-23-6.2-92-6.2-92";

    gsap.set("svg", { visibility: "visible" });
    this.tlHappy = gsap.timeline({ paused: true, repeat: -1 });
    this.tlHappy
      .to(
        leaf_stem_1,
        0.3,
        { attr: { x2: 250, y2: 340 }, transformOrigin: "50% 50%" },
        "one"
      )
      .to(leaf_1, 0.3, { x: -15, y: -7 }, "one")
      .to(
        leaf_stem_2,
        0.3,
        { attr: { x2: 240, y2: 267 }, transformOrigin: "50% 50%" },
        "one"
      )
      .to(leaf_2, 0.3, { x: -15, y: -7 }, "one")
      .add(happy2());

    function happy2() {
      let tlHappy2 = gsap.timeline({ repeat: -1 });
      tlHappy2
        .to(
          leaf_stem_3,
          0.3,
          { attr: { x2: 335, y2: 268 }, transformOrigin: "50% 50%" },
          "two+=0.5"
        )
        .to(leaf_3, 0.3, { x: 15, y: -7 }, "two+=0.5")
        .to(
          leaf_stem_4,
          0.3,
          { attr: { x2: 340, y2: 337 }, transformOrigin: "50% 50%" },
          "two+=0.5"
        )
        .to(leaf_4, 0.3, { x: 15, y: -7 }, "two+=0.5")
        .to(
          leaf_stem_1,
          0.3,
          { attr: { x2: 289, y2: 360 }, transformOrigin: "50% 50%" },
          "two+=0.5"
        )
        .to(leaf_1, 0.3, { x: -2, y: 0 }, "two+=0.5")
        .to(
          leaf_stem_2,
          0.3,
          { attr: { x2: 287.2, y2: 287 }, transformOrigin: "50% 50%" },
          "two+=0.5"
        )
        .to(leaf_2, 0.3, { x: -5, y: 0 }, "two+=0.5")
        .to(
          head,
          0.3,
          {
            y: 0,
            x: 5,
            rotation: 5,
            transformOrigin: "center bottom",
            ease: "none"
          },
          "two+=0.5"
        )
        .to(stemElement, {
          duration: 0.3,
          attr: { d: targetPathData },
          ease: "none",
        })

        .to(
          leaf_stem_3,
          0.3,
          { attr: { x2: 313.3, y2: 278.1 }, transformOrigin: "50% 50%" },
          "three+=0.5"
        )
        .to(leaf_3, 0.3, { x: 0, y: 0 }, "three+=0.5")
        .to(
          leaf_stem_4,
          0.3,
          { attr: { x2: 312.6, y2: 351.2 }, transformOrigin: "50% 50%" },
          "three+=0.5"
        )
        .to(leaf_4, 0.3, { x: 0, y: 0 }, "three+=0.5")
        .to(
          leaf_stem_1,
          0.3,
          { attr: { x2: 250, y2: 340 }, transformOrigin: "50% 50%" },
          "three+=0.5"
        )
        .to(leaf_1, 0.3, { x: -15, y: -7 }, "three+=0.5")
        .to(
          leaf_stem_2,
          0.3,
          { attr: { x2: 235, y2: 265 }, transformOrigin: "50% 50%" },
          "three+=0.5"
        )
        .to(leaf_2, 0.3, { x: -15, y: -7 }, "three+=0.5")
        .to(
          head,
          0.3,
          {
            y: 0,
            x: 0,
            rotation: 0,
            transformOrigin: "center bottom",
            ease: "none"
          },
          "three+=0.5"
        )
        .to(
          stemElement, {
          duration: 0.3,
          attr: { d: targetPathData },
          ease: "none"
        })
      return tlHappy2;
    }

    this.tlHappy.timeScale(4);
  }

  setCoolAnimation() {
    const stem_1 = document.getElementById("tige");
    const head = document.getElementById("head");
    const leaf_group_1 = document.getElementById("leaf-group-1");
    const leaf_group_2 = document.getElementById("leaf-group-2");
    const leaf_group_3 = document.getElementById("leaf-group-3");
    const leaf_group_4 = document.getElementById("leaf-group-4");
    const leaf_stem_1 = document.getElementById("leaf-stem-1");
    const leaf_stem_2 = document.getElementById("leaf-stem-2");
    const leaf_stem_3 = document.getElementById("leaf-stem-3");
    const leaf_stem_4 = document.getElementById("leaf-stem-4");
    const leaf_1 = document.getElementById("leaf-1");
    const leaf_2 = document.getElementById("leaf-2");
    const leaf_3 = document.getElementById("leaf-3");
    const leaf_4 = document.getElementById("leaf-4");
    const face = document.getElementById("face");
    //gsap.set("svg", { visibility: "visible" });
    this.tlCool = gsap.timeline({ paused: true, repeat: -1 });
    this.tlCool
      .to(head, 0.3, { x: 3, repeat: -1, yoyo: true }, "two")
      .to(
        leaf_group_1,
        0.3,
        { rotation: -1, transformOrigin: "right bottom", repeat: -1, yoyo: true },
        "two"
      )
      .to(
        leaf_group_2,
        0.3,
        { rotation: -1, transformOrigin: "right bottom", repeat: -1, yoyo: true },
        "two"
      )
      .to(
        leaf_group_3,
        0.3,
        { rotation: 1, transformOrigin: "left bottom", repeat: -1, yoyo: true },
        "two"
      )
      .to(
        leaf_group_4,
        0.3,
        { rotation: 1, transformOrigin: "left bottom", repeat: -1, yoyo: true },
        "two"
      );

    this.tlCool.timeScale(1.6);
    this.tlCool?.play()
  }
  onHappyClick() {
    this.updateDisplay("happy");
    this.timelineInit();
    this.setHappyAnimation()

    this.tlCool.pause();
    this.tlSexy.pause();
    this.tlCrazy?.pause();
    this.tlHappy?.play();
  }

  onCoolClick() {
    this.timelineInit()
    this.updateDisplay("cool");
    this.setCoolAnimation()
    this.tlCrazy.pause();
    this.tlSexy.pause();
    this.tlHappy.pause();
    this.tlCool?.play();
  }

  onCrazyClick() {
    this.timelineInit()
    this.updateDisplay("crazy");
    this.setCrazyAnimation()

    this.tlHappy.pause();
    this.tlCool.pause();
    this.tlSexy.pause();
    this.tlCrazy?.play();
  }

  onSexyClick() {
    this.updateDisplay("sexy");
    this.setSexyAnimation()
    this.tlCool.pause();
    this.tlCrazy.pause();
    this.tlHappy.pause();
    this.tlSexy?.play();
  }

  private updateDisplay(mood: "happy" | "cool" | "crazy" | "sexy") {
    const glasses = document.querySelector('#glasses') as HTMLElement;
    const eyesHappy = document.querySelector('#eyes-happy') as HTMLElement;
    const eyesCrazy = document.querySelector('#eyes-crazy') as HTMLElement;
    const eyesSexy = document.querySelector('#eyes-sexy') as HTMLElement;
    const mouthHappy = document.querySelector('#mouth-happy') as HTMLElement;
    const mouthCrazy = document.querySelector('#mouth-crazy') as HTMLElement;
    const mouthCool = document.querySelector('#mouth-cool') as HTMLElement;
    const mouthSexy = document.querySelector('#mouth-sexy') as HTMLElement;
    const cheeks = document.querySelector('#cheeks') as HTMLElement;

    glasses.style.display = mood === "cool" ? "block" : "none";
    eyesHappy.style.display = mood === "happy" ? "block" : "none";
    eyesCrazy.style.display = mood === "crazy" ? "block" : "none";
    eyesSexy.style.display = mood === "sexy" ? "block" : "none";
    mouthHappy.style.display = mood === "happy" ? "block" : "none";
    mouthCrazy.style.display = mood === "crazy" ? "block" : "none";
    mouthCool.style.display = mood === "cool" ? "block" : "none";
    mouthSexy.style.display = mood === "sexy" ? "block" : "none";
    cheeks.style.display = ["happy", "sexy"].includes(mood) ? "block" : "none";

    this.cdRef.detectChanges();
  }
}
