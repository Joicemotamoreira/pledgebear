function redirectToSignUp() {
  window.location.href='https://pledgebear-test.netlify.app/signup';
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Track scrolling for navbar effects
    const navbar = document.getElementById('navbar');
    let isMenuOpen = false;
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Scroll to section function
    window.scrollToSection = function(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80; // Navbar height + padding
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (isMenuOpen) {
          toggleMenu();
        }
      }
    };
    
    // Toggle mobile menu
    window.toggleMenu = function() {
      isMenuOpen = !isMenuOpen;
      if (isMenuOpen) {
        mobileMenu.classList.add('active');
        document.querySelector('.menu-toggle i').classList.remove('fa-bars');
        document.querySelector('.menu-toggle i').classList.add('fa-times');
      } else {
        mobileMenu.classList.remove('active');
        document.querySelector('.menu-toggle i').classList.remove('fa-times');
        document.querySelector('.menu-toggle i').classList.add('fa-bars');
      }
    };
    
    // Handle navbar appearance on scroll
    function handleScroll() {
      if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.padding = '0.75rem 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
      }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Form handling
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const pageName = document.getElementById('page-name').value;
        
        // Validate form (simple validation for demo)
        if (name && email && pageName) {
          // Show success message (in a real app, this would send data to a server)
          alert(`Thanks ${name}! Your PledgeBear page "${pageName}" is being created. Check your email at ${email} for next steps.`);
          signupForm.reset();
        } else {
          alert('Please fill in all fields');
        }
      });
    }
    
    // Add animation on scroll
    const animatedElements = document.querySelectorAll('.animate');
    
    function checkInView() {
      animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const threshold = element.dataset.threshold || 0.2;
        
        const isInView = (
          rect.top <= windowHeight * (1 - threshold) &&
          rect.bottom >= windowHeight * threshold
        );
        
        if (isInView) {
          setTimeout(() => {
            element.classList.add('active');
          }, element.dataset.delay || 0);
        }
      });
    }
    
    // Check elements on load and scroll
    checkInView();
    window.addEventListener('scroll', checkInView);
  });
  
  // Add keyframes for floating animation
  function addFloatAnimation() {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.textContent = `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      
      .bear-animation {
        animation: float 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(styleSheet);
  }
  
  // Call the function to add animation
  addFloatAnimation();


