import "./LoadingButton.css";

export interface LoadingButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  loading: boolean;
}

export function LoadingButton({ type, text, loading }: LoadingButtonProps) {
  return (
    <button
      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
      type={type}
      disabled={loading}
    >
      {loading ? (
        <div className=" flex justify-center items-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        </div>
      ) : (
        text
      )}
    </button>
  );
}

export default LoadingButton;
