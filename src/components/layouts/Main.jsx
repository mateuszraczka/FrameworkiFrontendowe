export default function Main({ children }) {
  return (
    <main className="h-full">
      <div className="mx-auto h-full sm:px-4 py-4">
        {children}
      </div>
    </main>
  );
}
