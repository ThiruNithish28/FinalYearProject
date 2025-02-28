import { UseAuthContext } from "../util/context/AuthContext";

const UserProfile = () => {
    const {currentUser} = UseAuthContext();
  return (
    <div>
      <p>hey{currentUser && "currnet : " + currentUser.email}</p>
    </div>
  );
};
export default UserProfile;
