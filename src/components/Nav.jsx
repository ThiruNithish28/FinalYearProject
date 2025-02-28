const Nav = ({isNeedLoginBtn})=>{
    return isNeedLoginBtn ? <div className="flex flex-col justify-between">
        <div>
            <h1>CodeMastery Hub</h1>
        </div>
        <div>
            <button className="px-4 py-2">sign in</button>
            <button className="px-4 py-2">sign up</button>
        </div>
    </div> :  <nav className="flex justify-between w-ful p-4 mb-1 ">
        <h1 className="font-extrabold text-sky-700 text-2xl ">
          CodeMastery Hub
        </h1>
      </nav>
}

export default Nav;