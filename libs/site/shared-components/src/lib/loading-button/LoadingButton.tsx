import "./LoadingButton.css";

export interface LoadingButtonProps {
  styles: string;
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  loading: boolean;
}

export function LoadingButton({ styles, type, text, loading }: LoadingButtonProps) {
  return (
    <button
      className={styles}
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
