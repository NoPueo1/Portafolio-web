/**
 * Agustín Vásquez — Portafolio (VasKas Systems)
 * Controladores de UI, modo oscuro, pestañas de código, modal y portapapeles
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ========================================================================= */
  /* 1. NAVEGACIÓN BRAND: SCROLL SUAVE AL TOPE ABSOLUTO DE LA PÁGINA           */
  /* ========================================================================= */
  const navBrandLink = document.getElementById('nav-brand-link');
  if (navBrandLink) {
    navBrandLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ========================================================================= */
  /* 2. GESTOR DE TEMA (MODO OSCURO / CLARO)                                   */
  /* ========================================================================= */
  const html = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');

  function toggleTheme() {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) {}
    showToast(isDark ? 'Modo Oscuro' : 'Modo Claro');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  /* ========================================================================= */
  /* 3. NOTIFICACIONES TOAST (MINIMALISTA)                                     */
  /* ========================================================================= */
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.remove('translate-y-16', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-16', 'opacity-0', 'pointer-events-none');
    }, 2200);
  }

  /* ========================================================================= */
  /* 4. PESTAÑAS DE CÓDIGO (MICROSERVICIOS)                                    */
  /* ========================================================================= */
  const codeTabBtns = document.querySelectorAll('.code-tab-btn');
  const codeTabContents = document.querySelectorAll('.code-tab-content');

  codeTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab');
      
      codeTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      codeTabContents.forEach(content => {
        if (content.id === targetTabId) {
          content.classList.remove('hidden');
          content.classList.add('block');
        } else {
          content.classList.remove('block');
          content.classList.add('hidden');
        }
      });
    });
  });

  /* ========================================================================= */
  /* 5. ACCIONES DE PORTAPAPELES CON FEEDBACK VISUAL INMEDIATO                 */
  /* ========================================================================= */
  const EMAIL_ADDRESS = 'agusvasquez23z@gmail.com';

  function triggerButtonSuccess(btn, successLabel) {
    if (!btn) return;
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `
      <svg class="w-3.5 h-3.5 text-emerald-500 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      <span class="text-emerald-500 font-bold">${successLabel}</span>
    `;
    setTimeout(() => {
      btn.innerHTML = originalHTML;
    }, 1600);
  }

  function copyToClipboard(text, successMessage, triggerBtn, successBtnLabel) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage);
        if (triggerBtn) triggerButtonSuccess(triggerBtn, successBtnLabel || '¡Copiado!');
      }).catch(() => {
        fallbackCopy(text, successMessage);
        if (triggerBtn) triggerButtonSuccess(triggerBtn, successBtnLabel || '¡Copiado!');
      });
    } else {
      fallbackCopy(text, successMessage);
      if (triggerBtn) triggerButtonSuccess(triggerBtn, successBtnLabel || '¡Copiado!');
    }
  }

  function fallbackCopy(text, successMessage) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(successMessage);
    } catch (err) {}
    document.body.removeChild(tempInput);
  }

  // Copiar Email en Hero
  const quickCopyEmail = document.getElementById('quick-copy-email');
  if (quickCopyEmail) {
    quickCopyEmail.addEventListener('click', () => {
      copyToClipboard(EMAIL_ADDRESS, 'Correo copiado al portapapeles', quickCopyEmail, '¡Copiado!');
    });
  }

  // Copiar Email en Footer
  const footerCopyEmail = document.getElementById('footer-copy-email');
  if (footerCopyEmail) {
    footerCopyEmail.addEventListener('click', () => {
      copyToClipboard(EMAIL_ADDRESS, 'Correo copiado al portapapeles', footerCopyEmail, '¡Copiado!');
    });
  }

  // Copiar ID Certificación Scrum
  const copyCertBtn = document.getElementById('copy-cert-btn');
  if (copyCertBtn) {
    copyCertBtn.addEventListener('click', () => {
      copyToClipboard('1128172', 'ID 1128172 copiado', copyCertBtn, 'ID Copiado');
    });
  }

  /* ========================================================================= */
  /* 6. MODAL DE ARQUITECTURA DE MICROSERVICIOS                                */
  /* ========================================================================= */
  const archModal = document.getElementById('arch-modal');
  const openArchModalBtns = document.querySelectorAll('.open-arch-modal-btn');
  const closeArchModal = document.getElementById('close-arch-modal');
  const closeArchModalBtn = document.getElementById('close-arch-modal-btn');

  function openModal() {
    if (!archModal) return;
    archModal.classList.remove('hidden');
    archModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!archModal) return;
    archModal.classList.add('hidden');
    archModal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  openArchModalBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeArchModal) closeArchModal.addEventListener('click', closeModal);
  if (closeArchModalBtn) closeArchModalBtn.addEventListener('click', closeModal);

  if (archModal) {
    archModal.addEventListener('click', (e) => {
      if (e.target === archModal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});
