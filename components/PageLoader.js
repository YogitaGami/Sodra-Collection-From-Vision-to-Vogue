export default function PageLoader() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-lg font-semibold bg-[#e5e7eb52]">
      <div className="flex space-x-1 text-2xl font-bold text-gray-700">
        <span className="animate-bounce">.</span>
        <span className="animate-bounce [animation-delay:0.2s]">.</span>
        <span className="animate-bounce [animation-delay:0.4s]">.</span>
      </div>
      <p className="mt-2 text-center text-sm text-gray-500">
        Loading, please wait...
      </p>
    </div>
  );
}