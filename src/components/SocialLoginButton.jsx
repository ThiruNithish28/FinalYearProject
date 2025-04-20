import { UseAuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const SocialLoginButton = () => {
  const { signInWithGoogle, signInWithGitHub } = UseAuthContext();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/new-chat");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      await signInWithGitHub();
      navigate("/new-chat");
    } catch (error) {
      toast.error("Github signin failed " + error.message);
    }
  };

  const buttons = [
    {
      id:1,
      label: "Continue with Google",
      action: handleGoogleSignIn,
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
          className="w-5 "
        />
      ),
    },
    {
      id:2,
      label: "Continue with GitHub",
      action: handleGitHubSignIn,
      icon: <i className="devicon-github-original text-2xl "></i>,
    },
  ];

  return (
    <div className="flex flex-col gap-5  w-full">
      {buttons.map((btn) => (
        <button
          key={btn.id}
          className={`${btn.id === 1 && "bg-gray-btn " }px-4 py-2 h-[42px] font-bold  flex justify-center items-center rounded-md border border-gray-border hover:cursor-pointer`}
          onClick={btn.action}
        >
          <div className="mr-2">{btn.icon}</div>
          <span>{btn.label}</span>
        </button>
      ))}
    </div>
  );
};
export default SocialLoginButton;
