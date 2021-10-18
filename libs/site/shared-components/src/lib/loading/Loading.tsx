export function Loading() {
  return (
    <div className="flex flex-col justify-center items-center space-y-4 mt-2">
      <h1 className="text-primary-500 font-bold text-xl">Carregando</h1>
      <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-primary-500"></div>
    </div>
  );
}

export default Loading;
