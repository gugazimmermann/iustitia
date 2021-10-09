interface TitleProps {
  title: string;
  subtitle?: string;
  plan?: string;
}

export function Title({ title, subtitle, plan }: TitleProps) {
  return (
    <div className="mb-4 md:mb-6 md:mx-auto text-center">
      <h1 className="text-2xl font-bold text-gray-700">{title}</h1>
      {subtitle && (
        <p className="text-gray-600 pt-2">
          {subtitle} {plan && <span className="font-bold">{plan}</span>}
        </p>
      )}
    </div>
  );
}

export default Title;
