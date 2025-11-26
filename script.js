// =========================
// Global Variables
// =========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const TAX_RATE = 0.12;      // 12% tax
const DISCOUNT_RATE = 0.05; // 5% discount

// =========================
// DOMContentLoaded Wrapper
// =========================
document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // Mute All Videos
  // =========================
  function muteAllVideos() {
    document.querySelectorAll("video").forEach(video => {
      video.muted = true;
      video.volume = 0;
    });
  }
  muteAllVideos();
  setInterval(muteAllVideos, 1000);

  // =========================
  // PRODUCTS PAGE
  // =========================
  const productsContainer = document.getElementById('productsContainer');
  if(productsContainer){
    // Products Array
    const products = [
      { name: "Adidas Jellyfish", category:"women", price:18000, media:["../Assets/Adidas_Jellyfish.MP4"] },
      { name: "Pink & White Asics Gel 9060", category: "women", price: 15000, media: ["../Assets/ASICSGel9060pkw.MP4"]},
      { name: "Pink & White Nike Vomero 5", category:"women", price:20000, media:["../Assets/NikeVomero5.MP4"] },
      { name: "Pink & Silver Asics Gel 1130", category: "women", price: 12000, media:["../Assets/AsicsGel1130.MP4"]},
      { name: "Pink & White New Balance 9060", category: "women", price: 19000, media:["../Assets/NewBalance9060.MP4"]},
      { name: "Clarks Pink Wallalee", category: "unisex", price: 30000, media: ["../Assets/PnkWallabee.MP4"]},
      { name: "Pink New Balance", category: "unisex", price: 16000, media: ["../Assets/Shoe2.mp4"]},
      { name: "Pink & White New Balance 9060", category: "unisex", price: 15000, media: ["../Assets/PinkNWhiteNB9060.MP4"]},
      { name: "Triple Pink Nike Dunk Low", category: "women", price: 20000, media: ["../Assets/NikeDunkTriplePink.MP4"]},
      { name: "Black New Balance", category:"unisex", price:17000, media:["../Assets/BlackNewBalance.MP4"]},
      { name: "Clarks Blue Wallabee", category: "unisex", price: 28000, media: ["../Assets/BlueWallabee.MP4"]},
      { name: "Black Nike Dunk Lows", category:"unisex", price: 22000, media: ["../Assets/BlackNikeDunksLow.JPEG"]},
      { name: "Grey Nike Dunk Lows", category: "unisex", price: 20000, media: ["../Assets/GreyDunks.JPEG"]},
      { name: "Baby Blue Nike Dunk Low", category: "unisex", price: 25000, media: ["../Assets/BabyBlueDunks.JPEG"]},
      { name: "Pink Velvet Nike Dunk Low", category: "unisex", price: 19000, media: ["../Assets/PinkVelvetNikeDunkLow.MP4"]},
      { name: "Dusty Pink Dunk Low", category: "unisex", price: 20000, media : ["../Assets/DustyPinkNikeLowDunks.JPEG"]},
      { name: "Purple Nike Dunk Low", category: "unisex", price: 22000, media: ["../Assets/PurpleDunkLowNike.JPEG"]},
      { name: "Lilac Nike Dunks Lows", category:"unisex", price:22000, media:["../Assets/LilacDunks.JPEG","../Assets/Lilac2.JPG"] },
      { name: "Blue Air Jordan 4", category: "unisex", price: 28000, media:["../Assets/AirJordan4.mp4"] },
      { name: "Clarks Beeswax Wallabee", category: "men", price: 29000, media: ["../Assets/BeeswaxClarks.MP4"]},
      { name: "Brown Kickers", category: "men", price: 34000, media :["../Assets/KickersB.mp4"]},
      { name: "Guess Slides", category: "women", price: 8000, media :["../Assets/GuessSlides.MP4"]},
      { name: "Kurt Geiger Slides", category: "women", price: 9000, media :["../Assets/KurtGeigerSlides.MP4"]},
      { name: "Pink Gucci Slides", category: "women", price: 10000, media: ["../Assets/PinksGucciSlides.MP4"]},
      { name: "Female Gucci Slides", category: "women", price: 15000, media: ["../Assets/GucciSlidesFemale.MP4"]},
      { name: "Gucci Slides", category: "unisex", price: 12000, media: ["../Assets/GGSlides.MP4"]},
      { name: "Gucci Slides", category: "unisex", price: 7000, media: ["../Assets/GGSlides2.MP4"]},
      { name: "Gucci Slides", category: "unisex", price: 9000, media: ["../Assets/GGSlides3.MP4"]}
    ];

    // Render Products Function
    function renderProducts(filter="all"){
      productsContainer.innerHTML = '';
      let filtered = (filter==="all") ? products : products.filter(p=>p.category===filter);

      filtered.forEach(p=>{
        const card = document.createElement('div');
        card.className = 'card';

        // Media HTML
        let mediaHTML = `<div class="media" data-index="0">`;
        p.media.forEach((m,i)=>{
          if(m.toLowerCase().endsWith('.mp4')){
            mediaHTML += `<video src="${m}" autoplay muted loop playsinline style="display:${i===0?'block':'none'}"></video>`;
          } else {
            mediaHTML += `<img src="${m}" alt="${p.name}" style="display:${i===0?'block':'none'}">`;
          }
        });
        if(p.media.length>1) mediaHTML += `<div class="prev">&#10094;</div><div class="next">&#10095;</div>`;
        mediaHTML += `</div>`;

        // Card inner HTML
        card.innerHTML = `
          ${mediaHTML}
          <div class="meta">
            <p>${p.name}</p>
            <h3>$${p.price.toLocaleString()}</h3>
            <select class="size-select">
              <option value="">Select Size</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </div>
          <button class="btn">Add to Cart</button>
        `;
        productsContainer.appendChild(card);

        // Add to Cart Event
        const btn = card.querySelector('.btn');
        const select = card.querySelector('.size-select');
        btn.addEventListener('click', ()=>{
          if(select.value===""){ alert("Please select a size!"); return; }
          cart.push({product:p, size:select.value});
          localStorage.setItem('cart', JSON.stringify(cart));
          alert(`${p.name} (Size ${select.value}) added to cart!`);
          window.location.href = "cart.html";
        });

        // Media Slider
        const mediaDiv = card.querySelector('.media');
        const mediaItems = Array.from(mediaDiv.querySelectorAll('video,img'));
        let index = 0;
        if(p.media.length>1){
          const prev = mediaDiv.querySelector('.prev');
          const next = mediaDiv.querySelector('.next');
          prev.addEventListener('click', ()=>{
            mediaItems[index].style.display = 'none';
            index = (index - 1 + mediaItems.length) % mediaItems.length;
            mediaItems[index].style.display = 'block';
          });
          next.addEventListener('click', ()=>{
            mediaItems[index].style.display = 'none';
            index = (index + 1) % mediaItems.length;
            mediaItems[index].style.display = 'block';
          });
        }
      });
    }

    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.filter);
      });
    });

    renderProducts();
  } // End Products Page

  // =========================
  // CART PAGE
  // =========================
  const containerC = document.getElementById('cartContainer');
  const summaryDiv = document.getElementById('cartSummary');

  if(containerC){
    function renderCart(){
      containerC.innerHTML = '';
      summaryDiv.innerHTML = '';

      if(cart.length===0){
        containerC.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
        return;
      }

      let subtotal = 0;
      cart.forEach((item,i)=>{
        const product = item.product || item;
        const size = item.size || 'N/A';
        const quantity = item.quantity || 1;
        const itemTotal = product.price * quantity;
        subtotal += itemTotal;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <p>${product.name} <span>Size: ${size}</span></p>
          <p>Qty: ${quantity}</p>
          <p>$${itemTotal.toLocaleString()}</p>
          <button onclick="removeItem(${i})"><i class="fa-solid fa-trash"></i> Remove</button>
        `;
        containerC.appendChild(div);
      });

      const discount = subtotal * DISCOUNT_RATE;
      const tax = (subtotal - discount) * TAX_RATE;
      const total = subtotal - discount + tax;

      summaryDiv.innerHTML = `
        <p>Subtotal: <span>$${subtotal.toLocaleString()}</span></p>
        <p class="discount">Discount (5%): <span>-$${discount.toLocaleString()}</span></p>
        <p class="tax">Tax (12%): <span>$${tax.toLocaleString()}</span></p>
        <h3>Total: $${total.toLocaleString()}</h3>
      `;
    }

    window.removeItem = function(i){
      cart.splice(i,1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }

    const checkoutBtn = document.getElementById('checkoutBtn');
    if(checkoutBtn){
      checkoutBtn.addEventListener('click', ()=>{
        if(cart.length===0){ alert('Your cart is empty!'); return; }
        window.location.href = 'checkout.html';
      });
    }

    renderCart();
  }

  // =========================
  // CHECKOUT PAGE
  // =========================
  const subtotalDiv = document.getElementById("subtotalDiv");
  if(subtotalDiv){ // Checkout page exists
    const discountDiv = document.getElementById("discountDiv");
    const taxDiv = document.getElementById("taxDiv");
    const totalAmount = document.getElementById("totalAmount");
    const cartSummary = document.getElementById("cartSummary");

    function renderSummary(){
      cartSummary.innerHTML = '';
      if(cart.length===0){
        cartSummary.innerHTML = '<p>Your cart is empty.</p>';
        subtotalDiv.textContent = '';
        discountDiv.textContent = '';
        taxDiv.textContent = '';
        totalAmount.textContent = 'Total: $0';
        return;
      }

      let subtotal = 0;
      cart.forEach(item=>{
        const product = item.product || item;
        const size = item.size || 'N/A';
        const qty = item.quantity || 1;
        const itemTotal = product.price * qty;
        subtotal += itemTotal;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `<p>${product.name} <span>Size: ${size}</span></p><p>$${itemTotal.toLocaleString()}</p>`;
        cartSummary.appendChild(div);
      });

      const discount = subtotal * DISCOUNT_RATE;
      const tax = (subtotal - discount) * TAX_RATE;
      const total = subtotal - discount + tax;

      subtotalDiv.textContent = "Subtotal: $" + subtotal.toLocaleString();
      discountDiv.textContent = "Discount (5%): -$" + discount.toLocaleString();
      taxDiv.textContent = "Tax (12%): $" + tax.toLocaleString();
      totalAmount.textContent = "Total: $" + total.toLocaleString();
    }

    renderSummary();

    // Payment Method Toggle
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const details = {
      Visa: document.getElementById("visaDetails"),
      Amex: document.getElementById("amexDetails"),
      PayPal: document.getElementById("paypalDetails"),
      Klarna: document.getElementById("klarnaDetails"),
    };

    paymentRadios.forEach(radio=>{
      radio.addEventListener('change', ()=>{
        Object.values(details).forEach(d=>d.classList.remove('active'));
        details[radio.value].classList.add('active');
      });
    });

    // Buttons
    const checkoutBtn = document.getElementById("checkoutBtn");
    if(checkoutBtn){
      checkoutBtn.addEventListener("click", ()=>{
        if(cart.length===0){ alert("Your cart is empty!"); return; }

        const name = document.getElementById("name").value.trim();
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value.trim();
        const zip = document.getElementById("zip").value.trim();
        const payment = document.querySelector('input[name="payment"]:checked')?.value;

        if(!name || !address || !city || !zip || !payment){
          alert("Please fill in all shipping details and select a payment method.");
          return;
        }

        alert(
          `Order Confirmed!\nName: ${name}\nAddress: ${address}, ${city}, ${zip}\nPayment: ${payment}\nTotal: ${totalAmount.textContent}`
        );

        localStorage.removeItem("cart");
        cart = [];
        renderSummary();
      });
    }

    const cancelBtn = document.getElementById("cancelBtn");
    if(cancelBtn){
      cancelBtn.addEventListener('click', ()=>{ window.location.href="products.html"; });
    }
    const clearBtn = document.getElementById("clearBtn");
    if(clearBtn){
      clearBtn.addEventListener('click', ()=>{
        if(confirm("Clear all items from cart?")){
          cart = [];
          localStorage.setItem("cart", JSON.stringify(cart));
          renderSummary();
        }
      });
    }
    const closeBtn = document.getElementById("closeBtn");
    if(closeBtn){
      closeBtn.addEventListener('click', ()=>{ window.location.href="products.html"; });
    }

  } // End checkout page

}); // End DOMContentLoaded
