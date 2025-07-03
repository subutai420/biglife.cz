import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

// Biglife Logo Component
const BiglifeLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg 
    width="530" 
    height="530" 
    viewBox="0 0 530 530" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="530" height="530" rx="101" fill="#202020"/>
    <g filter="url(#filter0_d_104_6)">
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M326.5 80.097C312.75 85.059 292.275 92.419 281 96.451C269.725 100.484 251.5 107.003 240.5 110.938C229.5 114.873 213.075 120.704 204 123.895C194.925 127.086 179.4 132.628 169.5 136.212C159.6 139.795 144.75 145.057 136.5 147.905C128.25 150.753 120.487 153.733 119.25 154.528L117 155.973V205.367V254.762L121.25 256.291C123.587 257.133 142.15 263.077 162.5 269.5C182.85 275.923 200.963 281.648 202.75 282.221C204.538 282.794 206 283.605 206 284.023C206 284.441 203.637 285.669 200.75 286.752C197.862 287.835 190.658 290.99 184.741 293.763L173.982 298.805L174.241 349.53L174.5 400.255L196.5 407.521C309.013 444.678 349.11 457.857 350.439 458.119C351.836 458.395 352.005 452.896 352.058 405.427L352.116 352.427L344.308 349.614C340.014 348.067 332.681 345.688 328.014 344.328C323.347 342.968 319.187 341.514 318.771 341.098C318.354 340.681 325.437 337.03 334.509 332.983C343.582 328.936 351.342 325.131 351.753 324.526C352.164 323.922 352.375 301.246 352.222 274.135C352.01 236.376 351.659 224.751 350.722 224.451C336.302 219.831 293.286 206.402 289.888 205.459C283.574 203.709 281.008 202.24 283 201.517C283.825 201.217 290.35 198.994 297.5 196.576C304.65 194.158 319.838 188.912 331.25 184.919L352 177.657V124.292C352 94.941 351.887 70.96 351.75 71C351.613 71.041 340.25 75.134 326.5 80.097ZM307.523 98.976C290.485 105.015 270.46 112.159 263.023 114.854C225.21 128.551 144.972 156.927 144.052 156.927C143.473 156.927 143 157.34 143 157.844C143 158.983 146.825 160.368 169.5 167.439C179.4 170.526 192.9 174.791 199.5 176.916C206.1 179.041 223.06 184.4 237.19 188.824C266.769 198.086 260.233 198.138 287.5 188.422C322.187 176.062 334.634 171.659 337.75 170.647L341 169.591V128.759C341 96.7411 340.73 87.935 339.75 87.962C339.063 87.981 324.56 92.938 307.523 98.976ZM128.773 204.57C128.623 225.609 128.742 243.844 129.037 245.092C129.412 246.674 130.773 247.722 133.537 248.555C135.717 249.212 145.375 252.225 155 255.251C164.625 258.277 195 267.8 222.5 276.413C250 285.026 287.458 296.765 305.739 302.5C324.021 308.235 339.433 312.927 339.989 312.927C340.653 312.927 341 299.278 341 273.123V233.319L300.25 220.499C277.838 213.448 237.45 200.712 210.5 192.196C183.55 183.68 159.025 175.997 156 175.122C152.975 174.247 145.673 171.908 139.773 169.924L129.045 166.317L128.773 204.57ZM212 294.518C205.125 297.595 199.124 300.47 198.664 300.906C198.203 301.343 210.578 305.839 226.164 310.898C241.749 315.957 264.049 323.234 275.719 327.07C302.898 336.001 302.494 335.942 310.26 332.125C313.692 330.438 319.537 327.697 323.25 326.034C326.963 324.371 329.999 322.654 329.999 322.219C329.998 321.783 318.635 317.919 304.749 313.632C290.862 309.344 268.25 302.252 254.5 297.872C240.75 293.491 228.375 289.686 227 289.415C225.33 289.087 220.348 290.782 212 294.518ZM185.585 317.555C184.43 330.294 185.045 389.619 186.349 391.291C186.982 392.103 204.15 398.241 224.5 404.931C244.85 411.621 279.079 422.907 300.564 430.011C322.049 437.115 339.927 442.927 340.292 442.927C340.657 442.927 341.079 424.481 341.228 401.937L341.5 360.947L334.5 358.457C330.65 357.087 316.475 352.391 303 348.021C289.525 343.651 259.6 333.939 236.5 326.44C213.4 318.94 192.645 312.204 190.378 311.47L186.257 310.136L185.585 317.555Z" 
        fill="white"
      />
    </g>
    <defs>
      <filter id="filter0_d_104_6" x="113" y="68" width="243.272" height="395.128" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="1"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_104_6"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_104_6" result="shape"/>
      </filter>
    </defs>
  </svg>
);

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '#uvod', label: 'Úvod' },
    { href: '#jak-to-funguje', label: 'Jak to funguje' },
    { href: '#pro-investory', label: 'Pro investory' },
    { href: '#nemovitosti', label: 'Naše nemovitosti' },
    { href: '#o-nas', label: 'O nás' },
    { href: '#faq', label: 'FAQ' },
    { href: '#kontakt', label: 'Kontakt' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg shadow-black/5">
          <div className="flex justify-between items-center h-16 px-6">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3">
                <BiglifeLogo className="w-10 h-10 drop-shadow-lg" />
                <h2 className="text-primary">Biglife</h2>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-primary hover:bg-gray-100/60 px-3 py-2 rounded-lg transition-all duration-200"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <Button className="bg-primary hover:bg-primary/90 shadow-sm" asChild>
                <a href="#kontakt">Stát se investorem</a>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100/60"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200/50">
              <div className="px-6 pt-4 pb-6 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-primary hover:bg-gray-100/60 block px-3 py-2 rounded-lg transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <Button className="w-full mt-4 bg-primary hover:bg-primary/90" asChild>
                  <a href="#kontakt">Stát se investorem</a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}