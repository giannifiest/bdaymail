const screens = [...document.querySelectorAll('.screen')];
const music = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
let currentVoucher = null;

function showScreen(id) {
  screens.forEach(screen => screen.classList.toggle('active', screen.id === id));
  window.scrollTo({top: 0, behavior: 'smooth'});
}
document.getElementById('openMail').addEventListener('click', () => showScreen('email'));
document.getElementById('openLetter').addEventListener('click', () => showScreen('letter'));
document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => showScreen(button.dataset.next)));
document.querySelectorAll('[data-back]').forEach(button => button.addEventListener('click', () => showScreen(button.dataset.back)));
document.getElementById('replay').addEventListener('click', () => showScreen('welcome'));

musicToggle.addEventListener('click', async () => {
  try {
    if (music.paused) {
      await music.play();
      musicToggle.innerHTML = '♫ <span>Pause our song</span>';
    } else {
      music.pause();
      musicToggle.innerHTML = '♫ <span>Play our song</span>';
    }
  } catch (error) {
    musicToggle.querySelector('span').textContent = 'Add your-song.mp3';
  }
});
music.addEventListener('ended', () => musicToggle.innerHTML = '♫ <span>Play our song</span>');

const modal = document.getElementById('voucherModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalIcon = document.getElementById('modalIcon');
const redeemNote = document.getElementById('redeemNote');
document.querySelectorAll('.voucher').forEach(voucher => {
  voucher.addEventListener('click', () => {
    currentVoucher = voucher;
    modalTitle.textContent = voucher.dataset.title;
    modalDesc.textContent = voucher.dataset.desc;
    modalIcon.textContent = voucher.dataset.icon;
    redeemNote.textContent = 'This is a promise from your girl.';
    document.getElementById('redeemBtn').textContent = "I'll redeem this ♡";
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  });
});
function closeModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}
document.getElementById('closeModal').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.getElementById('redeemBtn').addEventListener('click', () => {
  if (!currentVoucher) return;
  redeemNote.textContent = 'Voucher claimed! Tell your girl when you want to use it. ♡';
  document.getElementById('redeemBtn').textContent = 'Claimed with love ✓';
});
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

// Small floating hearts on the final screen.
document.getElementById('final').addEventListener('click', event => {
  if (event.target.closest('button')) return;
  const heart = document.createElement('span');
  heart.textContent = '♥';
  heart.style.cssText = `position:fixed;left:${event.clientX}px;top:${event.clientY}px;color:#c34b62;pointer-events:none;z-index:25;font-size:20px;animation:float 1.2s ease forwards`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1300);
});
