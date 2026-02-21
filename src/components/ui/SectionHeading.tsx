interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  subtitle2?: string;
}

export function SectionHeading({ title, subtitle, subtitle2 }: SectionHeadingProps) {
  return (
    <div>
      <h2 className="font-display text-2xl text-paper sm:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-2 max-w-2xl text-fog/85">{subtitle}</p> : null}
      {subtitle2 ? <p className="mt-2 max-w-2xl text-xs text-fog/60">{subtitle2}</p> : null}
    </div>
  );
}
