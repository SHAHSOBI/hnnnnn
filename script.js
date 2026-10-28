/* =========================================
   NEXORA — INTERACTIVE JAVASCRIPT
   ========================================= */


/* ---------- 3D HERO ORB ---------- */

const hero = document.querySelector(".hero");
const orb = document.querySelector(".orb");

if (hero && orb) {

    hero.addEventListener("mousemove", (event) => {

        const rect = hero.getBoundingClientRect();

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = (mouseX - centerX) / 35;
        const rotateX = (centerY - mouseY) / 35;

        orb.style.transform = `
            translateY(-10px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
    });


    hero.addEventListener("mouseleave", () => {

        orb.style.transform = `
            translateY(0)
            rotateX(0deg)
            rotateY(0deg)
        `;

    });
}


/* ---------- SERVICE CARD 3D TILT ---------- */

const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `
            translateY(-12px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = `
            translateY(0)
            rotateX(0deg)
            rotateY(0deg)
        `;

    });

});


/* ---------- PROJECT CARD HOVER ---------- */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((project) => {

    project.addEventListener("mousemove", (event) => {

        const image = project.querySelector(".project-image");

        if (!image) return;

        const rect = project.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateX = (y - rect.height / 2) / 30;
        const rotateY = (rect.width / 2 - x) / 30;

        image.style.transform = `
            perspective(800px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.02)
        `;

    });


    project.addEventListener("mouseleave", () => {

        const image = project.querySelector(".project-image");

        if (!image) return;

        image.style.transform = `
            perspective(800px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
        `;

    });

});


/* ---------- SCROLL REVEAL ---------- */

const revealElements = document.querySelectorAll(
    ".section-heading, .service-card, .project-card, .about-content, .about-stats, .contact"
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* ---------- ACTIVE NAVIGATION ---------- */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${currentSection}`
        ) {
            link.classList.add("active");
        }

    });

});


/* ---------- SMOOTH BUTTON EFFECT ---------- */

const buttons = document.querySelectorAll(
    ".primary-button, .secondary-button, .nav-button"
);

buttons.forEach((button) => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "translateY(-3px)";

    });


    button.addEventListener("mouseleave", () => {

        button.style.transform = "translateY(0)";

    });

});


/* ---------- CURSOR GLOW ---------- */

const cursorGlow = document.createElement("div");

cursorGlow.className = "cursor-glow";

document.body.appendChild(cursorGlow);


document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;

});


/* ---------- PAGE LOADED ---------- */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    console.log("NEXORA — Digital Experience Loaded 🚀");

});

/* =========================================
   NEXORA — ACTUAL THREE.JS 3D OBJECT
   ========================================= */

/* =========================================================
   NEXORA — NEXT LEVEL 3D HERO SCENE
   ========================================================= */

if (typeof THREE !== "undefined") {

    const heroVisual = document.querySelector(".hero-visual");
    const oldOrb = document.querySelector(".orb");

    if (heroVisual) {

        // Hide old CSS orb
        if (oldOrb) {
            oldOrb.style.display = "none";
        }

        /* -----------------------------
           SCENE
        ----------------------------- */

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            45,
            heroVisual.clientWidth / heroVisual.clientHeight,
            0.1,
            100
        );

        camera.position.z = 6;


        /* -----------------------------
           RENDERER
        ----------------------------- */

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        );

        renderer.setSize(
            heroVisual.clientWidth,
            heroVisual.clientHeight
        );

        renderer.outputEncoding = THREE.sRGBEncoding;

        renderer.domElement.style.position = "absolute";
        renderer.domElement.style.inset = "0";
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.zIndex = "2";
        renderer.domElement.style.pointerEvents = "none";

        heroVisual.appendChild(renderer.domElement);


        /* -----------------------------
           LIGHTING
        ----------------------------- */

        const ambientLight = new THREE.AmbientLight(
            0xffffff,
            0.45
        );

        scene.add(ambientLight);


        const purpleLight = new THREE.PointLight(
            0x8b5cf6,
            5,
            12
        );

        purpleLight.position.set(3, 2, 4);

        scene.add(purpleLight);


        const blueLight = new THREE.PointLight(
            0x3b82f6,
            4,
            10
        );

        blueLight.position.set(-4, -2, 3);

        scene.add(blueLight);


        const pinkLight = new THREE.PointLight(
            0xec4899,
            2.5,
            8
        );

        pinkLight.position.set(0, 4, -2);

        scene.add(pinkLight);


        /* =====================================================
           MAIN 3D CRYSTAL
        ===================================================== */

        const crystalGroup = new THREE.Group();

        scene.add(crystalGroup);


        const crystalGeometry =
            new THREE.IcosahedronGeometry(1.45, 2);


        const crystalMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x8b5cf6,
                metalness: 0.85,
                roughness: 0.18,
                emissive: 0x32105f,
                emissiveIntensity: 0.7,
                transparent: true,
                opacity: 0.96
            });


        const crystal =
            new THREE.Mesh(
                crystalGeometry,
                crystalMaterial
            );

        crystalGroup.add(crystal);


        /* -----------------------------
           INNER WIREFRAME
        ----------------------------- */

        const wireGeometry =
            new THREE.IcosahedronGeometry(1.55, 2);


        const wireMaterial =
            new THREE.MeshBasicMaterial({
                color: 0xc4b5fd,
                wireframe: true,
                transparent: true,
                opacity: 0.18
            });


        const wire =
            new THREE.Mesh(
                wireGeometry,
                wireMaterial
            );

        crystalGroup.add(wire);


        /* =====================================================
           ORBIT RINGS
        ===================================================== */

        function createRing(
            radius,
            rotationX,
            rotationY,
            rotationZ,
            opacity
        ) {

            const geometry =
                new THREE.TorusGeometry(
                    radius,
                    0.018,
                    16,
                    120
                );

            const material =
                new THREE.MeshBasicMaterial({
                    color: 0xa78bfa,
                    transparent: true,
                    opacity: opacity
                });

            const ring =
                new THREE.Mesh(
                    geometry,
                    material
                );

            ring.rotation.x = rotationX;
            ring.rotation.y = rotationY;
            ring.rotation.z = rotationZ;

            scene.add(ring);

            return ring;
        }


        const ring1 = createRing(
            2.05,
            Math.PI / 2.4,
            0.3,
            0.2,
            0.65
        );


        const ring2 = createRing(
            2.25,
            1.0,
            -0.6,
            0.7,
            0.32
        );


        const ring3 = createRing(
            2.4,
            0.35,
            1.1,
            -0.3,
            0.2
        );


        /* =====================================================
           PARTICLE FIELD
        ===================================================== */

        const particleCount = 350;

        const particlePositions =
            new Float32Array(
                particleCount * 3
            );


        for (
            let i = 0;
            i < particleCount * 3;
            i += 3
        ) {

            particlePositions[i] =
                (Math.random() - 0.5) * 9;

            particlePositions[i + 1] =
                (Math.random() - 0.5) * 7;

            particlePositions[i + 2] =
                (Math.random() - 0.5) * 7;
        }


        const particleGeometry =
            new THREE.BufferGeometry();

        particleGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                particlePositions,
                3
            )
        );


        const particleMaterial =
            new THREE.PointsMaterial({
                color: 0xc4b5fd,
                size: 0.025,
                transparent: true,
                opacity: 0.7,
                depthWrite: false
            });


        const particles =
            new THREE.Points(
                particleGeometry,
                particleMaterial
            );

        scene.add(particles);


        /* =====================================================
           OUTER GLOW SPHERE
        ===================================================== */

        const glowGeometry =
            new THREE.SphereGeometry(
                1.85,
                32,
                32
            );


        const glowMaterial =
            new THREE.MeshBasicMaterial({
                color: 0x7c3aed,
                transparent: true,
                opacity: 0.055,
                side: THREE.BackSide
            });


        const glow =
            new THREE.Mesh(
                glowGeometry,
                glowMaterial
            );

        scene.add(glow);


        /* =====================================================
           MOUSE INTERACTION
        ===================================================== */

        let mouseX = 0;
        let mouseY = 0;

        let targetX = 0;
        let targetY = 0;


        heroVisual.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    heroVisual.getBoundingClientRect();

                mouseX =
                    ((event.clientX - rect.left)
                    / rect.width - 0.5);

                mouseY =
                    ((event.clientY - rect.top)
                    / rect.height - 0.5);
            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            function () {

                mouseX = 0;
                mouseY = 0;
            }
        );


        /* =====================================================
           ANIMATION
        ===================================================== */

        const clock = new THREE.Clock();


        function animate() {

            requestAnimationFrame(animate);

            const elapsed =
                clock.getElapsedTime();


            /* Smooth mouse movement */

            targetX +=
                (mouseX - targetX) * 0.045;

            targetY +=
                (mouseY - targetY) * 0.045;


            /* Crystal rotation */

            crystal.rotation.x =
                elapsed * 0.18 +
                targetY * 0.45;

            crystal.rotation.y =
                elapsed * 0.25 +
                targetX * 0.65;


            /* Wireframe follows crystal */

            wire.rotation.x =
                crystal.rotation.x * 0.9;

            wire.rotation.y =
                crystal.rotation.y * 0.9;


            /* Floating effect */

            crystalGroup.position.y =
                Math.sin(elapsed * 1.2) * 0.12;

            glow.position.y =
                crystalGroup.position.y;


            /* Orbit movement */

            ring1.rotation.z =
                elapsed * 0.22;

            ring1.rotation.y =
                elapsed * 0.13;

            ring2.rotation.z =
                -elapsed * 0.16;

            ring2.rotation.x =
                elapsed * 0.11;

            ring3.rotation.y =
                elapsed * 0.1;

            ring3.rotation.z =
                elapsed * 0.08;


            /* Particle movement */

            particles.rotation.y =
                elapsed * 0.018;

            particles.rotation.x =
                Math.sin(elapsed * 0.15) * 0.04;


            /* Entire scene reacts to mouse */

            crystalGroup.rotation.x +=
                (targetY * 0.12 -
                crystalGroup.rotation.x) * 0.02;

            crystalGroup.rotation.y +=
                (targetX * 0.12 -
                crystalGroup.rotation.y) * 0.02;


            /* Subtle glow breathing */

            glow.scale.setScalar(
                1 +
                Math.sin(elapsed * 1.4) * 0.035
            );


            /* Camera depth response */

            camera.position.x +=
                (targetX * 0.18 -
                camera.position.x) * 0.025;

            camera.position.y +=
                (-targetY * 0.12 -
                camera.position.y) * 0.025;

            camera.lookAt(0, 0, 0);


            renderer.render(
                scene,
                camera
            );
        }


        animate();


        /* =====================================================
           RESPONSIVE
        ===================================================== */

        function resizeThreeScene() {

            const width =
                heroVisual.clientWidth;

            const height =
                heroVisual.clientHeight;


            if (!width || !height) return;


            camera.aspect =
                width / height;

            camera.updateProjectionMatrix();


            renderer.setSize(
                width,
                height
            );


            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio,
                    2
                )
            );
        }


        window.addEventListener(
            "resize",
            resizeThreeScene
        );


        resizeThreeScene();
    }
}