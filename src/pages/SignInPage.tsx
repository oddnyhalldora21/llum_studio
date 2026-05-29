function SignInPage() {
    return (
      <div className="max-w-md mx-auto px-8 py-24">
        <h1 className="font-serif text-3xl text-stone-900 mb-2">Sign In</h1>
        <p className="text-sm text-stone-400 mb-10">Welcome back to Llum Studio</p>
  
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors"
          />
          <button className="w-full py-3 bg-stone-900 text-white text-sm hover:bg-stone-700 transition-colors">
            Sign In
          </button>
        </div>
  
        <p className="text-sm text-stone-400 mt-6 text-center">
          Don't have an account?{' '}
          <button className="text-stone-900 hover:underline">Create one</button>
        </p>
      </div>
    )
  }
  
  export default SignInPage