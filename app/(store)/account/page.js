import { createClient } from "@/app/utils/supabase/server";
import Link from "next/link";

async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  const { fullName } = data.user.user_metadata;
  const firstName = fullName.split(" ").at(0);

  return (
    <div>
      <div className="w--full h-20 text-2xl rounded-xl mt-10 mb-4 mx-4 bg-grey-100 ">
        <h2 className="font-medium pt-3 mx-3">Welcome, {firstName}</h2>
      </div>
      <div className=" ">
        <h3 className="text-grey-0 mx-5 ">Recently viewed</h3>
        <h3 className="text-grey-0 mx-5 ">Favorites</h3>
        <h3 className="text-grey-0 mx-5 ">Orders</h3>

        <h3 className="text-grey-0 mx-5 ">Shipping Info</h3>
        <Link href={"account/profile"}>
          <p className="mx-5 text-grey-0 ">Account Details</p>
        </Link>
      </div>
    </div>
  );
}
export default Page;
