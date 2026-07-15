import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-camel/25 bg-footer w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg text-bone mb-4 pb-2 border-b border-camel/40 inline-block">
              Contact Info
            </h3>
            <ul className="space-y-3 mt-2">
              <li className="flex items-start gap-2 text-sm text-bone/75">
                <MapPin size={16} className="text-camel mt-0.5 shrink-0" />
                <span>
                  AIDAS Studio
                  <br />
                  Changanacherry, Kerala
                  <br />
                  Pin 686101
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-bone/75">
                <Mail size={16} className="text-camel shrink-0" />
                info@aidas.com
              </li>
              <li className="flex items-center gap-2 text-sm text-bone/75">
                <Phone size={16} className="text-camel shrink-0" />
                807 807 1148
              </li>
            </ul>
          </div>

          {/* Customer Services */}
          <div>
            <h3 className="font-display text-lg text-bone mb-4 pb-2 border-b border-camel/40 inline-block">
              Customer Services
            </h3>
            <ul className="space-y-3 mt-2 text-sm">
              <li>
                <Link to="/orders" className="text-bone/75 hover:text-camel transition-colors">
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-bone/75 hover:text-camel transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-bone/75 hover:text-camel transition-colors">
                  Shipping &amp; Delivery
                </Link>
              </li>
              <li>
                <Link to="/refunds" className="text-bone/75 hover:text-camel transition-colors">
                  Refund &amp; Cancellations
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="font-display text-lg text-bone mb-4 pb-2 border-b border-camel/40 inline-block">
              Informations
            </h3>
            <ul className="space-y-3 mt-2 text-sm">
              <li>
                <Link to="/about" className="text-bone/75 hover:text-camel transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-bone/75 hover:text-camel transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-bone/75 hover:text-camel transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-bone/75 hover:text-camel transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Mail / Payments */}
          <div>
            <h3 className="font-display text-lg text-bone mb-4 pb-2 border-b border-camel/40 inline-block">
              Get In Touch
            </h3>
            <p className="text-sm text-bone/75">
              Mail us:{" "}
              <a href="mailto:info@aidas.com" className="text-camel font-medium">
                info@aidas.com
              </a>
            </p>

            <p className="text-xs uppercase tracking-wide text-bone/50 mt-6 mb-2">
              We Accept
            </p>
            <div className="flex flex-wrap gap-2">
              {["Visa", "Mastercard", "UPI", "COD"].map((method) => (
                <span
                  key={method}
                  className="rounded-md border border-bone/25 bg-transparent px-2.5 py-1 text-xs font-medium text-bone/75"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-4 mt-12">
          
           <a href="https://facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-bone/10 flex items-center justify-center text-bone hover:bg-camel hover:text-ink transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
            </svg>
          </a>

          
          <a  href="https://instagram.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-bone/10 flex items-center justify-center text-bone hover:bg-camel hover:text-ink transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.55.55.9 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.76c-.55.55-1.1.9-1.76 1.15-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.76-1.15 4.9 4.9 0 01-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76A4.9 4.9 0 015.44 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 1.8c-2.67 0-2.99.01-4.04.06-.97.04-1.5.2-1.85.34-.46.18-.79.4-1.14.75-.35.35-.57.68-.75 1.14-.14.35-.3.88-.34 1.85-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.97.2 1.5.34 1.85.18.46.4.79.75 1.14.35.35.68.57 1.14.75.35.14.88.3 1.85.34 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.97-.04 1.5-.2 1.85-.34.46-.18.79-.4 1.14-.75.35-.35.57-.68.75-1.14.14-.35.3-.88.34-1.85.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.97-.2-1.5-.34-1.85a3.1 3.1 0 00-.75-1.14 3.1 3.1 0 00-1.14-.75c-.35-.14-.88-.3-1.85-.34-1.05-.05-1.37-.06-4.04-.06zm0 4.6a5.6 5.6 0 110 11.2 5.6 5.6 0 010-11.2zm0 1.8a3.8 3.8 0 100 7.6 3.8 3.8 0 000-7.6zm5.8-2.01a1.31 1.31 0 11-2.62 0 1.31 1.31 0 012.62 0z" />
            </svg>
          </a>

          
           <a href="https://youtube.com/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-bone/10 flex items-center justify-center text-bone hover:bg-camel hover:text-ink transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.2a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3.02 3.02 0 002.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.6 15.5V8.5l6.4 3.5-6.4 3.5z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-camel/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-display italic text-bone/80 text-sm">AIDAS</p>
          <p className="text-xs text-bone/50 tracking-wide">
            © 2026 AIDAS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;