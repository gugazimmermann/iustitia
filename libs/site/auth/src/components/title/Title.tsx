interface TitleProps {
  title: string;
  subtitle?: string;
  plan?: string;
}

export function Title({ title, subtitle, plan }: TitleProps) {
  return (
    <section>
      <h3 className="font-bold text-gray-700 text-2xl">{title}</h3>
      {subtitle && (
        <p className="text-gray-600 pt-2">
          {subtitle} {plan && <span className="font-bold">{plan}</span>}
        </p>
      )}
    </section>
  );
}

export default Title;
