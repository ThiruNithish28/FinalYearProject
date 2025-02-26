const Login = () => {
  return (
    <div className="bg-[#171717] w-full ">
      <nav className="flex justify-between w-ful p-4 mb-1 ">
        <h1 className="font-extrabold text-sky-700 text-2xl ">CodeMastery Hub</h1>
      </nav>

      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center text-white p-5 w-[330px] sm:w-[384px]  ">
          <div className="w-full">
            <h1 className="font-extrabold capitalize text-xl  mb-4 ">
              Welcome Back Dev/....
            </h1>
            <p className="text-gray-300 mb-4">
              Let's continue your journey for development, we are here for you
            </p>
          </div>

          <div className="flex flex-col gap-2  w-full">
            <button className="px-4 py-2  font-bold capitalize flex justify-center items-center bg-gray-btn rounded border border-gray-border hover:cursor-pointer">
              
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" 
            className="w-5 mr-2"/>
          continue with Google
            </button>

            <button className="px-4 py-2  font-bold capitalize flex justify-center items-center rounded border border-gray-border hover:cursor-pointer">
            
            <i className="devicon-github-original text-2xl mr-2"></i>
          
          continue with GitHub
            </button>
          </div>
          <div className="my-4">
            <span className="text-gray-500 text-sm font-medium">or</span>
          </div>

          <div className="w-full">
            <p className="capitalize mb-2">Email</p>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your mail id"
              className="px-4 py-3 mb-4 w-full border bg-input-drak rounded-md border-gray-border"
            />
          </div>

          <div className="w-full">
            <p className="capitalize mb-2">password</p>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="px-4 py-3 mb-4 w-full border bg-input-dark rounded-md border-gray-border"
            />
          </div>

          <button className="px-10 py-3 bg-sky-700 text-white capitalize rounded-md hover:cursor-pointer w-full mb-4">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
