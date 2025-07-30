function Subscribe() {
  return (
    <div className="flex gap-4 justify-center">
      <div>
        <h3>Discover new designs and discounts!</h3>
        <p className="text-center">Spam FREE!</p>
      </div>
      <form>
        <input placeholder="Email address" />
        <button className="inline-block bg-orange-400 text-md font-semibold px-6 py-4 rounded-[5px] self-start">
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default Subscribe;
