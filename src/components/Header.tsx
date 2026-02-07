import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "./Logo";
import { motion, AnimatePresence } from "framer-motion";

const internationalDestinations = [
  "Dubai",
  "Nepal",
  "Bhutan",
  "Bangkok & Pattaya",
  "Malaysia",
  "Vietnam",
  "Bali",
  "Sri Lanka",
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/packages", label: "Packages" },
    { href: "/international", label: "International Trips", hasDropdown: true },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <DropdownMenu key={link.href}>
                  <DropdownMenuTrigger className={`text-sm font-bold transition-colors hover:text-primary flex items-center gap-1 ${
                    isActive(link.href) || location.pathname.startsWith("/international")
                      ? "text-primary"
                      : "text-foreground"
                  }`}>
                    {link.label}
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/international" className="font-medium">
                        All Destinations
                      </Link>
                    </DropdownMenuItem>
                    {internationalDestinations.map((dest) => (
                      <DropdownMenuItem key={dest} asChild>
                        <Link to={`/international?destination=${dest.toLowerCase().split(" ")[0]}`}>
                          {dest}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-bold transition-colors hover:text-primary ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://wa.me/919474025173"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gradient-sunset hover:opacity-90 text-secondary-foreground font-semibold gap-2">
                <Phone className="w-4 h-4" />
                WhatsApp Us
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-border"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  link.hasDropdown ? (
                    <div key={link.href} className="space-y-2">
                      <Link
                        to={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-sm font-bold py-2 transition-colors ${
                          isActive(link.href) || location.pathname.startsWith("/international")
                            ? "text-primary"
                            : "text-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                      <div className="pl-4 flex flex-col gap-2">
                        {internationalDestinations.slice(0, 4).map((dest) => (
                          <Link
                            key={dest}
                            to={`/international?destination=${dest.toLowerCase().split(" ")[0]}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-sm text-muted-foreground py-1"
                          >
                            {dest}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-sm font-bold py-2 transition-colors ${
                        isActive(link.href)
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                ))}
                <a
                  href="https://wa.me/919474025173"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2"
                >
                  <Button className="w-full bg-gradient-sunset hover:opacity-90 text-secondary-foreground font-semibold gap-2">
                    <Phone className="w-4 h-4" />
                    WhatsApp Us
                  </Button>
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
