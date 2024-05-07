import LoadingSpinner from "@/components/LoadingSpinner";

function Loading() {
  return (
    <main
      className="grid h-[calc(100vh-6rem)] place-items-center bg-gray-50"
      id="main"
    >
      <LoadingSpinner />
    </main>
  );
}
export default Loading;
