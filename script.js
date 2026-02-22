/* ============================================
   Office Blog — MVP Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Fade-in product cards on scroll
  const cards = document.querySelectorAll('.product-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${index * 80}ms`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.classList.add('fade-in');
    observer.observe(card);
  });

  // Product data for modal
  const products = {
    'mx-master': {
      image: 'images/mouse.png',
      category: 'Tech — Mice',
      name: 'Logitech MX Master 4',
      headline: 'The mouse that made our writer finish a 3,000-word draft without stopping.',
      review: 'The MX Master 4 has a scroll wheel that feels like rolling a marble over silk. The ergonomic shape disappears in your hand after ten minutes. We didn\'t set out to write more — we just didn\'t want to stop.',
      details: ['Ergonomic contour', '8K DPI sensor', 'USB-C charging', 'Multi-device pairing'],
      price: '$119.99',
      link: '#'
    },
    'gather-stand': {
      image: 'images/monitor-stand.png',
      category: 'Desk — Stands',
      name: 'Gather Large Monitor Stand',
      headline: 'The stand that turned a cluttered desk into a place we actually wanted to sit down at.',
      review: 'There\'s something about the Gather Stand that changes your whole posture — not just physically, but mentally. The powder-coated steel and solid walnut legs feel like furniture, not an accessory. Your monitor lifts to the perfect height, and that hidden tray underneath swallows your laptop, notebook, or the chaos you used to pretend wasn\'t there. Every time we sat down at this desk, we started working faster — because the space finally felt like it deserved real work.',
      details: ['Powder-coated steel', 'Solid walnut legs', 'Holds up to 35 lbs', 'Made in Pennsylvania', 'Wool felt lined tray', '38" × 10.5" × 4.75"'],
      price: '$329.00',
      link: 'https://ugmonk.com/collections/the-gather-collection/products/gather-large-monitor-stand-black-walnut?variant=42414472495254'
    },
    'stone-diffuser': {
      image: 'images/stone-diffuser.png',
      category: 'Comfort — Scent',
      name: 'Vitruvi Stone Diffuser',
      headline: 'The diffuser that made our office smell so good we stopped wanting to leave.',
      review: 'Most diffusers look like medical equipment someone forgot to hide. The Vitruvi Stone is the opposite — a matte ceramic cylinder that sits on your desk like a piece of sculpture. Fill it with water, add a few drops of oil, and within minutes your workspace smells like a place you chose to be, not a place you have to be. We noticed something unexpected: on days the diffuser was running, we took fewer breaks. Not because we were forcing focus — but because the room just felt right. Eight hours of runtime means it outlasts your workday.',
      details: ['Matte ceramic finish', '8-hour runtime', 'Water-based diffusion', 'BPA-free', 'Whisper-quiet operation', 'Auto shut-off'],
      price: '$129.99',
      link: 'https://vitruvi.com/products/stone-essential-oil-diffuser?variant=41381103763636'
    },
    'nuphy-air75': {
      image: 'images/landing-nuphy-keyboard.png',
      category: 'Tech — Keyboards',
      name: 'NuPhy Air75 V2',
      headline: 'The keyboard that turned typing from a chore into something we actually looked forward to.',
      review: 'Every keystroke on the Air75 has this soft, muted pop that sounds like tapping on something expensive. It\'s thin enough to sit flush on your desk but mechanical enough that every key press feels intentional. The PBT keycaps never get shiny or greasy no matter how long you type. We started writing more just because the sound was so satisfying. Connect it to three devices and swap between your Mac, iPad, and PC with a single key. The hot-swappable switches mean you can change the feel anytime without buying a new board.',
      details: ['Low-profile mechanical', 'Hot-swappable switches', 'PBT dye-sub keycaps', 'Tri-mode wireless', 'RGB backlight', '75% compact layout'],
      price: '$109.95',
      link: 'https://www.amazon.com/dp/B09LGYQFRC?tag=officeblog-20'
    },
    'benq-screenbar': {
      image: 'images/landing-benq-screenbar.png',
      category: 'Lighting — Task',
      name: 'BenQ ScreenBar Halo',
      headline: 'The light that fixed our eye strain and made 5 PM feel like 9 AM.',
      review: 'We didn\'t know our eyes were strained until this thing fixed it. The ScreenBar clips to your monitor and lights your desk without any glare on your screen. The wireless dial controller has a weighted, smooth feel like adjusting a high-end stereo. Turning it to set your brightness every morning becomes a tiny ritual. The backlight bounces off your wall for ambient glow. By the end of the first week, the afternoon headaches were gone. That alone was worth double the price.',
      details: ['Zero screen glare', 'Wireless dial controller', 'Adjustable color temp', 'Auto-dimming sensor', 'Backlight for ambient glow', 'USB-C powered'],
      price: '$179.99',
      link: 'https://www.amazon.com/dp/B0BV3LM3K5?tag=officeblog-20'
    },
    'orbitkey-mat': {
      image: 'images/landing-orbitkey-mat.png',
      category: 'Desk — Mats',
      name: 'Orbitkey Desk Mat',
      headline: 'The desk mat that smells like a new wallet and keeps your cables from falling into the void.',
      review: 'Full-grain leather under your wrists all day. Your cables snap into a magnetic channel with a satisfying click instead of sliding off the back of your desk. The leather develops a patina over time, so after a few months yours looks completely different from anyone else\'s. It smells subtly like real leather for the first month. Every time you sit down, the experience feels intentional. We stopped dreading Monday mornings, and honestly, this mat had something to do with it.',
      details: ['Full-grain leather', 'Magnetic cable holder', 'Document hideaway', 'Develops patina over time', 'Available in multiple sizes', 'Vegan option available'],
      price: '$64.90',
      link: 'https://www.amazon.com/s?k=orbitkey+desk+mat&tag=officeblog-20'
    },
    'foreverspin-top': {
      image: 'images/landing-foreverspin-top.png',
      category: 'Focus — Fidget',
      name: 'Foreverspin Titanium Top',
      headline: 'The precision instrument that looks like a Bond villain prop and helps you think.',
      review: 'Machined from a single piece of titanium. You spin it on your desk while thinking and it goes for minutes. Dead silent. Perfectly balanced. This isn\'t a fidget spinner. It\'s the kind of thing you keep next to your monitor and reach for during calls. Your brain processes in the background while your hands stay busy. People will ask about it. You\'ll feel like a Bond villain. Both of these things are features, not bugs.',
      details: ['Grade 5 titanium', 'Precision machined', 'Spins for minutes', 'Silent operation', 'Lifetime warranty', 'Handmade in USA'],
      price: '$45.00',
      link: 'https://www.amazon.com/s?k=foreverspin+titanium&tag=officeblog-20'
    },
    'fellow-mug': {
      image: 'images/landing-fellow-mug.png',
      category: 'Comfort — Coffee',
      name: 'Fellow Carter Everywhere Mug',
      headline: 'The mug that made our morning coffee feel like an event instead of a habit.',
      review: 'The lid has a twist-lock with a tactile click that makes you feel like you\'re sealing something important. The ceramic-coated interior means your coffee tastes like coffee, not metal. The splash guard actually works. The weight sits perfectly in your hand. It\'s the mug that makes your morning coffee feel intentional instead of rushed. The silicone base means it doesn\'t slide or scratch your desk. Small thing, but it matters when everything on your desk just works.',
      details: ['Ceramic-coated interior', 'Twist-lock splash guard', 'Silicone non-slip base', '12oz capacity', 'Double-wall insulated', 'Dishwasher safe'],
      price: '$35.00',
      link: 'https://www.amazon.com/s?k=fellow+carter+everywhere+mug&tag=officeblog-20'
    },
    'ugmonk-analog': {
      image: 'images/landing-ugmonk-analog.png',
      category: 'Organization — Tasks',
      name: 'Ugmonk Analog',
      headline: 'The task system that made us put our phones down and actually finish things.',
      review: 'Three wooden card slots: Today, Next, Someday. You write a task on a thick card and physically slide it into a slot. That\'s the whole system. In a world of apps and notifications, the act of writing on a real card and moving it with your hands is weirdly grounding. The cards feel premium. The walnut wood is warm. We started completing more tasks not because we were more disciplined, but because the system made prioritizing feel satisfying instead of stressful. Ali Abdaal uses one. So does half of productivity YouTube.',
      details: ['Solid walnut wood', 'Thick premium cards', 'Three sections: Today, Next, Someday', 'Refill cards available', 'Designed in Pennsylvania', 'Minimalist footprint'],
      price: '$98.00',
      link: 'https://ugmonk.com/pages/analog?tag=officeblog-20'
    },
    'sony-xm5': {
      image: 'images/landing-sony-xm5.png',
      category: 'Tech — Audio',
      name: 'Sony WH-1000XM5',
      headline: 'The headphones that made our open office feel like a private studio.',
      review: 'You put them on and the world goes quiet. Not "a little quieter." Quiet. Like someone pressed mute on reality. Eight microphones analyze ambient noise and cancel it in real time. The 30-hour battery gets you through an entire work week. The ear cushions are soft enough for all-day wear. Speak-to-chat pauses your music when you talk. Once you try these, working without them feels like trying to read in a nightclub. We don\'t know how we survived open offices before these.',
      details: ['Industry-leading ANC', '30-hour battery life', '8 microphones', 'Speak-to-chat', 'Multipoint connection', 'Carrying case included'],
      price: '$348.00',
      link: 'https://www.amazon.com/dp/B0D1YLC4V4?tag=officeblog-20'
    },
    'tactile-turn-pen': {
      image: 'images/landing-tactile-turn-pen.png',
      category: 'Writing — Pens',
      name: 'Tactile Turn Bolt Action',
      headline: 'The pen you click 400 times a day because the bolt mechanism is that satisfying.',
      review: 'You click a bolt mechanism to deploy the tip. It\'s a fidget toy that happens to write beautifully. The machined titanium has a weight and texture that makes it impossible to put down. We kept this on our desk just to click while thinking. Then we started actually writing with it and realized the ink is smooth, the grip is perfect, and the balance is unlike any pen we\'ve held. People who use these never shut up about them. Now we understand why.',
      details: ['Grade 5 titanium body', 'Bolt-action mechanism', 'Compatible with most refills', 'Machined in USA', 'Lifetime warranty', 'Available in multiple finishes'],
      price: '$99.00',
      link: 'https://www.amazon.com/s?k=tactile+turn+bolt+action+pen&tag=officeblog-20'
    },
    'timemore-grinder': {
      image: 'images/landing-timemore-grinder.png',
      category: 'Comfort — Coffee',
      name: 'Timemore Chestnut C3',
      headline: 'The 30-second ritual that resets your brain between deep work blocks.',
      review: 'Grind your own coffee beans at your desk. The handle resistance, the crunch of beans being crushed, the smell that fills your space. It turns "getting coffee" into a 2-minute sensory ritual that completely resets your brain. We started using this between focus blocks and it replaced scrolling Twitter as our default break activity. The burr mechanism is smooth, the grind is consistent, and the whole thing is compact enough to live permanently on your desk.',
      details: ['Stainless steel burrs', 'Adjustable grind size', 'Compact desktop size', 'Wooden knob handle', 'Easy to clean', 'Consistent grind quality'],
      price: '$59.90',
      link: 'https://www.amazon.com/s?k=timemore+chestnut+c3&tag=officeblog-20'
    },
    'yamazaki-tower': {
      image: 'images/landing-yamazaki-tower.png',
      category: 'Organization — Desk',
      name: 'Yamazaki Tower Desk Bar',
      headline: 'The $28 organizer that makes people think you hired an interior designer.',
      review: 'Japanese minimalist design. Steel and wood. Everything has a slot. You drop your phone in its spot when you sit down and that physical act becomes a focus trigger. The steel is powder-coated so smooth it feels like touching a river stone. Holds pens, phone, earbuds, cards, coins. It looks like it costs $200. People always ask where we got it. The answer is "Amazon, for $28" and then they immediately order one. It\'s that kind of product.',
      details: ['Powder-coated steel', 'Natural wood accent', 'Phone slot', 'Pen holder', 'Compact footprint', 'Japanese minimalist design'],
      price: '$28.00',
      link: 'https://www.amazon.com/s?k=yamazaki+tower+desk+organizer&tag=officeblog-20'
    }
  };

  // Modal logic
  const modal = document.getElementById('productModal');

  if (modal) {
    const modalImg = document.getElementById('modalImg');
    const modalCategory = document.getElementById('modalCategory');
    const modalName = document.getElementById('modalName');
    const modalHeadline = document.getElementById('modalHeadline');
    const modalReview = document.getElementById('modalReview');
    const modalDetails = document.getElementById('modalDetails');
    const modalPrice = document.getElementById('modalPrice');
    const modalLink = document.getElementById('modalLink');

    function openModal(productId) {
      const product = products[productId];
      if (!product) return;

      modalImg.src = product.image;
      modalImg.alt = product.name;
      modalCategory.textContent = product.category;
      modalName.textContent = product.name;
      modalHeadline.textContent = product.headline;
      modalReview.textContent = product.review;
      modalDetails.innerHTML = '<ul>' + product.details.map(d => `<li>${d}</li>`).join('') + '</ul>';
      modalPrice.textContent = product.price;
      modalLink.href = product.link;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.product-card[data-product]').forEach(card => {
      card.addEventListener('click', () => {
        openModal(card.dataset.product);
      });
    });

    modal.querySelector('.modal-close').addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // Mobile hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = mobileMenu ? mobileMenu.querySelector('.mobile-menu-close') : null;

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });

    // Close menu when a link is tapped
    mobileMenu.querySelectorAll('.mobile-menu-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Subscribe form — checkmark animation
  document.querySelectorAll('.hero-email').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const input = form.querySelector('.newsletter-input');
      const button = form.querySelector('.newsletter-button');
      const checkmark = form.querySelector('.subscribe-success');

      if (!input.value || !checkmark) return;

      // Disable to prevent double submit
      button.disabled = true;
      input.disabled = true;

      // Show the checkmark
      checkmark.classList.add('visible');

      // Clear input after a short pause
      setTimeout(() => {
        input.value = '';
      }, 300);

      // Reset after 4 seconds so they could subscribe again if needed
      setTimeout(() => {
        checkmark.classList.remove('visible');
        button.disabled = false;
        input.disabled = false;
      }, 4000);
    });
  });
});
