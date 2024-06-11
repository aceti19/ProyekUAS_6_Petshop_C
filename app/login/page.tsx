import { lusitana } from '@/app/ui/fonts';
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function LoginForm() {
  return (
    <main 
      className="relative min-h-screen flex items-center justify-center p-6 leading-normal" 
      style={{ 
        background: 'linear-gradient(to bottom right, #FFB0C0, #93B9E7)'
      }}
    >
      <div className="relative z-10 flex items-center justify-between w-full max-w-4xl rounded-lg shadow-lg overflow-hidden" 
           style={{ 
             background: 'linear-gradient(45deg, #FFFFFF 0%, rgba(255,255,255,0.5) 100%)'
           }}>

        {/* Logo section */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <img src="/logo_b.png" alt="Logo" className="max-w-full h-auto" /> 
        </div>

        {/* Form section */}
        <form className="w-1/2 p-8 flex flex-col"> 
          <h1 className={`${lusitana.className} mb-4 font-bold text-3xl text-pink-700`}>
            Login
          </h1>
          <p className="mb-4 text-sm text-gray-600">
            Please login to your account to access our shop.
          </p>
          <div className="mb-4 flex flex-col">
            <label className="block text-xs font-bold text-gray-700" htmlFor="email">
              Username or Email
            </label>
            <div className="relative mt-1 flex-grow"> 
              <input
                className="peer block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm outline-none placeholder-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your username or email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mb-4 flex flex-col"> 
            <label className="block text-xs font-bold text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="relative mt-1 flex-grow"> 
              <input
                className="peer block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm outline-none placeholder-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <label className="flex items-center text-sm">
              <input type="checkbox" name="remember" className="form-checkbox" />
              <span className="ml-2">Remember me</span>
            </label>
          </div>
          <Link href="/dashboard">
            <button className="w-full py-2 px-4 bg-pink-700 text-white rounded-md hover:bg-pink-800">
              Login
            </button>
          </Link>
        </form>
      </div>
    </main>
  );
}
