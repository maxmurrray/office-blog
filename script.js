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
    }
  };

  // Modal logic
  const modal = document.getElementById('productModal');
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
