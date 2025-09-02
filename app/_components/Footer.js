import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-primary-100 p-5 ">
      <nav className="grid grid-cols-2  justify-center pl-5 md:grid md:grid-cols-4   md:pt-10 md:pl-75 ">
        <div className="mb-5  ">
          <h3 className="font-semibold mb-1 text-sm md:text-base ">Company</h3>
          <ul>
            <li className="text-xs md:text-sm">About us</li>
            <li className="text-xs md:text-sm">Finance with Klarna</li>
          </ul>
        </div>
        <div className="mb-5">
          <h3 className="font-semibold text-sm mb-1 md:text-base">Policy</h3>
          <ul>
            <li className="text-xs md:text-sm">Returns</li>
            <li className="text-xs md:text-sm">Shipping Policy</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-1 md:text-base">
            Customer Service
          </h3>
          <ul>
            <li className="text-xs md:text-sm">sales@tubvilla.com</li>
            <li className="text-xs md:text-sm">Track your order</li>
          </ul>
        </div>

        <div className="flex gap-2">
          <FaInstagram className="w-5 h-5" />
          <FaFacebook className="w-5 h-5" />
          <FaPinterest className="w-5 h-5" />
        </div>
      </nav>
    </div>
  );
}

{
  /*
  
  
  
    <div className="bg-primary-100 p-14">
      <nav className="grid grid-cols-3 place-content-center pb-10 ">
        <div>
          <h3>Company</h3>
          <ul>
            <li>About us</li>
            <li>Finance with Affirm</li>
          </ul>
        </div>
        <div>
          <h3>Policy</h3>
          <ul>
            <li>Returns</li>
            <li>Shipping Policy</li>
          </ul>
        </div>
        <div>
          <h3>Customer Service</h3>
          <ul>
            <li>Contact us</li>
            <li>Track my order</li>
          </ul>
        </div>
      </nav>
      <div className="flex flex-col gap-7 justify-center">
        {/* Add date dynamically 
        <p>&copy; 2025 Mi Casa Mi Tub. All rights Reserved.</p>
        <ul className="flex gap-7">
          <li>Terms of use</li>
          <li>Privacy Policy</li>
          <li>Accesibilty</li>
        </ul>
      </div>
    </div>
  */
}

export default Footer;
