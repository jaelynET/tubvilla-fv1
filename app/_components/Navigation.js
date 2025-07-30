import Link from "next/link";

function Navigation() {
  return (
    <nav>
      <ul className="flex gap-12 items-center ">
        <li>
          <Link
            href="/bathtubs"
            className="hover:text-my-orange2 text-grey-0 cursor-pointer transition-colors"
          >
            {" "}
            Bath tubs
          </Link>
        </li>
        <li className="hover:text-my-orange2 text-grey-0 cursor-pointer transition-colors ">
          Showers
        </li>
        <li className="hover:text-my-orange2 text-grey-0 cursor-pointer transition-colors ">
          Vanities
        </li>
        <li className="hover:text-my-orange2 text-grey-0 cursor-pointer transition-colors ">
          Sinks
        </li>
        <li className="hover:text-my-orange2 text-grey-0 cursor-pointer transition-colors ">
          Faucets
        </li>
      </ul>
    </nav>
  );
}
export default Navigation;
//className="flex gap-12 items-center justify-between my-10  px-7"
