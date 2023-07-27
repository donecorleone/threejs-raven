// Menu

function openNav() {
  if (window.innerWidth <= 768) {
    document.getElementById("mySidenav").style.width = "70%";
  } else {
    document.getElementById("mySidenav").style.width = "30%";
  }
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}



// Mouse trailer

document.addEventListener("DOMContentLoaded", () => {
  const trailer = document.getElementById("trailer");
  const trailerText = document.getElementById("trailer-text");

  const animateTrailer = (e, interacting) => {
    const x = e.clientX - trailer.offsetWidth / 2,
      y = e.clientY - trailer.offsetHeight / 2;

    const keyframes = {
      transform: `translate(${x}px, ${y}px) scale(${interacting ? 6 : 1})`
    };

    trailer.animate(keyframes, {
      duration: 800,
      fill: "forwards"
    });
  };

  window.onmousemove = e => {
    const interactable = e.target.closest(".interactable"),
      interacting = interactable !== null;

    // Check if the mouse is inside the hero section
    const inHeroSection = e.target.closest(".hero_section") !== null;

    if (inHeroSection) {
      // Hide the trailer and text
      trailer.style.opacity = "0";
      trailerText.style.opacity = "0";
    } else {
      // Show the trailer
      trailer.style.opacity = "1";

      animateTrailer(e, interacting);

      if (interacting) {
        trailerText.style.opacity = "1";
        // Check if the hovered element is a CTA action
        if (interactable.classList.contains("cta-action")) {
          trailerText.textContent = "Contact";
        } else {
          trailerText.textContent = "View";
        }
      } else {
        trailerText.style.opacity = "0";
      }
    }
  };
});




/* -- Glow effect -- */

const blob = document.getElementById("blob");

window.onpointermove = event => { 
  const { clientX, clientY } = event;
  
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY * 0.7}px`
  }, { duration: 10000, fill: "forwards" });
}

gsap.to(blob, {
  duration: 1,
  height: "60vmax"
});

const blob2 = document.getElementById("blob2");

gsap.to(blob2, {
  duration: 1,
  height: "75vmax"
});


// video move down

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".video_section",
    scrub: true,
    pin: true,
    
  
  }
})

.to(".rect", {
  scale: 2, 
  y: 300,
  ease: "none"
})


// animate text letters

const myText = new SplitType('#hero-text')

gsap.to('.char', {
    y: 0,
    stagger: 0.05,
    delay: 0.2,
    duration: .1
})


// CATEGORY

gsap.from("#branding", {duration: 0.3, y: -50, ease: "power4", opacity: 0, scrollTrigger: ".category"})
gsap.from("#webdesign", {duration: 0.3, y: -50, ease: "power4", opacity: 0, scrollTrigger: ".category", delay:0.4})
gsap.from("#marketing", {duration: 0.3, y: -50, ease: "power4", opacity: 0, scrollTrigger: ".category", delay:0.8})
gsap.from("#werbetechnik", {duration: 0.3, y: -50, ease: "power4", opacity: 0, scrollTrigger: ".category", delay:1.2});


// PORTFLOIO 
         
function initImageRevealAnimation() {
  gsap.utils.toArray('.portfolio-item').forEach((item) => {
    const image = item.querySelector('img');

    // Set the initial state
    gsap.set(image, { scale: 1.2 });

    // Create the animation timeline
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
        end: 'center center',
        scrub: true,
      },
    });

    // Animate the portfolio items
    timeline
      .from(item, {
        duration: 0.5,
        opacity: 0,
        y: 20,
        ease: 'power1.out',
      })
      .to(
        image,
        {
          duration: 0.5,
          scale: 1,
          ease: 'power1.out',
        },
        0
      );
  });
}

// Initialize the image reveal animation
initImageRevealAnimation();
// SERVICE SECTION

       
         // Create a timeline for the service container animation
const serviceContainerTimeline = gsap.timeline({
  paused: true,
});

// Add the border animation to the timeline
serviceContainerTimeline.to(".service-border", {
  width: "100%",
  duration: 1,
  ease: "power4.out",
});

// Create a new timeline for the service item border animation
const serviceItemTimeline = gsap.timeline({
  paused: true,
});

// Add the border animation to the timeline, with a delay to start after the service border is complete
serviceItemTimeline.to(".service-item-border", {
  width: "100%",
  duration: 1,
  ease: "power4.out",
});

// When the service container animation completes, start the service item border animation
serviceContainerTimeline.call(() => {
  serviceItemTimeline.play();
});

// Add a scroll trigger to the service container
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.create({
  trigger: ".service-container",
  start: "top 80%",
  onEnter: () => {
    serviceContainerTimeline.play();
  },
});



// Define the sections
const serviceContainer = document.querySelector(".service_section");
const carouselSection = document.querySelector(".carousel_section");
const brandsSection = document.querySelector(".brands-section")

// ScrollTrigger service container
ScrollTrigger.create({
  trigger: serviceContainer,
  start: "top center",
  end: "bottom center",
  
  onLeave: () => {
    gsap.to("body", { backgroundColor: "#000", color: "#f5f3ee" });
  },
  onEnterBack: () => {
    gsap.to("body", { backgroundColor: "#f5f3ee", color: "#000" });
  },
});

// ScrollTrigger carousel section
ScrollTrigger.create({
  trigger: carouselSection,
  start: "top center",
  end: "bottom center",
  onEnter: () => {
    gsap.to("body", { backgroundColor: "#000", color: "#f5f3ee" });
  },
  onLeaveBack: () => {
    gsap.to(".body", { backgroundColor: "#f5f3ee", color: "#000"})
  }
});





const brandsTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".brands-section",
    start: "top center", // adjust start position as needed
    end: "center center", // adjust end position as needed
    scrub: false,
    markers: false
  }
});

brandsTimeline.to(".brands-border", {
  width: "100%",
  duration: 1, // adjust duration as needed
  ease: "power4.out" // adjust ease as needed
});


// Underline color change

const ctaActionElements = document.querySelectorAll('.white-underline.cta-action');

ctaActionElements.forEach(element => {
    const elementAfter = window.getComputedStyle(element, ':after');
    element.style.color = '#ffffff';
    element.style.setProperty('--underline-color', '#ffffff');
});


function initTextAnimation() {
  const ravencyTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.information-container',
      start: 'top 90%', // Adjust this value to control when the animation starts
      end: 'center center', // Adjust this value to control when the animation ends
      scrub: true,
    },
  });

  ravencyTimeline
    .from('.info h2', {
      duration: 0.5,
      opacity: 0,
      y: -20,
      ease: 'power1.out',
    })
    .from('#info-p', {
      duration: 0.5,
      opacity: 0,
      y: 20,
      ease: 'power1.out',
    });
}

initTextAnimation();