export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600 font-medium tracking-wide animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
