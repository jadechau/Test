import logoOnLightUrl from './logo-on-light.svg?url';
import logoOnDarkUrl from './logo-on-dark.svg?url';
import './Logo.css';

export type LogoVariant = 'light' | 'dark';

export interface LogoProps {
  variant?: LogoVariant;
  height?: number;
  className?: string;
}

const ASPECT_RATIO = 544 / 128;

export function Logo({ variant = 'light', height = 32, className = '' }: LogoProps) {
  const src = variant === 'light' ? logoOnLightUrl : logoOnDarkUrl;
  const width = Math.round(height * ASPECT_RATIO);

  return (
    <img
      src={src}
      width={width}
      height={height}
      alt="Surveil"
      className={className}
      style={{ display: 'block' }}
      draggable={false}
    />
  );
}
