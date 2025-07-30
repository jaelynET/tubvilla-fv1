import UpdateUser from "@/app/_components/UpdateUser";
import { createClient } from "@/app/utils/supabase/server";
//import { createUser, getUser } from "../_lib/apiAuth";

async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const { app_metadata, user_metadata } = data.user;

  return (
    <div>
      <h2>Account Details</h2>
      {app_metadata.provider === "email" && <UpdateUser user={user_metadata} />}
    </div>
  );
}
export default Page;
