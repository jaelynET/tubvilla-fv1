import { logoutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <form action={logoutAction}>
      <button className=" hidden group-hover:block absolute right-0 inset-y-5">
        <h3 className="cursor-pointer  bg-amber-50">Sign Out</h3>
      </button>
    </form>
  );
}
export default SignOutButton;
