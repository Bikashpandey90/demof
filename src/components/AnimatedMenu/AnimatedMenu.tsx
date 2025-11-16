import "./menu.css";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", ".15, 1, .25, 1");

interface AnimatedMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnimatedMenu = ({ isOpen, onClose }: AnimatedMenuProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);

  const navLogoRef = useRef<HTMLAnchorElement>(null);
  const menuBtnRef = useRef<HTMLParagraphElement>(null);
  const cartBtnRef = useRef<HTMLParagraphElement>(null);

  const overlayLogoRef = useRef<HTMLAnchorElement>(null);
  const closeBtnRef = useRef<HTMLParagraphElement>(null);

  const menuItemsRef = useRef<HTMLDivElement>(null);
  const menuImagesRef = useRef<HTMLDivElement>(null);
  const menuFooterColsRef = useRef<HTMLDivElement>(null);

  const currentStateRef = useRef(false);

  useGSAP(
    () => {
      if (!menuRef.current) return;

      gsap.set(menuOverlayRef.current, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        pointerEvents: "none",
      });

      gsap.set([overlayLogoRef.current, closeBtnRef.current], {
        y: "100%",
      });

      const revealerLinks = menuRef.current.querySelectorAll(".menu-overlay-items .revealer a");
      gsap.set(revealerLinks, {
        y: "100%",
      });

      const imageCards = menuRef.current.querySelectorAll(".menu-images .image-card");
      gsap.set(imageCards, {
        y: "100%",
      });

      const footerRevealers = menuRef.current.querySelectorAll(".menu-footer .revealer p, .menu-footer .revealer a");
      gsap.set(footerRevealers, {
        y: "100%",
      });
    },
    { scope: menuRef }
  );

  const openMenu = () => {
    if (isAnimating || currentStateRef.current) return;

    setIsAnimating(true);
    currentStateRef.current = true;
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    tl.to([navLogoRef.current, menuBtnRef.current, cartBtnRef.current], {
      y: "-100%",
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
      onComplete: () => {
        gsap.set([navLogoRef.current, menuBtnRef.current, cartBtnRef.current], {
          y: "100%",
        });
      },
    });

    tl.to(
      menuOverlayRef.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "hop",
      },
      "-=0.55"
    );

    tl.to(
      [overlayLogoRef.current, closeBtnRef.current],
      {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.5"
    );

    if (menuRef.current) {
      const revealerLinks = menuRef.current.querySelectorAll(".menu-overlay-items .revealer a");
      tl.to(
        revealerLinks,
        {
          y: "0%",
          duration: 1,
          stagger: 0.075,
          ease: "power3.out",
        },
        "<"
      );

      const imageCards = menuRef.current.querySelectorAll(".menu-images .image-card");
      tl.to(
        imageCards,
        {
          y: "0%",
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
        },
        "<"
      );

      const footerRevealers = menuRef.current.querySelectorAll(".menu-footer .revealer p, .menu-footer .revealer a");
      tl.to(
        footerRevealers,
        {
          y: "0%",
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        },
        "<"
      );
    }
  };

  const closeMenu = () => {
    if (isAnimating || !currentStateRef.current) return;

    setIsAnimating(true);
    currentStateRef.current = false;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        onClose();
      },
    });

    tl.to([overlayLogoRef.current, closeBtnRef.current], {
      y: "-100%",
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.inOut",
    });

    if (menuRef.current) {
      const links = menuRef.current.querySelectorAll(".menu-overlay-items .revealer a");
      const imageCards = menuRef.current.querySelectorAll(".menu-images .image-card");
      const footer = menuRef.current.querySelectorAll(".menu-footer .revealer p, .menu-footer .revealer a");

      tl.to(
        [...links, ...imageCards, ...footer],
        {
          y: "-100%",
          duration: 0.55,
          stagger: 0.05,
          ease: "power3.inOut",
        },
        "<"
      );
    }

    tl.to(
      menuOverlayRef.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.9,
        ease: "power3.inOut",
      },
      "-=0.25"
    );

    tl.add(() => {
      gsap.delayedCall(0.05, () => {
        gsap.set(menuOverlayRef.current, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        });

        gsap.set([overlayLogoRef.current, closeBtnRef.current], { y: "100%" });

        if (menuRef.current) {
          const links = menuRef.current.querySelectorAll(".menu-overlay-items .revealer a");
          const imageCards = menuRef.current.querySelectorAll(".menu-images .image-card");
          const footer = menuRef.current.querySelectorAll(".menu-footer .revealer p, .menu-footer .revealer a");

          gsap.set([...links, ...imageCards, ...footer], { y: "100%" });
        }
      });
    });

    tl.to(
      [navLogoRef.current, menuBtnRef.current, cartBtnRef.current],
      {
        y: "0%",
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
      },
      "-=0.3"
    );
  };

  useEffect(() => {
    if (isOpen && !currentStateRef.current) {
      openMenu();
    } else if (!isOpen && currentStateRef.current) {
      closeMenu();
    }
  }, [isOpen]);

  const products = [
    { id: 1, name: "Product 1", image: "/products/green.png" },
    { id: 2, name: "Product 2", image: "/products/pink.png" },
    { id: 3, name: "Product 3", image: "/products/red.png" },
    { id: 4, name: "Product 4", image: "/products/blue.png" },
  ];

  return (
    <div className="menu" ref={menuRef}>
      <div className="nav" ref={navRef}>
        <div className="nav-logo">
          <div className="revealer">
            <a href="/" ref={navLogoRef}>
              {/* MomoGuys */}
            </a>
          </div>
        </div>
        <div className="nav-items">
          <div className="nav-menu-toggle-open">
            <div className="revealer" onClick={openMenu}>
              {/* Menu */}
            </div>
          </div>
          <div className="nav-cart-btn">
            <div className="revealer"></div>
          </div>
        </div>
      </div>
      <div className="menu-overlay" ref={menuOverlayRef}>
        <div className="menu-overlay-nav">
          <div className="menu-overlay-nav-logo">
            <div className="revealer">
              <a href="/" ref={overlayLogoRef}>
                MomoGuys
              </a>
            </div>
          </div>
          <div className="menu-overlay-nav-toggle-close">
            <div className="revealer" onClick={closeMenu}>Close</div>
          </div>
        </div>
        <div className="menu-overlay-items" ref={menuItemsRef}>
          <div className="revealer">
            <a href="/">Index</a>
          </div>
          <div className="revealer">
            <a href="/catalogue">Catalogue</a>
          </div>
          <div className="revealer">
            <a href="/info">Info</a>
          </div>
          <div className="revealer">
            <a href="/archive">Archive</a>
          </div>
          <div className="revealer">
            <a href="/editorial">Editorial</a>
          </div>
        </div>

        <div className="menu-images" ref={menuImagesRef}>
          {products.map((product) => (
            <div key={product.id} className="image-card">
              <img src={product.image || "/placeholder.svg"} alt={product.name} />
            </div>
          ))}
        </div>

        <div className="menu-footer" ref={menuFooterColsRef}>
          <div className="menu-footer-col">
            <div className="revealer">
              <p>&copy;2025 All rights reserved</p>
            </div>
          </div>
          <div className="menu-footer-col">
            <div className="socials">
              <div className="revealer">
                <a href="">Facebook</a>
              </div>
              <div className="revealer">
                <a href="">Instagram</a>
              </div>
              <div className="revealer">
                <a href="">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedMenu;
