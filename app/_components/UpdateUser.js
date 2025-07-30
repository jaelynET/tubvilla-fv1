function UpdateUser({ user }) {
  const { fullName, email } = user;
  return (
    <form>
      <div>
        <h3>Name</h3>
        <input
          name="fullName"
          className="border border-primary-400 rounded-sm py-3 px-3"
          defaultValue={fullName}
        />
      </div>
      <div>
        <h3>Email address</h3>
        <input
          name="email"
          className="border border-primary-400 rounded-sm py-3 px-3"
          defaultValue={email}
        />
      </div>
      <div>
        <label>Password</label>
        <input name="password" />
      </div>
    </form>
  );
}
export default UpdateUser;
