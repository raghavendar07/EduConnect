import { ImgHTMLAttributes } from "react";
import { icons, IconName } from "../../assets/icons";
import { cn } from "../../lib/cn";

type IconProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  name: IconName;
  size?: number;
};

/**
 * Renders a design-system SVG icon exported from Figma.
 * Colors are baked into the SVG files, so we preserve them via <img> rendering.
 */
export function Icon({
  name,
  size = 20,
  className,
  alt = "",
  ...rest
}: IconProps) {
  return (
    <img
      src={icons[name]}
      alt={alt}
      width={size}
      height={size}
      className={cn("block shrink-0 select-none", className)}
      {...rest}
    />
  );
}
