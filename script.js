document.addEventListener('DOMContentLoaded', () => {
  // Estado local para controle de acessibilidade
  let fontMultiplier = 1.0;
  const FONT_STEP = 0.1;
  const FONT_MAX = 1.5;
  const FONT_MIN = 0.8;

  // Seleção dos elementos DOM
  const btnIncreaseFont = document.getElementById('btn-increase-font');
  const btnDecreaseFont = document.getElementById('btn-decrease-font');
  const btnToggleContrast = document.getElementById('btn-toggle-contrast');
  const rootElement = document.documentElement;
  const bodyElement = document.body;

  /* ==========================================================================
     Controle de Tamanho da Fonte
     ========================================================================== */
  function updateFontSize() {
    rootElement.style.setProperty('--font-size-multiplier', fontMultiplier);
  }

  btnIncreaseFont.addEventListener('click', () => {
    if (fontMultiplier < FONT_MAX) {
      fontMultiplier += FONT_STEP;
      updateFontSize();
    }
  });

  btnDecreaseFont.addEventListener('click', () => {
    if (fontMultiplier > FONT_MIN) {
      fontMultiplier -= FONT_STEP;
      updateFontSize();
    }
  });

  /* ==========================================================================
     Controle de Alto Contraste
     ========================================================================== */
  btnToggleContrast.addEventListener('click', () => {
    const isHighContrast = bodyElement.classList.toggle('high-contrast');

    // Atualiza o atributo aria-pressed para refletir o estado correto aos leitores de tela
    btnToggleContrast.setAttribute('aria-pressed', isHighContrast ? 'true' : 'false');

    // Salva a preferência no localStorage
    localStorage.setItem('accessibility_contrast', isHighContrast ? 'high' : 'normal');
  });

  /* ==========================================================================
     Persistência e Preferências do Usuário
     ========================================================================== */
  function loadPreferences() {
    // Restaurar preferência de alto contraste
    const savedContrast = localStorage.getItem('accessibility_contrast');
    if (savedContrast === 'high') {
      bodyElement.classList.add('high-contrast');
      btnToggleContrast.setAttribute('aria-pressed', 'true');
    }
  }

  loadPreferences();
});
