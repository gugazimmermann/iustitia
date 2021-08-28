import './Title.css';

export interface TitleProps {
  title: string;
  subtitle?: string;
}

export function Title({ title, subtitle }: TitleProps) {
  return (
    <section>
      <h3 className="font-bold text-2xl">{title}</h3>
      {subtitle && (
        <p className="text-gray-600 pt-2">{subtitle}</p>
      )}
    </section>
  );
}

export default Title;
