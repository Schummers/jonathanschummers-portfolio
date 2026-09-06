import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/cn";

interface ThemedImageProps extends Omit<ImageProps, "src"> {
  src: string;
  /* Capture sombre du meme ecran : affichee a la place de `src` quand le site
     est en mode sombre. Absente, l'image est la meme dans les deux themes. */
  darkSrc?: string;
}

/* Une capture d'app qui suit le theme du site. Les deux images sont dans le
   DOM et CSS choisit (`dark:`), donc le switch est instantane et sans
   hydration ; la sombre est cachee aux lecteurs d'ecran, l'alt vaut une fois. */
export function ThemedImage({ src, darkSrc, className, alt, ...rest }: ThemedImageProps) {
  if (!darkSrc) return <Image src={src} alt={alt} className={className} {...rest} />;
  return (
    <>
      <Image src={src} alt={alt} className={cn(className, "dark:hidden")} {...rest} />
      <Image src={darkSrc} alt="" aria-hidden="true" className={cn(className, "hidden dark:block")} {...rest} />
    </>
  );
}
