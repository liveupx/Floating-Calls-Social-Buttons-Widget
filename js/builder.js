/**
 * Floating Widget Builder
 * Interactive configuration and code generator
 * 
 * @author LiveUpx.com
 * @license MIT
 * @version 1.0.0
 */

(function() {
  'use strict';

  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  const defaultConfig = {
    buttons: [],
    mainButton: {
      icon: 'plus',
      color: '#6366f1',
      size: 56
    },
    position: {
      vertical: 'bottom',
      horizontal: 'right',
      offsetX: 24,
      offsetY: 24
    },
    appearance: {
      buttonSize: 48,
      spacing: 12,
      expandDirection: 'up',
      showLabels: true,
      pulseAnimation: true,
      shadow: true
    },
    behavior: {
      trigger: 'click',
      showDelay: 0,
      scrollTrigger: false,
      scrollOffset: 100,
      closeOnOutsideClick: true,
      mobileBreakpoint: 768
    }
  };

  let config = JSON.parse(JSON.stringify(defaultConfig));
  let editingButtonIndex = -1;
  let previewMode = 'desktop';

  // ============================================
  // ICON LIBRARY
  // ============================================
  
  const icons = {
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    sms: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
    messenger: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/></svg>',
    viber: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.182.518 6.793.377 10.012c-.141 3.218-.295 9.251 5.678 10.882l.007.006-.007 2.487s-.047.996.621 1.2c.806.246 1.279-.517 2.049-1.344.423-.453.997-1.117 1.434-1.627 3.957.332 7.001-.428 7.345-.538.792-.254 5.277-.832 6.009-6.79.754-6.143-.361-10.03-2.36-11.78 0 0 .053.019 0 0-1.06-.977-5.32-1.936-8.632-1.99 0 0-.403-.023-1.123-.016zm.166 1.935c.584-.007.92.013.92.013 2.793.046 6.549.818 7.411 1.607 1.638 1.435 2.602 5.065 1.963 10.282-.599 4.856-4.204 5.193-4.876 5.409-.284.091-2.86.737-6.169.538 0 0-2.449 2.951-3.212 3.717-.12.119-.259.166-.352.144-.131-.031-.167-.18-.166-.397l.02-4.019c-4.871-1.328-4.59-6.27-4.478-8.833.114-2.565.724-4.8 2.17-6.229 1.913-1.755 5.187-2.218 6.769-2.232zm.149 2.133c-.168.004-.334.017-.485.038-.79.106-1.06.497-.987.873.073.37.393.566.897.512 1.073-.098 2.139.194 2.987.776 1.028.706 1.573 1.633 1.658 2.95.022.35.292.607.646.607h.028c.367-.014.65-.306.63-.673-.104-1.691-.821-3.003-2.13-3.901-1.003-.689-2.188-1.118-3.244-1.182zm-5.63.756c-.261.008-.377.156-.408.209l-.004.004c-.125.175-.197.438-.122.685.468 1.445 1.143 2.815 2.007 4.074.836 1.218 1.907 2.406 3.187 3.527l.032.027.031.026.027.025.034.027c1.121 1.28 2.309 2.352 3.527 3.188 1.259.864 2.628 1.538 4.074 2.007.35.112.666-.009.828-.218l.002.001c.066-.085.17-.257.163-.49-.007-.216-.093-.417-.29-.586-.541-.466-1.143-.86-1.736-1.259-.567-.38-1.168-.54-1.663-.196l-.644.447c-.376.262-.873.199-1.172-.026 0 0-1.181-.718-2.256-1.768-1.05-1.075-1.768-2.256-1.768-2.256-.225-.299-.288-.796-.026-1.172l.447-.644c.344-.495.183-1.096-.197-1.663-.399-.593-.793-1.195-1.259-1.736-.183-.212-.406-.294-.64-.297zm5.81.837c-.184.009-.346.142-.374.337-.03.206.106.397.311.435 1.001.192 1.798.665 2.432 1.343.617.66.962 1.486 1.06 2.418.017.185.152.336.331.37.021.004.043.006.065.006.185 0 .345-.134.374-.318.005-.032.006-.064.004-.096-.118-1.14-.555-2.142-1.324-2.966-.785-.84-1.79-1.397-2.986-1.621-.031-.004-.062-.006-.093-.008zm.264 1.949c-.2.01-.366.162-.377.368-.012.214.152.396.365.415.498.044.86.206 1.139.498.28.293.438.67.473 1.16.016.198.174.352.373.355h.014c.198 0 .36-.152.374-.349l.004-.042c-.047-.679-.267-1.23-.69-1.672-.426-.444-.976-.682-1.634-.733-.013-.002-.027-.002-.041 0z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
    discord: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>',
    skype: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.069 18.874c-4.023 0-5.82-1.979-5.82-3.464 0-.765.561-1.296 1.333-1.296 1.723 0 1.273 2.477 4.487 2.477 1.641 0 2.55-.895 2.55-1.811 0-.551-.269-1.16-1.354-1.429l-3.576-.895c-2.88-.724-3.403-2.286-3.403-3.751 0-3.047 2.861-4.191 5.549-4.191 2.471 0 5.393 1.373 5.393 3.199 0 .784-.688 1.24-1.453 1.24-1.469 0-1.198-2.037-4.164-2.037-1.469 0-2.292.664-2.292 1.617s1.153 1.258 2.157 1.487l2.637.587c2.891.649 3.624 2.346 3.624 3.944 0 2.476-1.902 4.324-5.722 4.324m11.084-4.882l-.029.135-.044-.24c.015.045.044.074.059.12.12-.675.181-1.363.181-2.052 0-1.529-.301-3.012-.898-4.42-.569-1.348-1.395-2.562-2.427-3.596-1.049-1.033-2.247-1.856-3.595-2.426-1.318-.631-2.801-.93-4.328-.93-.72 0-1.444.07-2.143.204l.119.06-.239-.033.119-.025C8.91.274 7.829 0 6.731 0c-1.789 0-3.47.698-4.736 1.967C.729 3.235.032 4.923.032 6.716c0 1.143.292 2.265.844 3.258l.02-.124.041.239-.06-.115c-.114.645-.172 1.299-.172 1.955 0 1.53.3 3.017.884 4.416.568 1.362 1.378 2.576 2.427 3.609 1.034 1.05 2.247 1.857 3.595 2.442 1.394.6 2.877.898 4.404.898.659 0 1.334-.06 1.977-.179l-.119-.062.24.046-.135.03c1.002.569 2.126.871 3.294.871 1.783 0 3.459-.69 4.733-1.963 1.259-1.259 1.962-2.951 1.962-4.749 0-1.138-.299-2.262-.853-3.266"/></svg>',
    wechat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.007-.27-.026-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/></svg>',
    line: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'
  };

  // Button type configurations
  const buttonTypes = {
    phone: { icon: 'phone', label: 'Phone', color: '#22c55e', prefix: 'tel:' },
    whatsapp: { icon: 'whatsapp', label: 'WhatsApp', color: '#25D366', prefix: 'https://wa.me/' },
    email: { icon: 'email', label: 'Email', color: '#ea4335', prefix: 'mailto:' },
    sms: { icon: 'sms', label: 'SMS', color: '#3b82f6', prefix: 'sms:' },
    telegram: { icon: 'telegram', label: 'Telegram', color: '#0088cc', prefix: 'https://t.me/' },
    messenger: { icon: 'messenger', label: 'Messenger', color: '#006AFF', prefix: 'https://m.me/' },
    viber: { icon: 'viber', label: 'Viber', color: '#7360f2', prefix: 'viber://chat?number=' },
    instagram: { icon: 'instagram', label: 'Instagram', color: '#E4405F', prefix: 'https://instagram.com/' },
    facebook: { icon: 'facebook', label: 'Facebook', color: '#1877F2', prefix: 'https://facebook.com/' },
    twitter: { icon: 'twitter', label: 'Twitter/X', color: '#000000', prefix: 'https://twitter.com/' },
    linkedin: { icon: 'linkedin', label: 'LinkedIn', color: '#0A66C2', prefix: 'https://linkedin.com/in/' },
    youtube: { icon: 'youtube', label: 'YouTube', color: '#FF0000', prefix: 'https://youtube.com/' },
    tiktok: { icon: 'tiktok', label: 'TikTok', color: '#000000', prefix: 'https://tiktok.com/@' },
    discord: { icon: 'discord', label: 'Discord', color: '#5865F2', prefix: 'https://discord.gg/' },
    skype: { icon: 'skype', label: 'Skype', color: '#00AFF0', prefix: 'skype:' },
    wechat: { icon: 'wechat', label: 'WeChat', color: '#07C160', prefix: '' },
    line: { icon: 'line', label: 'LINE', color: '#00B900', prefix: 'https://line.me/ti/p/' },
    link: { icon: 'link', label: 'Custom Link', color: '#6366f1', prefix: '' }
  };

  // ============================================
  // DOM ELEMENTS
  // ============================================
  
  let elements = {};

  function cacheElements() {
    elements = {
      // Tabs
      tabButtons: document.querySelectorAll('.tab-btn'),
      tabPanels: document.querySelectorAll('.tab-panel'),
      
      // Buttons panel
      buttonsList: document.getElementById('buttonsList'),
      addButtonBtn: document.getElementById('addButtonBtn'),
      
      // Button type modal
      buttonTypeModal: document.getElementById('buttonTypeModal'),
      buttonTypeGrid: document.getElementById('buttonTypeGrid'),
      closeModalBtn: document.getElementById('closeModalBtn'),
      
      // Button edit modal
      buttonEditModal: document.getElementById('buttonEditModal'),
      closeEditModalBtn: document.getElementById('closeEditModalBtn'),
      editButtonForm: document.getElementById('editButtonForm'),
      deleteButtonBtn: document.getElementById('deleteButtonBtn'),
      saveButtonBtn: document.getElementById('saveButtonBtn'),
      
      // Edit form fields
      editButtonType: document.getElementById('editButtonType'),
      editButtonLabel: document.getElementById('editButtonLabel'),
      editButtonValue: document.getElementById('editButtonValue'),
      editButtonColor: document.getElementById('editButtonColor'),
      editButtonColorPicker: document.getElementById('editButtonColorPicker'),
      editButtonNewTab: document.getElementById('editButtonNewTab'),
      
      // Appearance controls
      mainButtonIcon: document.getElementById('mainButtonIcon'),
      mainButtonColor: document.getElementById('mainButtonColor'),
      mainButtonColorPicker: document.getElementById('mainButtonColorPicker'),
      mainButtonSize: document.getElementById('mainButtonSize'),
      mainButtonSizeValue: document.getElementById('mainButtonSizeValue'),
      buttonSize: document.getElementById('buttonSize'),
      buttonSizeValue: document.getElementById('buttonSizeValue'),
      buttonSpacing: document.getElementById('buttonSpacing'),
      buttonSpacingValue: document.getElementById('buttonSpacingValue'),
      expandDirection: document.getElementById('expandDirection'),
      showLabels: document.getElementById('showLabels'),
      pulseAnimation: document.getElementById('pulseAnimation'),
      
      // Position controls
      positionGrid: document.getElementById('positionGrid'),
      positionCells: document.querySelectorAll('.position-cell'),
      offsetX: document.getElementById('offsetX'),
      offsetXValue: document.getElementById('offsetXValue'),
      offsetY: document.getElementById('offsetY'),
      offsetYValue: document.getElementById('offsetYValue'),
      
      // Behavior controls
      triggerType: document.getElementById('triggerType'),
      showDelay: document.getElementById('showDelay'),
      showDelayValue: document.getElementById('showDelayValue'),
      scrollTrigger: document.getElementById('scrollTrigger'),
      scrollOffset: document.getElementById('scrollOffset'),
      scrollOffsetValue: document.getElementById('scrollOffsetValue'),
      scrollOffsetGroup: document.getElementById('scrollOffsetGroup'),
      
      // Preview
      previewFrame: document.getElementById('previewFrame'),
      previewDesktop: document.getElementById('previewDesktop'),
      previewMobile: document.getElementById('previewMobile'),
      
      // Code output
      generatedCode: document.getElementById('generatedCode'),
      copyCodeBtn: document.getElementById('copyCodeBtn')
    };
  }

  // ============================================
  // TAB NAVIGATION
  // ============================================
  
  function initTabs() {
    elements.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        
        // Update button states
        elements.tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update panel visibility
        elements.tabPanels.forEach(panel => {
          panel.classList.remove('active');
          if (panel.id === tabId + 'Panel') {
            panel.classList.add('active');
          }
        });
      });
    });
  }

  // ============================================
  // BUTTON MANAGEMENT
  // ============================================
  
  function renderButtonsList() {
    const list = elements.buttonsList;
    list.innerHTML = '';
    
    if (config.buttons.length === 0) {
      list.innerHTML = '<div class="empty-state">No buttons added yet. Click "Add Button" to get started.</div>';
      return;
    }
    
    config.buttons.forEach((button, index) => {
      const item = document.createElement('div');
      item.className = 'button-item';
      item.draggable = true;
      item.dataset.index = index;
      
      const typeConfig = buttonTypes[button.type] || buttonTypes.link;
      
      item.innerHTML = `
        <div class="button-item-drag">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm8-12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
          </svg>
        </div>
        <div class="button-item-icon" style="background: ${button.color || typeConfig.color}">
          ${icons[typeConfig.icon]}
        </div>
        <div class="button-item-info">
          <div class="button-item-label">${button.label || typeConfig.label}</div>
          <div class="button-item-type">${typeConfig.label}</div>
        </div>
        <button class="button-item-edit" data-index="${index}" aria-label="Edit button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
      `;
      
      // Edit button click
      item.querySelector('.button-item-edit').addEventListener('click', (e) => {
        e.stopPropagation();
        openEditModal(index);
      });
      
      // Drag and drop handlers
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragend', handleDragEnd);
      item.addEventListener('dragover', handleDragOver);
      item.addEventListener('drop', handleDrop);
      
      list.appendChild(item);
    });
    
    updatePreview();
    generateCode();
  }

  // Drag and drop for reordering
  let draggedItem = null;

  function handleDragStart(e) {
    draggedItem = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragEnd() {
    this.classList.remove('dragging');
    document.querySelectorAll('.button-item').forEach(item => {
      item.classList.remove('drag-over');
    });
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');
  }

  function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    if (draggedItem !== this) {
      const fromIndex = parseInt(draggedItem.dataset.index);
      const toIndex = parseInt(this.dataset.index);
      
      const [removed] = config.buttons.splice(fromIndex, 1);
      config.buttons.splice(toIndex, 0, removed);
      
      saveConfig();
      renderButtonsList();
    }
  }

  // Button type modal
  function openButtonTypeModal() {
    elements.buttonTypeModal.classList.add('active');
    renderButtonTypeGrid();
  }

  function closeButtonTypeModal() {
    elements.buttonTypeModal.classList.remove('active');
  }

  function renderButtonTypeGrid() {
    const grid = elements.buttonTypeGrid;
    grid.innerHTML = '';
    
    Object.entries(buttonTypes).forEach(([type, typeConfig]) => {
      const btn = document.createElement('button');
      btn.className = 'button-type-option';
      btn.innerHTML = `
        <div class="button-type-icon" style="background: ${typeConfig.color}">
          ${icons[typeConfig.icon]}
        </div>
        <span>${typeConfig.label}</span>
      `;
      
      btn.addEventListener('click', () => {
        addButton(type);
        closeButtonTypeModal();
      });
      
      grid.appendChild(btn);
    });
  }

  function addButton(type) {
    const typeConfig = buttonTypes[type];
    config.buttons.push({
      type: type,
      label: typeConfig.label,
      value: '',
      color: typeConfig.color,
      newTab: true
    });
    
    saveConfig();
    renderButtonsList();
    
    // Open edit modal for the new button
    openEditModal(config.buttons.length - 1);
  }

  // Edit modal
  function openEditModal(index) {
    editingButtonIndex = index;
    const button = config.buttons[index];
    const typeConfig = buttonTypes[button.type];
    
    elements.editButtonType.textContent = typeConfig.label;
    elements.editButtonLabel.value = button.label || '';
    elements.editButtonValue.value = button.value || '';
    elements.editButtonColor.value = button.color || typeConfig.color;
    elements.editButtonColorPicker.value = button.color || typeConfig.color;
    elements.editButtonNewTab.checked = button.newTab !== false;
    
    // Update placeholder based on type
    const placeholders = {
      phone: '+1234567890',
      whatsapp: '1234567890 (without +)',
      email: 'you@example.com',
      sms: '+1234567890',
      telegram: 'username',
      messenger: 'page-id',
      viber: '+1234567890',
      instagram: 'username',
      facebook: 'page-name',
      twitter: 'username',
      linkedin: 'username',
      youtube: '@channel or channel-id',
      tiktok: 'username',
      discord: 'invite-code',
      skype: 'username?call',
      wechat: 'WeChat ID',
      line: 'line-id',
      link: 'https://example.com'
    };
    
    elements.editButtonValue.placeholder = placeholders[button.type] || 'Enter value';
    
    elements.buttonEditModal.classList.add('active');
  }

  function closeEditModal() {
    elements.buttonEditModal.classList.remove('active');
    editingButtonIndex = -1;
  }

  function saveButton() {
    if (editingButtonIndex < 0) return;
    
    config.buttons[editingButtonIndex] = {
      ...config.buttons[editingButtonIndex],
      label: elements.editButtonLabel.value,
      value: elements.editButtonValue.value,
      color: elements.editButtonColor.value,
      newTab: elements.editButtonNewTab.checked
    };
    
    saveConfig();
    renderButtonsList();
    closeEditModal();
  }

  function deleteButton() {
    if (editingButtonIndex < 0) return;
    
    config.buttons.splice(editingButtonIndex, 1);
    saveConfig();
    renderButtonsList();
    closeEditModal();
  }

  // ============================================
  // APPEARANCE CONTROLS
  // ============================================
  
  function initAppearanceControls() {
    // Main button icon selector
    const iconOptions = document.querySelectorAll('.icon-option');
    iconOptions.forEach(option => {
      option.addEventListener('click', () => {
        iconOptions.forEach(o => o.classList.remove('active'));
        option.classList.add('active');
        config.mainButton.icon = option.dataset.icon;
        saveConfig();
        updatePreview();
        generateCode();
      });
    });
    
    // Main button color
    elements.mainButtonColor.addEventListener('input', (e) => {
      config.mainButton.color = e.target.value;
      elements.mainButtonColorPicker.value = e.target.value;
      saveConfig();
      updatePreview();
      generateCode();
    });
    
    elements.mainButtonColorPicker.addEventListener('input', (e) => {
      config.mainButton.color = e.target.value;
      elements.mainButtonColor.value = e.target.value;
      saveConfig();
      updatePreview();
      generateCode();
    });
    
    // Main button size
    elements.mainButtonSize.addEventListener('input', (e) => {
      config.mainButton.size = parseInt(e.target.value);
      elements.mainButtonSizeValue.textContent = e.target.value + 'px';
      saveConfig();
      updatePreview();
      generateCode();
    });
    
    // Button size
    elements.buttonSize.addEventListener('input', (e) => {
      config.appearance.buttonSize = parseInt(e.target.value);
      elements.buttonSizeValue.textContent = e.target.value + 'px';
      saveConfig();
      updatePreview();
      generateCode();
    });
    
    // Button spacing
    elements.buttonSpacing.addEventListener('input', (e) => {
      config.appearance.spacing = parseInt(e.target.value);
      elements.buttonSpacingValue.textContent = e.target.value + 'px';
      saveConfig();
      updatePreview();
      generateCode();
    });
    
    // Expand direction
    elements.expandDirection.addEventListener('change', (e) => {
      config.appearance.expandDirection = e.target.value;
      saveConfig();
      updatePreview();
      generateCode();
    });
    
    // Show labels
    elements.showLabels.addEventListener('change', (e) => {
      config.appearance.showLabels = e.target.checked;
      saveConfig();
      updatePreview();
      generateCode();
    });
    
    // Pulse animation
    elements.pulseAnimation.addEventListener('change', (e) => {
      config.appearance.pulseAnimation = e.target.checked;
      saveConfig();
      updatePreview();
      generateCode();
    });
    
    // Edit button color sync
    elements.editButtonColor.addEventListener('input', (e) => {
      elements.editButtonColorPicker.value = e.target.value;
    });
    
    elements.editButtonColorPicker.addEventListener('input', (e) => {
      elements.editButtonColor.value = e.target.value;
    });
  }

  // ============================================
  // POSITION CONTROLS
  // ============================================
  
  function initPositionControls() {
    // Position grid
    elements.positionCells.forEach(cell => {
      cell.addEventListener('click', () => {
        elements.positionCells.forEach(c => c.classList.remove('active'));
        cell.classList.add('active');
        
        const pos = cell.dataset.position;
        config.position.vertical = pos.includes('top') ? 'top' : 'bottom';
        config.position.horizontal = pos.includes('left') ? 'left' : 'right';
        
        saveConfig();
        updatePreview();
        generateCode();
      });
    });
    
    // Offset X
    elements.offsetX.addEventListener('input', (e) => {
      config.position.offsetX = parseInt(e.target.value);
      elements.offsetXValue.textContent = e.target.value + 'px';
      saveConfig();
      updatePreview();
      generateCode();
    });
    
    // Offset Y
    elements.offsetY.addEventListener('input', (e) => {
      config.position.offsetY = parseInt(e.target.value);
      elements.offsetYValue.textContent = e.target.value + 'px';
      saveConfig();
      updatePreview();
      generateCode();
    });
  }

  // ============================================
  // BEHAVIOR CONTROLS
  // ============================================
  
  function initBehaviorControls() {
    // Trigger type
    elements.triggerType.addEventListener('change', (e) => {
      config.behavior.trigger = e.target.value;
      saveConfig();
      updatePreview();
      generateCode();
    });
    
    // Show delay
    elements.showDelay.addEventListener('input', (e) => {
      config.behavior.showDelay = parseInt(e.target.value);
      elements.showDelayValue.textContent = e.target.value + 's';
      saveConfig();
      generateCode();
    });
    
    // Scroll trigger
    elements.scrollTrigger.addEventListener('change', (e) => {
      config.behavior.scrollTrigger = e.target.checked;
      elements.scrollOffsetGroup.style.display = e.target.checked ? 'block' : 'none';
      saveConfig();
      generateCode();
    });
    
    // Scroll offset
    elements.scrollOffset.addEventListener('input', (e) => {
      config.behavior.scrollOffset = parseInt(e.target.value);
      elements.scrollOffsetValue.textContent = e.target.value + 'px';
      saveConfig();
      generateCode();
    });
  }

  // ============================================
  // PREVIEW
  // ============================================
  
  function initPreviewControls() {
    elements.previewDesktop.addEventListener('click', () => {
      previewMode = 'desktop';
      elements.previewDesktop.classList.add('active');
      elements.previewMobile.classList.remove('active');
      elements.previewFrame.classList.remove('mobile');
    });
    
    elements.previewMobile.addEventListener('click', () => {
      previewMode = 'mobile';
      elements.previewMobile.classList.add('active');
      elements.previewDesktop.classList.remove('active');
      elements.previewFrame.classList.add('mobile');
    });
  }

  function updatePreview() {
    const frame = elements.previewFrame;
    
    // Remove existing preview widget
    const existing = frame.querySelector('.preview-widget');
    if (existing) existing.remove();
    
    // Create new preview widget
    const widget = document.createElement('div');
    widget.className = 'preview-widget';
    
    // Set position styles
    const posStyle = [];
    if (config.position.vertical === 'top') {
      posStyle.push(`top: ${config.position.offsetY}px`);
    } else {
      posStyle.push(`bottom: ${config.position.offsetY}px`);
    }
    if (config.position.horizontal === 'left') {
      posStyle.push(`left: ${config.position.offsetX}px`);
    } else {
      posStyle.push(`right: ${config.position.offsetX}px`);
    }
    
    widget.style.cssText = posStyle.join(';') + ';position:absolute;z-index:1000;';
    
    // Create main button
    const mainBtn = document.createElement('button');
    mainBtn.className = 'preview-main-btn' + (config.appearance.pulseAnimation ? ' pulse' : '');
    mainBtn.style.cssText = `
      width: ${config.mainButton.size}px;
      height: ${config.mainButton.size}px;
      background: ${config.mainButton.color};
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      transition: transform 0.2s, box-shadow 0.2s;
    `;
    mainBtn.innerHTML = `<span style="width:24px;height:24px;display:flex;align-items:center;justify-content:center;">${icons[config.mainButton.icon] || icons.plus}</span>`;
    
    // Create buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'preview-buttons';
    buttonsContainer.style.cssText = `
      display: none;
      flex-direction: ${config.appearance.expandDirection === 'up' || config.appearance.expandDirection === 'down' ? 'column' : 'row'};
      gap: ${config.appearance.spacing}px;
      position: absolute;
      ${getExpandPosition()}
    `;
    
    // Add contact buttons
    config.buttons.forEach((button, index) => {
      const typeConfig = buttonTypes[button.type];
      const btn = document.createElement('div');
      btn.className = 'preview-contact-btn';
      btn.style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
        animation: fadeIn 0.2s ease-out ${index * 0.05}s both;
      `;
      
      const iconBtn = document.createElement('span');
      iconBtn.style.cssText = `
        width: ${config.appearance.buttonSize}px;
        height: ${config.appearance.buttonSize}px;
        background: ${button.color || typeConfig.color};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        cursor: pointer;
      `;
      iconBtn.innerHTML = `<span style="width:20px;height:20px;display:flex;align-items:center;justify-content:center;">${icons[typeConfig.icon]}</span>`;
      
      btn.appendChild(iconBtn);
      
      if (config.appearance.showLabels) {
        const label = document.createElement('span');
        label.className = 'preview-btn-label';
        label.style.cssText = `
          background: white;
          color: #1a1a2e;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          white-space: nowrap;
        `;
        label.textContent = button.label || typeConfig.label;
        
        if (config.position.horizontal === 'right') {
          btn.insertBefore(label, iconBtn);
        } else {
          btn.appendChild(label);
        }
      }
      
      buttonsContainer.appendChild(btn);
    });
    
    // Toggle functionality
    let isOpen = false;
    const trigger = config.behavior.trigger;
    
    const toggleOpen = () => {
      isOpen = !isOpen;
      buttonsContainer.style.display = isOpen ? 'flex' : 'none';
      mainBtn.innerHTML = `<span style="width:24px;height:24px;display:flex;align-items:center;justify-content:center;">${isOpen ? icons.close : (icons[config.mainButton.icon] || icons.plus)}</span>`;
    };
    
    if (trigger === 'click') {
      mainBtn.addEventListener('click', toggleOpen);
    } else {
      widget.addEventListener('mouseenter', () => {
        if (!isOpen) toggleOpen();
      });
      widget.addEventListener('mouseleave', () => {
        if (isOpen) toggleOpen();
      });
    }
    
    widget.appendChild(buttonsContainer);
    widget.appendChild(mainBtn);
    frame.appendChild(widget);
    
    // Add preview styles
    addPreviewStyles();
  }

  function getExpandPosition() {
    const dir = config.appearance.expandDirection;
    const mainSize = config.mainButton.size;
    const spacing = config.appearance.spacing;
    
    switch (dir) {
      case 'up':
        return `bottom: ${mainSize + spacing}px; ${config.position.horizontal}: 0;`;
      case 'down':
        return `top: ${mainSize + spacing}px; ${config.position.horizontal}: 0;`;
      case 'left':
        return `right: ${mainSize + spacing}px; ${config.position.vertical}: 0;`;
      case 'right':
        return `left: ${mainSize + spacing}px; ${config.position.vertical}: 0;`;
      default:
        return `bottom: ${mainSize + spacing}px; ${config.position.horizontal}: 0;`;
    }
  }

  function addPreviewStyles() {
    const styleId = 'preview-widget-styles';
    let styleEl = document.getElementById(styleId);
    
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    
    styleEl.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
      }
      
      @keyframes pulse {
        0%, 100% { box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
        50% { box-shadow: 0 4px 20px rgba(99, 102, 241, 0.5); }
      }
      
      .preview-main-btn.pulse {
        animation: pulse 2s ease-in-out infinite;
      }
      
      .preview-main-btn:hover {
        transform: scale(1.05);
      }
      
      .preview-contact-btn:hover span:first-child {
        transform: scale(1.1);
      }
    `;
  }

  // ============================================
  // CODE GENERATION
  // ============================================
  
  function generateCode() {
    const scriptConfig = {
      buttons: config.buttons.map(b => ({
        type: b.type,
        value: b.value,
        label: b.label,
        color: b.color,
        newTab: b.newTab
      })),
      mainButton: config.mainButton,
      position: config.position,
      appearance: config.appearance,
      behavior: config.behavior
    };
    
    const configStr = JSON.stringify(scriptConfig, null, 2);
    
    const code = `<!-- Floating Widget by LiveUpx.com -->
<script>
  window.floatingWidgetConfig = ${configStr};
</script>
<script src="https://cdn.jsdelivr.net/gh/liveupx/Floating-Calls-Social-Buttons-Widget@latest/dist/widget.min.js" defer></script>`;
    
    elements.generatedCode.textContent = code;
  }

  function copyCode() {
    const code = elements.generatedCode.textContent;
    navigator.clipboard.writeText(code).then(() => {
      const btn = elements.copyCodeBtn;
      const originalText = btn.innerHTML;
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
      btn.classList.add('copied');
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('copied');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    });
  }

  // ============================================
  // LOCAL STORAGE
  // ============================================
  
  function saveConfig() {
    try {
      localStorage.setItem('floatingWidgetConfig', JSON.stringify(config));
    } catch (e) {
      console.warn('Could not save config to localStorage:', e);
    }
  }

  function loadConfig() {
    try {
      const saved = localStorage.getItem('floatingWidgetConfig');
      if (saved) {
        const parsed = JSON.parse(saved);
        config = { ...defaultConfig, ...parsed };
      }
    } catch (e) {
      console.warn('Could not load config from localStorage:', e);
    }
  }

  function applyConfigToUI() {
    // Apply main button settings
    const iconOptions = document.querySelectorAll('.icon-option');
    iconOptions.forEach(option => {
      option.classList.toggle('active', option.dataset.icon === config.mainButton.icon);
    });
    
    elements.mainButtonColor.value = config.mainButton.color;
    elements.mainButtonColorPicker.value = config.mainButton.color;
    elements.mainButtonSize.value = config.mainButton.size;
    elements.mainButtonSizeValue.textContent = config.mainButton.size + 'px';
    
    // Apply appearance settings
    elements.buttonSize.value = config.appearance.buttonSize;
    elements.buttonSizeValue.textContent = config.appearance.buttonSize + 'px';
    elements.buttonSpacing.value = config.appearance.spacing;
    elements.buttonSpacingValue.textContent = config.appearance.spacing + 'px';
    elements.expandDirection.value = config.appearance.expandDirection;
    elements.showLabels.checked = config.appearance.showLabels;
    elements.pulseAnimation.checked = config.appearance.pulseAnimation;
    
    // Apply position settings
    const posKey = config.position.vertical + '-' + config.position.horizontal;
    elements.positionCells.forEach(cell => {
      cell.classList.toggle('active', cell.dataset.position === posKey);
    });
    elements.offsetX.value = config.position.offsetX;
    elements.offsetXValue.textContent = config.position.offsetX + 'px';
    elements.offsetY.value = config.position.offsetY;
    elements.offsetYValue.textContent = config.position.offsetY + 'px';
    
    // Apply behavior settings
    elements.triggerType.value = config.behavior.trigger;
    elements.showDelay.value = config.behavior.showDelay;
    elements.showDelayValue.textContent = config.behavior.showDelay + 's';
    elements.scrollTrigger.checked = config.behavior.scrollTrigger;
    elements.scrollOffset.value = config.behavior.scrollOffset;
    elements.scrollOffsetValue.textContent = config.behavior.scrollOffset + 'px';
    elements.scrollOffsetGroup.style.display = config.behavior.scrollTrigger ? 'block' : 'none';
  }

  // ============================================
  // EVENT BINDINGS
  // ============================================
  
  function bindEvents() {
    // Add button
    elements.addButtonBtn.addEventListener('click', openButtonTypeModal);
    
    // Close modals
    elements.closeModalBtn.addEventListener('click', closeButtonTypeModal);
    elements.closeEditModalBtn.addEventListener('click', closeEditModal);
    
    // Modal backdrop clicks
    elements.buttonTypeModal.addEventListener('click', (e) => {
      if (e.target === elements.buttonTypeModal) closeButtonTypeModal();
    });
    elements.buttonEditModal.addEventListener('click', (e) => {
      if (e.target === elements.buttonEditModal) closeEditModal();
    });
    
    // Edit modal actions
    elements.saveButtonBtn.addEventListener('click', saveButton);
    elements.deleteButtonBtn.addEventListener('click', deleteButton);
    
    // Copy code
    elements.copyCodeBtn.addEventListener('click', copyCode);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeButtonTypeModal();
        closeEditModal();
      }
    });
  }

  // ============================================
  // SMOOTH SCROLL FOR NAVIGATION
  // ============================================
  
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ============================================
  // INITIALIZATION
  // ============================================
  
  function init() {
    cacheElements();
    loadConfig();
    applyConfigToUI();
    initTabs();
    initAppearanceControls();
    initPositionControls();
    initBehaviorControls();
    initPreviewControls();
    bindEvents();
    initSmoothScroll();
    renderButtonsList();
    updatePreview();
    generateCode();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
