import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <h1 className="cursor-pointer text-grey-600 font-semibold text-base">
        tubvilla
      </h1>
    </Link>
  );
}
// Mi <span className="text-main">Casa</span> Mi
//     <span className="text-main">Tub</span>
