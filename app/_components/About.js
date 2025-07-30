import {
  FaceSmileIcon,
  FlagIcon,
  HomeIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";

function About() {
  return (
    <div>
      <h2 className="text-center mb-10 text-2xl">
        What makes our tubs special?
      </h2>
      <div className="grid grid-cols-4 gap-10 place-content-center mx-20">
        <div>
          <LightBulbIcon className="h-10 w-10 mb-5 bg-primary-300 text-accent-50 rounded-full" />
          <h3 className="mb-10">Orignal Designs</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis a.
          </p>
        </div>
        <div>
          <HomeIcon className="h-10 w-10 mb-5 bg-primary-300 text-accent-50 rounded-full" />
          <h3 className="mb-10">Durable</h3>
          <p>Built with fine-grade material that will last up to 25years!</p>
        </div>
        <div>
          <FaceSmileIcon className="h-10 w-10 mb-5 bg-primary-300 text-accent-50 rounded-full" />
          <h3 className="mb-10">Orignal 1000 Styles</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            tempora eius id facilis omnis.
          </p>
        </div>
        <div>
          <FlagIcon className="h-10 w-10 mb-5 bg-primary-300 text-accent-50 rounded-full" />
          <h3 className="mb-10">Made in USA</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            labore earum eos.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
