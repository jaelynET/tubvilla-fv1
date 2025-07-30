import Image from "next/image";
import Link from "next/link";

function ProductCard({ product }) {
  const { id, name, regularPrice, discount, image, lengths } = product;

  return (
    <div>
      <div className="relative h-35 w-35 md:h-70 md:w-60">
        <Link href={`/bathtubs/${id}`} className="cursor-pointer">
          <Image
            src={image}
            alt="Product"
            className="object-cover "
            fill

            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </div>
      <div className="mb-8">
        <p className="text-base font-bold md:mt-2 md:mb-3">{name}</p>
        <Link href={`/bathtubs/${id}`} className="cursor-pointer">
          <p className=" flex gap-4">
            {discount > 0 ? (
              <>
                <span className="text-sm">${regularPrice - discount}</span>
                <span className="line-through  text-sm text-gray-500  font-bold">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-sm">${regularPrice}</span>
            )}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
