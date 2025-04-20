import { UseAuthContext } from "../context/AuthContext";

const UserProfile = () => {
    const {currentUser} = UseAuthContext();
  return (
    <div>
      <p>hey{currentUser && "currnet : " + currentUser.email + " Uid : " +currentUser.uid}</p>
    </div>
  );
};
export default UserProfile;
