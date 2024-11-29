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
  colors = {
    blue: ["#5588a3", "#00334e", "#e8e8e8", "#A0616A"],
    orange: ["#f7931e", "#f05a28", "#fff0bc", "#FDB797"],
    pink: ["#ec3667", "#3f3d56", "#cbcdda", "#ffb9b9"],
    red: ["#e2434b", "#292725", "#fee9d7", "#BF7554"],
    yellow: ["#ffc60b", "#444444", "#feffdb", "#ffdbac"],
    green: ["#c6e377", "#36622b", "#fbfad3", "#f1c27d"],
    purple: ["#aa5c9f", "#7f4782", "#fdd043", "#B47556"],
    black: ["#2b2b28", "#c19898", "#ebebe3", "#FDB797"]
  };

  tlHappy: gsap.core.Timeline | undefined;
  tlCool: gsap.core.Timeline | undefined;
  tlCrazy: gsap.core.Timeline | undefined;
  tlSexy: gsap.core.Timeline | undefined;

  isAnimationInitialized = false;

  illustrationStyles = {
    "--c-accent": this.colors.blue[0],
    "--c-dark": this.colors.blue[1],
    "--c-light": this.colors.blue[2],
    "--c-skin": this.colors.blue[3]
  };

  constructor(private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.timelineInit(); // Initialize GSAP timelines
    this.startAnimation(); // Start the default animation
  }

  // Initialize GSAP animations for the flower parts
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

    let tlCrazy =gsap.timeline({ paused: true, repeat: -1 });
    tlCrazy
      .to(stem_1, {duration:0.3, scaleY: 0.65, transformOrigin: "center bottom" }, "one")
      .set(head, {duration:0.3, y: 60 }, "one")
      .set(face, {duration:0.3, y: 3 }, "one")
      .set(leaf_group_1,  {duration:0.3, y: 20 }, "one")
      .set(leaf_group_2, {duration:0.3,y: 45 }, "one")
      .set(leaf_group_3, {duration:0.3, y: 45 }, "one")
      .set(leaf_group_4,  {duration:0.3, y: 20 }, "one")
      .set(
        stem_1,
        {duration:0.3,scaleY: 1, rotation: -15, transformOrigin: "center bottom" },
        "two"
      )
      .to(
        head,
        {duration:0.3, y: 5, x: -40, rotation: -15, transformOrigin: "center bottom" },
        "two"
      )
      .to(face, {duration:0.3,x: -2, y: -3 }, "two")
      .to(
        leaf_group_1,
        {duration:0.3, y: 0, x: -7, rotation: -15, transformOrigin: "right bottom" },
        "two"
      )
      .to(
        leaf_group_2,
        {duration:0.3, y: 10, x: -22, rotation: -15, transformOrigin: "right bottom" },
        "two"
      )
      .to(
        leaf_group_3,
        {duration:0.3, y: 10, x: -24, rotation: -15, transformOrigin: "left bottom" },
        "two"
      )
      .to(
        leaf_group_4,
        {duration:0.3, y: 0, x: -7, rotation: -15, transformOrigin: "left bottom" },
        "two"
      )
      .to(
        stem_1,
        {duration:0.3, scaleY: 0.65, rotation: 0, transformOrigin: "center bottom" },
        "three"
      )
      .to(
        head,
        {duration:0.3, y: 60, x: 0, rotation: 0, transformOrigin: "center bottom" },
        "three"
      )
      .to(face, {duration:0.3, x: 0, y: 3 }, "three")
      .to(
        leaf_group_1,
        {duration:0.3, y: 20, x: 0, rotation: 0, transformOrigin: "right bottom" },
        "three"
      )
      .to(
        leaf_group_2,
        {duration:0.3, y: 45, x: 0, rotation: 0, transformOrigin: "right bottom" },
        "three"
      )
      .to(
        leaf_group_3,
        {duration:0.3, y: 45, x: 0, rotation: 0, transformOrigin: "left bottom" },
        "three"
      )
      .to(
        leaf_group_4,
        {duration:0.3, y: 20, x: 0, rotation: 0, transformOrigin: "left bottom" },
        "three"
      )
      .to(
        stem_1,
        {duration:0.3, scaleY: 1, rotation: 15, transformOrigin: "center bottom" },
        "four"
      )
      .to(
        head,
        {duration:0.3, y: 5, x: 40, rotation: 15, transformOrigin: "center bottom" },
        "four"
      )
      .to(face, {duration:0.3, x: 2, y: -3 }, "four")
      .to(
        leaf_group_1,
        {duration:0.3, y: 0, x: 7, rotation: 15, transformOrigin: "right bottom" },
        "four"
      )
      .to(
        leaf_group_2,
        {duration:0.3, y: 0, x: 24, rotation: 15, transformOrigin: "right bottom" },
        "four"
      )
      .to(
        leaf_group_3,
        {duration:0.3, y: 0, x: 28, rotation: 15, transformOrigin: "left bottom" },
        "four"
      )
      .to(
        leaf_group_4,
        {duration:0.3, y: 0, x: 12, rotation: 15, transformOrigin: "left bottom" },
        "four"
      )
      .to(
        stem_1,
        {duration:0.3, scaleY: 0.65, rotation: 0, transformOrigin: "center bottom" },
        "five"
      )
      .to(
        head,
        {duration:0.3,y: 60, x: 0, rotation: 0, transformOrigin: "center bottom" },
        "five"
      )
      .to(face,  {duration:0.3, x: 0, y: 3 }, "five")
      .to(
        leaf_group_1,
        {duration:0.3, y: 20, x: 0, rotation: 0, transformOrigin: "right bottom" },
        "five"
      )
      .to(
        leaf_group_2,
        {duration:0.3,y: 45, x: 0, rotation: 0, transformOrigin: "right bottom" },
        "five"
      )
      .to(
        leaf_group_3,
        {duration:0.3, y: 45, x: 0, rotation: 0, transformOrigin: "left bottom" },
        "five"
      )
      .to(
        leaf_group_4,
        {duration:0.3, y: 20, x: 0, rotation: 0, transformOrigin: "left bottom" },
        "five"
      )
      .to(
        stem_1,
        {duration:0.3, scaleY: 1, rotation: 0, transformOrigin: "center bottom" },
        "six"
      )
      .to(
        head,
        {duration:0.3, y: 0, x: 0, rotation: 0, transformOrigin: "center bottom" },
        "six"
      )
      .to(face, {duration:0.3,x: 0, y: 0 }, "six")
      .to(
        leaf_group_1,
        {duration:0.3, y: 0, x: 0, rotation: 0, transformOrigin: "right bottom" },
        "six"
      )
      .to(
        leaf_group_2,
        {duration:0.3, y: 0, x: 0, rotation: 0, transformOrigin: "right bottom" },
        "six"
      )
      .to(
        leaf_group_3,
        {duration:0.3, y: 0, x: 0, rotation: 0, transformOrigin: "left bottom" },
        "six"
      )
      .to(
        leaf_group_4,
        {duration:0.3, y: 0, x: 0, rotation: 0, transformOrigin: "left bottom" },
        "six"
      );
    tlCrazy.timeScale(1.6);
  }
    
// Default animation on initialization
startAnimation() {
  this.updateDisplay("happy"); // Default mood
  this.tlHappy?.play(); // Start happy animation by default
}

// Animation methods for each button
onHappyClick() {
  this.updateDisplay("happy");
  this.tlHappy?.restart();
}

onCoolClick() {
  this.updateDisplay("cool");
  this.tlCool?.restart();
}

onCrazyClick() {
  this.timelineInit()
  this.startAnimation()
  this.setCrazyAnimation();
  this.updateDisplay("crazy");
  this.tlCrazy?.restart();
}

onSexyClick() {
  this.updateDisplay("sexy");
  this.tlSexy?.restart();
}

  // Update element displays based on mood
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
