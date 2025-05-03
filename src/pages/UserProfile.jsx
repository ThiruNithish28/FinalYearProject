import { useAuthContext } from "../context/AuthContext";

const UserProfile = () => {
    const {user} = useAuthContext();
  return (
    <div>
      <p>hey{user && "currnet : " + user.email + " Uid : " +user.uid}</p>
      <p></p>
      <div className="flex flex-col gap-4">
        <p></p>
      </div>
    </div>
  );
};
export default UserProfile;
