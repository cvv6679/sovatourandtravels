interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo = ({ className = "", showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/logo.PNG"
        alt="Sova Tour & Travels Logo - Best Travel Agency in Rampurhat"
        width={160}
        height={56}
        fetchPriority="high"
        loading="eager"
        className="h-12 md:h-14 w-auto object-contain"
      />

      {showText && (
        <span className="font-display font-bold text-lg leading-tight text-foreground">
          Sova Tour & Travels
        </span>
      )}
    </div>
  );
};

export default Logo;
