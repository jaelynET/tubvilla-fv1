import Link from "next/link";
import { FaInstagram, FaFacebook, FaPinterest } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-footer border-t">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <nav className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3 text-sm md:text-base">Company</h3>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-xs md:text-sm hover:underline"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-xs md:text-sm hover:underline"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="text-xs md:text-sm hover:underline"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold mb-3 text-sm md:text-base">
              Policies
            </h3>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-xs md:text-sm hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-xs md:text-sm hover:underline"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/shipping-policy"
                  className="text-xs md:text-sm hover:underline"
                >
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/return-policy"
                  className="text-xs md:text-sm hover:underline"
                >
                  Return & Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3 text-sm md:text-base">
              Customer Support
            </h3>

            <ul className="space-y-2">
              <li className="text-xs md:text-sm">510-274-9796</li>

              <li className="text-xs md:text-sm break-all">
                sales@tubvilla.com
              </li>

              <li className="text-xs md:text-sm">
                Mon, Wed, Fri / 11AM – 1PM PST
              </li>
              <address className="not-italic text-xs md:text-sm">
                177 W Buchanan Rd
                <br />
                Pittsburg, CA 94565
              </address>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-semibold mb-3 text-sm md:text-base">
              Follow Us
            </h3>

            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/tubvilla"
                aria-label="Instagram"
                className="hover:opacity-70 transition"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>

              <Link
                href="https://www.facebook.com/profile.php?id=61589861829653&mibextid=ZbWKwL"
                aria-label="Facebook"
                className="hover:opacity-70 transition"
              >
                <FaFacebook className="w-5 h-5" />
              </Link>

              <Link
                href="https://www.pinterest.com/tubvilla"
                aria-label="Pinterest"
                className="hover:opacity-70 transition"
              >
                <FaPinterest className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </nav>

        <div className="border-t mt-10 pt-5 text-xs text-gray-500 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} TubVilla. All rights reserved.</p>

          <p>Modern bathtubs, faucets, and bathroom essentials.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
