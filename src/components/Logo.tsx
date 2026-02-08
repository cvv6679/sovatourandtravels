interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo = ({ className = "", showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/logo.PNG"
        alt="Sova Tours & Travels"
        className="h-10 w-auto"
      />

      {showText && (
        <span className="font-display font-bold text-lg leading-tight text-foreground">
          Sova Tours & Travels
        </span>
      )}
    </div>
  );
};

export default Logo;
