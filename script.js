const bootTl = gsap.timeline();
bootTl.to(".boot-line", {
    opacity: 1, y: 0, stagger: 0.5, duration: 0.5
})
.to(".boot-bar-fill", {
    width: "100%", duration: 1.5, ease: "power2.inOut"
})
.to(".boot-screen", {
    yPercent: -100, duration: 1, delay: 0.2, ease: "expo.inOut"
})
.to(".hero-span", {
    y: 0, stagger: 0.1, duration: 1.2, ease: "power4.out"
}, "-=0.5");

const textToType = "./initiate_search --target='Systems & Full Stack'";
const typeContainer = document.getElementById("typewriter");
let typeIndex = 0;
function typeWriter() {
    if (typeIndex < textToType.length) {
        typeContainer.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 50);
    }
}
setTimeout(() => { typeWriter(); }, 2800);

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
document.querySelectorAll(".hacker-text").forEach(element => {
    element.addEventListener("mouseenter", event => {
        if (element.dataset.interval) {
            clearInterval(parseInt(element.dataset.interval));
        }
        let iterations = 0;
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText.split("")
                .map((letter, index) => {
                    if(index < iterations) return event.target.dataset.value[index];
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");
            if(iterations >= event.target.dataset.value.length) {
                clearInterval(interval);
                delete element.dataset.interval;
            }
            iterations += 1 / 3;
        }, 30);
        element.dataset.interval = interval;
    });
    element.addEventListener("mouseleave", () => {
        if (element.dataset.interval) {
            clearInterval(parseInt(element.dataset.interval));
            delete element.dataset.interval;
            if (element.dataset.value) {
                element.innerText = element.dataset.value;
            }
        }
    });
});

let menuOpen = false;
function toggleMenu() {
    menuOpen = !menuOpen;
    const overlay = document.querySelector('.mobile-overlay');
    const burger = document.querySelectorAll('.hamburger span');
    
    if (menuOpen) {
        overlay.classList.add('active');
        burger[0].style.transform = "rotate(45deg) translate(6px, 6px)";
        burger[1].style.transform = "rotate(-45deg) translate(6px, -6px)";
        if (typeof lenis !== 'undefined') lenis.stop();
    } else {
        overlay.classList.remove('active');
        burger[0].style.transform = "none";
        burger[1].style.transform = "none";
        if (typeof lenis !== 'undefined') lenis.start();
    }
}

document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
    });
});

const lenis = new Lenis({ lerp: 0.08 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BufferGeometry();
const vertices = [];
for (let i = 0; i < 1500; i++) {
    vertices.push((Math.random()-0.5)*15, (Math.random()-0.5)*15, (Math.random()-0.5)*15);
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const material = new THREE.PointsMaterial({ color: 0x00eaff, size: 0.015 });
const stars = new THREE.Points(geometry, material);
scene.add(stars);
camera.position.z = 4;

function animate3D() {
    stars.rotation.y += 0.0005;
    stars.rotation.x += 0.0002;
    renderer.render(scene, camera);
    requestAnimationFrame(animate3D);
}
animate3D();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll('.reveal-card').forEach(card => {
    gsap.fromTo(card, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: card, start: "top bottom-=100" } });
});
gsap.from(".reveal-log", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, scrollTrigger: { trigger: ".logs-section", start: "top bottom-=50" } });

const cursor = document.querySelector('.cursor-target');
window.addEventListener('mousemove', e => { 
    gsap.to(cursor, { x: e.clientX, y: e.clientY, xPercent: -50, yPercent: -50, duration: 0.1 }); 
});
document.querySelectorAll('a').forEach(el => {
    el.addEventListener('mouseenter', () => { gsap.to(cursor, { scale: 2, rotation: 90, borderColor: '#FFF' }); });
    el.addEventListener('mouseleave', () => { gsap.to(cursor, { scale: 1, rotation: 45, borderColor: '#00eaff' }); });
});
