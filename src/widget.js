/**
 * Floating Calls & Social Buttons Widget
 * @version 1.0.0
 * @author Liveupx.com
 * @license MIT
 * @repository https://github.com/liveupx/Floating-Calls-Social-Buttons-for-Website-free
 * 
 * A lightweight, privacy-first floating button widget for websites.
 * No cookies, no tracking, no external dependencies.
 */

(function(global) {
  'use strict';

  // ============================================
  // CONFIGURATION DEFAULTS
  // ============================================
  
  const DEFAULT_CONFIG = {
    position: 'bottom-right',      // bottom-right, bottom-left, top-right, top-left
    mainButtonColor: '#25D366',    // Main FAB color
    mainButtonIcon: 'menu',        // menu, plus, chat, phone
    mainButtonSize: 56,            // Size in pixels
    expandDirection: 'up',         // up, down, left, right
    triggerType: 'click',          // click, hover
    showOnScroll: 0,               // Pixels scrolled before showing (0 = always)
    showDelay: 0,                  // Delay in ms before showing
    pulseAnimation: true,          // Enable pulse effect
    showLabels: true,              // Show button labels
    labelPosition: 'left',         // left, right
    spacing: 16,                   // Space between buttons
    zIndex: 9999,                  // CSS z-index
    mobileBreakpoint: 768,         // Mobile breakpoint in px
    buttons: []                    // Array of button configurations
  };

  // ============================================
  // SVG ICONS LIBRARY
  // ============================================
  
  const ICONS = {
    // Main button icons
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
    
    // Contact icons
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',
    sms: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
    
    // Social media icons
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
    pinterest: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>',
    snapchat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>',
    viber: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.187.64 6.682.573 9.762.506 12.842.39 18.566 6.016 20.123h.006l-.004 2.416s-.04.976.604 1.176c.78.244 1.238-.502 1.984-1.304.408-.44.972-1.088 1.397-1.58 3.85.322 6.812-.418 7.15-.528.78-.254 5.193-.816 5.913-6.662.742-6.027-.36-9.83-2.358-11.53l.004-.004c-.597-.52-2.967-2.02-8.472-2.078 0 0-.398-.012-.842-.006zm.118 1.81c.367-.004.708.006.708.006 4.584.05 6.612 1.202 7.106 1.62 1.63 1.385 2.47 4.742 1.842 9.737-.59 4.8-4.149 5.12-4.814 5.335-.279.09-2.864.74-6.167.514 0 0-2.442 2.943-3.203 3.71-.12.12-.26.168-.352.144-.13-.032-.166-.188-.164-.414l.02-4.016c-4.636-1.28-4.368-6.04-4.31-8.548.054-2.508.54-4.608 1.97-6.024 1.906-1.746 5.508-2.04 7.364-2.064zm.254 2.156a.366.366 0 0 0-.366.372.37.37 0 0 0 .372.366c1.926.014 3.543.673 4.808 1.962 1.256 1.278 1.92 2.914 1.972 4.862a.37.37 0 0 0 .37.358.366.366 0 0 0 .356-.38c-.058-2.124-.793-3.94-2.188-5.36-1.39-1.418-3.192-2.164-5.324-2.18zm.166 1.415a.36.36 0 0 0-.366.366.36.36 0 0 0 .366.366c1.392.018 2.538.542 3.408 1.559.87 1.018 1.276 2.184 1.206 3.47a.369.369 0 0 0 .342.394h.024c.19 0 .35-.146.362-.342.08-1.476-.404-2.826-1.44-4.038-1.038-1.212-2.41-1.84-4.08-1.858l.178.083zm-2.82.914c.148 0 .296.012.412.034.138.024.3.11.372.49 0 0 .36 1.366.52 2.042.1.41.216 1.182-.284 1.396-.116.05-.21.064-.284.064-.192 0-.302-.076-.402-.138-.054-.034-.11-.07-.188-.094-.166-.05-.552.166-.912.508-.36.34-.68.766-.808 1.006-.104.19-.274.44.04.866.626.854 1.32 1.568 2.18 2.304.408.348 1.578 1.158 2.57 1.612.302.136.49.222.63.276.212.082.42.106.62.03.274-.104.704-.502.882-.826.178-.322.422-.758.764-.634.208.076 1.364.642 1.772.87.406.228.676.34.776.528.1.186.082.85-.216 1.456-.298.606-1.27 1.136-1.836 1.196-.356.036-.78.074-2.046-.426-2.856-1.13-4.792-3.204-5.946-4.69-.594-.766-1.558-2.292-1.54-4.098.01-1.044.42-1.902.85-2.372.298-.326.66-.456.966-.456l.098.056zm2.39.6a.366.366 0 0 0-.366.366.366.366 0 0 0 .366.366c.794.01 1.44.294 1.918.846.476.554.706 1.208.682 1.944a.369.369 0 0 0 .356.376c.198 0 .362-.156.366-.354.03-.932-.27-1.752-.894-2.478-.622-.726-1.46-1.094-2.488-1.106l.06.04z"/></svg>',
    
    // Utility icons
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
    messenger: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/></svg>',
    skype: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.069 18.874c-4.023 0-5.82-1.979-5.82-3.464 0-.765.561-1.296 1.333-1.296 1.723 0 1.273 2.477 4.487 2.477 1.641 0 2.55-.895 2.55-1.811 0-.551-.269-1.16-1.354-1.429l-3.576-.895c-2.88-.724-3.403-2.286-3.403-3.751 0-3.047 2.861-4.191 5.549-4.191 2.471 0 5.393 1.373 5.393 3.199 0 .784-.688 1.24-1.453 1.24-1.469 0-1.198-2.037-4.164-2.037-1.469 0-2.292.664-2.292 1.617s1.153 1.258 2.157 1.487l2.637.587c2.891.649 3.624 2.346 3.624 3.944 0 2.476-1.902 4.324-5.722 4.324m11.084-4.882c.227-.9.345-1.836.345-2.798 0-3.268-1.272-6.34-3.583-8.651A12.164 12.164 0 0 0 11.264 0c-.93 0-1.86.104-2.77.31a7.11 7.11 0 0 0-3.662-1.013C2.167-.703 0 1.465 0 4.129c0 .918.231 1.788.652 2.553A12.015 12.015 0 0 0 0 10.193c0 3.269 1.273 6.341 3.583 8.652a12.163 12.163 0 0 0 8.652 3.583c.859 0 1.717-.086 2.552-.256a7.111 7.111 0 0 0 3.832 1.117c2.666 0 4.832-2.168 4.832-4.832 0-.979-.285-1.893-.778-2.66.137-.476.245-.962.32-1.455"/></svg>',
    discord: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>',
    wechat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.007-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/></svg>',
    line: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>',
    
    // Arrow/direction icons
    arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>',
    
    // Location/map
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    
    // Calendar/booking
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>'
  };

  // ============================================
  // CSS STYLES
  // ============================================
  
  function generateStyles(config) {
    const pos = getPositionStyles(config.position);
    const expandStyles = getExpandStyles(config.expandDirection);
    
    return `
      :host {
        --fab-main-color: ${config.mainButtonColor};
        --fab-main-size: ${config.mainButtonSize}px;
        --fab-spacing: ${config.spacing}px;
        --fab-z-index: ${config.zIndex};
        --fab-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        
        all: initial;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        color: #333;
        box-sizing: border-box;
      }
      
      *, *::before, *::after {
        box-sizing: border-box;
      }
      
      .fab-container {
        position: fixed;
        ${pos.main}
        z-index: var(--fab-z-index);
        display: flex;
        flex-direction: ${expandStyles.direction};
        align-items: ${expandStyles.align};
        gap: var(--fab-spacing);
        pointer-events: none;
      }
      
      .fab-container.is-hidden {
        opacity: 0;
        transform: scale(0.8);
        pointer-events: none;
      }
      
      .fab-container.is-visible {
        opacity: 1;
        transform: scale(1);
        transition: var(--fab-transition);
      }
      
      .fab-main-btn {
        width: var(--fab-main-size);
        height: var(--fab-main-size);
        border-radius: 50%;
        background: var(--fab-main-color);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12);
        transition: var(--fab-transition);
        pointer-events: auto;
        position: relative;
        outline: none;
        -webkit-tap-highlight-color: transparent;
        order: ${expandStyles.mainOrder};
      }
      
      .fab-main-btn:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.15);
      }
      
      .fab-main-btn:focus-visible {
        outline: 3px solid rgba(255, 255, 255, 0.5);
        outline-offset: 2px;
      }
      
      .fab-main-btn:active {
        transform: scale(0.95);
      }
      
      .fab-main-btn svg {
        width: 24px;
        height: 24px;
        color: #fff;
        transition: transform 0.3s ease;
      }
      
      .fab-container.is-expanded .fab-main-btn svg {
        transform: rotate(45deg);
      }
      
      ${config.pulseAnimation ? `
      .fab-main-btn::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: inherit;
        animation: fab-pulse 2s infinite;
        z-index: -1;
      }
      
      .fab-container.is-expanded .fab-main-btn::before {
        animation: none;
      }
      
      @keyframes fab-pulse {
        0% {
          transform: scale(1);
          opacity: 0.5;
        }
        50% {
          transform: scale(1.3);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 0;
        }
      }
      ` : ''}
      
      .fab-buttons {
        display: flex;
        flex-direction: ${expandStyles.direction};
        gap: var(--fab-spacing);
        opacity: 0;
        visibility: hidden;
        transform: ${expandStyles.hiddenTransform};
        transition: var(--fab-transition);
        pointer-events: none;
      }
      
      .fab-container.is-expanded .fab-buttons {
        opacity: 1;
        visibility: visible;
        transform: ${expandStyles.visibleTransform};
        pointer-events: auto;
      }
      
      .fab-btn-wrapper {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-direction: ${config.labelPosition === 'left' ? 'row-reverse' : 'row'};
      }
      
      .fab-btn {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        transition: var(--fab-transition);
        outline: none;
        -webkit-tap-highlight-color: transparent;
        text-decoration: none;
      }
      
      .fab-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      }
      
      .fab-btn:focus-visible {
        outline: 3px solid rgba(0, 0, 0, 0.2);
        outline-offset: 2px;
      }
      
      .fab-btn:active {
        transform: scale(0.95);
      }
      
      .fab-btn svg {
        width: 22px;
        height: 22px;
      }
      
      .fab-label {
        background: #fff;
        color: #333;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 500;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        opacity: 0;
        transform: translateX(${config.labelPosition === 'left' ? '10px' : '-10px'});
        transition: var(--fab-transition);
        pointer-events: none;
      }
      
      ${config.showLabels ? `
      .fab-btn-wrapper:hover .fab-label,
      .fab-btn:focus-visible + .fab-label {
        opacity: 1;
        transform: translateX(0);
      }
      ` : '.fab-label { display: none; }'}
      
      .fab-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.3);
        opacity: 0;
        visibility: hidden;
        transition: var(--fab-transition);
        z-index: calc(var(--fab-z-index) - 1);
      }
      
      .fab-container.is-expanded ~ .fab-backdrop {
        opacity: 1;
        visibility: visible;
      }
      
      /* Staggered animation for buttons */
      .fab-buttons .fab-btn-wrapper {
        opacity: 0;
        transform: ${expandStyles.hiddenTransform};
        transition: var(--fab-transition);
      }
      
      .fab-container.is-expanded .fab-buttons .fab-btn-wrapper {
        opacity: 1;
        transform: translateY(0) translateX(0);
      }
      
      ${generateStaggeredDelays(10)}
      
      /* Mobile responsive */
      @media (max-width: ${config.mobileBreakpoint}px) {
        .fab-container {
          ${pos.mobile}
        }
        
        .fab-main-btn {
          width: calc(var(--fab-main-size) * 0.9);
          height: calc(var(--fab-main-size) * 0.9);
        }
        
        .fab-btn {
          width: 44px;
          height: 44px;
        }
        
        .fab-label {
          display: none !important;
        }
      }
      
      /* Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
      
      /* High contrast mode */
      @media (prefers-contrast: high) {
        .fab-main-btn,
        .fab-btn {
          border: 2px solid currentColor;
        }
      }
      
      /* Print styles */
      @media print {
        .fab-container {
          display: none !important;
        }
      }
    `;
  }
  
  function generateStaggeredDelays(count) {
    let css = '';
    for (let i = 0; i < count; i++) {
      css += `
        .fab-container.is-expanded .fab-buttons .fab-btn-wrapper:nth-child(${i + 1}) {
          transition-delay: ${i * 50}ms;
        }
      `;
    }
    return css;
  }
  
  function getPositionStyles(position) {
    const positions = {
      'bottom-right': {
        main: 'bottom: 24px; right: 24px;',
        mobile: 'bottom: 16px; right: 16px;'
      },
      'bottom-left': {
        main: 'bottom: 24px; left: 24px;',
        mobile: 'bottom: 16px; left: 16px;'
      },
      'top-right': {
        main: 'top: 24px; right: 24px;',
        mobile: 'top: 16px; right: 16px;'
      },
      'top-left': {
        main: 'top: 24px; left: 24px;',
        mobile: 'top: 16px; left: 16px;'
      }
    };
    return positions[position] || positions['bottom-right'];
  }
  
  function getExpandStyles(direction) {
    const styles = {
      'up': {
        direction: 'column-reverse',
        align: 'center',
        hiddenTransform: 'translateY(20px)',
        visibleTransform: 'translateY(0)',
        mainOrder: 999
      },
      'down': {
        direction: 'column',
        align: 'center',
        hiddenTransform: 'translateY(-20px)',
        visibleTransform: 'translateY(0)',
        mainOrder: -1
      },
      'left': {
        direction: 'row-reverse',
        align: 'center',
        hiddenTransform: 'translateX(20px)',
        visibleTransform: 'translateX(0)',
        mainOrder: 999
      },
      'right': {
        direction: 'row',
        align: 'center',
        hiddenTransform: 'translateX(-20px)',
        visibleTransform: 'translateX(0)',
        mainOrder: -1
      }
    };
    return styles[direction] || styles['up'];
  }

  // ============================================
  // WIDGET CLASS
  // ============================================
  
  class FloatingWidget {
    constructor(userConfig = {}) {
      this.config = this.mergeConfig(DEFAULT_CONFIG, userConfig);
      this.isExpanded = false;
      this.isVisible = false;
      this.container = null;
      this.shadowRoot = null;
      
      this.init();
    }
    
    mergeConfig(defaults, user) {
      return {
        ...defaults,
        ...user,
        buttons: user.buttons || defaults.buttons
      };
    }
    
    init() {
      // Create shadow DOM container
      this.container = document.createElement('div');
      this.container.id = 'liveupx-floating-widget';
      this.container.setAttribute('role', 'complementary');
      this.container.setAttribute('aria-label', 'Quick contact buttons');
      
      // Use Shadow DOM for style isolation
      this.shadowRoot = this.container.attachShadow({ mode: 'open' });
      
      // Add styles
      const style = document.createElement('style');
      style.textContent = generateStyles(this.config);
      this.shadowRoot.appendChild(style);
      
      // Build widget HTML
      this.buildWidget();
      
      // Append to document
      document.body.appendChild(this.container);
      
      // Setup event listeners
      this.setupEvents();
      
      // Handle visibility
      this.handleVisibility();
    }
    
    buildWidget() {
      const wrapper = document.createElement('div');
      
      wrapper.innerHTML = `
        <div class="fab-container ${this.config.showOnScroll > 0 ? 'is-hidden' : 'is-visible'}" 
             role="toolbar" 
             aria-label="Contact options"
             aria-expanded="false">
          
          <button class="fab-main-btn" 
                  aria-label="Toggle contact menu"
                  aria-haspopup="true"
                  aria-controls="fab-buttons-list">
            ${ICONS[this.config.mainButtonIcon] || ICONS.menu}
          </button>
          
          <div class="fab-buttons" id="fab-buttons-list" role="menu">
            ${this.renderButtons()}
          </div>
        </div>
        <div class="fab-backdrop" aria-hidden="true"></div>
      `;
      
      this.shadowRoot.appendChild(wrapper);
      
      // Store references
      this.fabContainer = this.shadowRoot.querySelector('.fab-container');
      this.mainBtn = this.shadowRoot.querySelector('.fab-main-btn');
      this.backdrop = this.shadowRoot.querySelector('.fab-backdrop');
      this.buttonsList = this.shadowRoot.querySelector('.fab-buttons');
    }
    
    renderButtons() {
      if (!this.config.buttons || this.config.buttons.length === 0) {
        return '';
      }
      
      return this.config.buttons.map((btn, index) => {
        const href = this.getButtonHref(btn);
        const icon = ICONS[btn.icon] || ICONS.link;
        const bgColor = btn.color || '#333';
        const textColor = btn.textColor || '#fff';
        
        return `
          <div class="fab-btn-wrapper">
            <a href="${this.escapeHtml(href)}"
               class="fab-btn"
               role="menuitem"
               target="${btn.newTab !== false ? '_blank' : '_self'}"
               rel="noopener noreferrer"
               aria-label="${this.escapeHtml(btn.label || btn.type)}"
               style="background-color: ${bgColor}; color: ${textColor};"
               ${btn.type === 'phone' ? 'data-action="call"' : ''}
               tabindex="-1">
              ${icon}
            </a>
            <span class="fab-label" aria-hidden="true">${this.escapeHtml(btn.label || '')}</span>
          </div>
        `;
      }).join('');
    }
    
    getButtonHref(btn) {
      switch (btn.type) {
        case 'phone':
          return `tel:${btn.value}`;
        case 'whatsapp':
          const waNumber = btn.value.replace(/[^0-9]/g, '');
          const waMessage = btn.message ? `?text=${encodeURIComponent(btn.message)}` : '';
          return `https://wa.me/${waNumber}${waMessage}`;
        case 'email':
          const subject = btn.subject ? `?subject=${encodeURIComponent(btn.subject)}` : '';
          const body = btn.body ? `${subject ? '&' : '?'}body=${encodeURIComponent(btn.body)}` : '';
          return `mailto:${btn.value}${subject}${body}`;
        case 'sms':
          return `sms:${btn.value}`;
        case 'telegram':
          return `https://t.me/${btn.value}`;
        case 'messenger':
          return `https://m.me/${btn.value}`;
        case 'viber':
          return `viber://chat?number=${btn.value.replace(/[^0-9]/g, '')}`;
        case 'skype':
          return `skype:${btn.value}?chat`;
        case 'discord':
          return btn.value;
        case 'link':
        default:
          return btn.value || '#';
      }
    }
    
    escapeHtml(str) {
      if (!str) return '';
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }
    
    setupEvents() {
      // Main button click/touch
      this.mainBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
      
      // Hover trigger (if enabled)
      if (this.config.triggerType === 'hover') {
        let hoverTimeout;
        
        this.fabContainer.addEventListener('mouseenter', () => {
          hoverTimeout = setTimeout(() => this.expand(), 100);
        });
        
        this.fabContainer.addEventListener('mouseleave', () => {
          clearTimeout(hoverTimeout);
          this.collapse();
        });
      }
      
      // Backdrop click
      this.backdrop.addEventListener('click', () => {
        this.collapse();
      });
      
      // Keyboard navigation
      this.fabContainer.addEventListener('keydown', (e) => {
        this.handleKeyboard(e);
      });
      
      // Close on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isExpanded) {
          this.collapse();
          this.mainBtn.focus();
        }
      });
      
      // Scroll visibility
      if (this.config.showOnScroll > 0) {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            this.handleScrollVisibility();
          }, 50);
        }, { passive: true });
      }
      
      // Click outside to close
      document.addEventListener('click', (e) => {
        if (this.isExpanded && !this.container.contains(e.target)) {
          this.collapse();
        }
      });
    }
    
    handleKeyboard(e) {
      const buttons = this.buttonsList.querySelectorAll('.fab-btn');
      const currentIndex = Array.from(buttons).indexOf(document.activeElement);
      
      switch (e.key) {
        case 'Enter':
        case ' ':
          if (e.target === this.mainBtn) {
            e.preventDefault();
            this.toggle();
          }
          break;
          
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          if (this.isExpanded && buttons.length > 0) {
            const prevIndex = currentIndex <= 0 ? buttons.length - 1 : currentIndex - 1;
            buttons[prevIndex].focus();
          }
          break;
          
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          if (this.isExpanded && buttons.length > 0) {
            const nextIndex = currentIndex >= buttons.length - 1 ? 0 : currentIndex + 1;
            buttons[nextIndex].focus();
          }
          break;
          
        case 'Tab':
          if (this.isExpanded) {
            // Trap focus within widget
            if (e.shiftKey && e.target === this.mainBtn) {
              e.preventDefault();
              buttons[buttons.length - 1]?.focus();
            } else if (!e.shiftKey && e.target === buttons[buttons.length - 1]) {
              e.preventDefault();
              this.mainBtn.focus();
            }
          }
          break;
          
        case 'Home':
          e.preventDefault();
          if (this.isExpanded && buttons.length > 0) {
            buttons[0].focus();
          }
          break;
          
        case 'End':
          e.preventDefault();
          if (this.isExpanded && buttons.length > 0) {
            buttons[buttons.length - 1].focus();
          }
          break;
      }
    }
    
    handleVisibility() {
      if (this.config.showDelay > 0) {
        setTimeout(() => {
          if (this.config.showOnScroll === 0) {
            this.show();
          }
        }, this.config.showDelay);
      } else if (this.config.showOnScroll === 0) {
        this.show();
      }
      
      // Initial scroll check
      if (this.config.showOnScroll > 0) {
        this.handleScrollVisibility();
      }
    }
    
    handleScrollVisibility() {
      const scrollY = window.scrollY || window.pageYOffset;
      
      if (scrollY >= this.config.showOnScroll) {
        this.show();
      } else {
        this.hide();
      }
    }
    
    toggle() {
      if (this.isExpanded) {
        this.collapse();
      } else {
        this.expand();
      }
    }
    
    expand() {
      this.isExpanded = true;
      this.fabContainer.classList.add('is-expanded');
      this.fabContainer.setAttribute('aria-expanded', 'true');
      
      // Update main button icon to close
      this.mainBtn.innerHTML = ICONS.close;
      
      // Enable tab on child buttons
      const buttons = this.buttonsList.querySelectorAll('.fab-btn');
      buttons.forEach(btn => btn.setAttribute('tabindex', '0'));
      
      // Focus first button
      if (buttons.length > 0) {
        setTimeout(() => buttons[0].focus(), 100);
      }
      
      // Dispatch event
      this.dispatchEvent('expand');
    }
    
    collapse() {
      this.isExpanded = false;
      this.fabContainer.classList.remove('is-expanded');
      this.fabContainer.setAttribute('aria-expanded', 'false');
      
      // Restore main button icon
      this.mainBtn.innerHTML = ICONS[this.config.mainButtonIcon] || ICONS.menu;
      
      // Disable tab on child buttons
      const buttons = this.buttonsList.querySelectorAll('.fab-btn');
      buttons.forEach(btn => btn.setAttribute('tabindex', '-1'));
      
      // Dispatch event
      this.dispatchEvent('collapse');
    }
    
    show() {
      if (this.isVisible) return;
      this.isVisible = true;
      this.fabContainer.classList.remove('is-hidden');
      this.fabContainer.classList.add('is-visible');
      this.dispatchEvent('show');
    }
    
    hide() {
      if (!this.isVisible) return;
      this.isVisible = false;
      this.fabContainer.classList.remove('is-visible');
      this.fabContainer.classList.add('is-hidden');
      this.collapse();
      this.dispatchEvent('hide');
    }
    
    dispatchEvent(name) {
      const event = new CustomEvent(`liveupx:${name}`, {
        bubbles: true,
        detail: { widget: this }
      });
      this.container.dispatchEvent(event);
    }
    
    // Public API methods
    updateConfig(newConfig) {
      this.config = this.mergeConfig(this.config, newConfig);
      this.destroy();
      this.init();
    }
    
    addButton(buttonConfig) {
      this.config.buttons.push(buttonConfig);
      this.buttonsList.innerHTML = this.renderButtons();
    }
    
    removeButton(index) {
      this.config.buttons.splice(index, 1);
      this.buttonsList.innerHTML = this.renderButtons();
    }
    
    destroy() {
      if (this.container && this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
      this.container = null;
      this.shadowRoot = null;
    }
    
    getConfig() {
      return { ...this.config };
    }
  }

  // ============================================
  // AUTO-INITIALIZATION
  // ============================================
  
  function autoInit() {
    // Look for config in script tag data attribute or global variable
    const scriptTag = document.currentScript || 
      document.querySelector('script[data-liveupx-config]');
    
    let config = {};
    
    // Check for data attribute config
    if (scriptTag && scriptTag.dataset.liveupxConfig) {
      try {
        config = JSON.parse(scriptTag.dataset.liveupxConfig);
      } catch (e) {
        console.warn('[LiveupxWidget] Invalid config in data attribute:', e);
      }
    }
    
    // Check for global config
    if (global.LiveupxWidgetConfig) {
      config = { ...config, ...global.LiveupxWidgetConfig };
    }
    
    // Auto-initialize if config has buttons
    if (config.buttons && config.buttons.length > 0) {
      global.LiveupxWidget = new FloatingWidget(config);
    }
  }
  
  // ============================================
  // EXPORT
  // ============================================
  
  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = FloatingWidget;
  }
  
  // Export for AMD
  if (typeof define === 'function' && define.amd) {
    define([], function() { return FloatingWidget; });
  }
  
  // Export to global scope
  global.FloatingWidget = FloatingWidget;
  global.LiveupxFloatingWidget = FloatingWidget;
  
  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
  
})(typeof window !== 'undefined' ? window : this);
