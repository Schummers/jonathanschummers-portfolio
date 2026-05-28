import Image from "next/image";

interface ImageItem {
  alt: string;
  src: string;
}

export function CaseStudyImageGrid({ images }: { images: ImageItem[] }) {
  if (images.length === 0) return null;

  if (images.length >= 5) {
    return (
      <div className="mt-lg -mx-xl max-md:-mx-md overflow-x-auto">
        <div className="flex gap-sm px-xl max-md:px-md pb-sm" style={{ width: "max-content" }}>
          {images.map((img, i) => (
            <figure key={i} className="shrink-0 w-44">
              <Image
                src={img.src}
                alt={img.alt}
                width={180}
                height={320}
                className="w-full h-auto object-cover"
              />
              {img.alt && (
                <figcaption className="mt-xs font-body text-caption italic font-normal text-text-tertiary">
                  {img.alt}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    );
  }

  if (images.length >= 4) {
    return (
      <div className="mt-lg grid grid-cols-4 gap-sm max-md:grid-cols-2">
        {images.slice(0, 4).map((img, i) => (
          <figure key={i}>
            <Image
              src={img.src}
              alt={img.alt}
              width={200}
              height={150}
              className="w-full object-cover"
            />
            {img.alt && (
              <figcaption className="mt-xs font-body text-caption italic font-normal text-text-tertiary">
                {img.alt}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="mt-lg grid grid-cols-2 gap-md items-start max-md:grid-cols-1">
        {images.map((img, i) => (
          <figure key={i}>
            <Image
              src={img.src}
              alt={img.alt}
              width={420}
              height={280}
              className="w-full h-auto"
            />
            {img.alt && (
              <figcaption className="mt-xs font-body text-caption italic font-normal text-text-tertiary">
                {img.alt}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    );
  }

  return (
    <figure className="mt-lg">
      <Image
        src={images[0].src}
        alt={images[0].alt}
        width={640}
        height={400}
        className="w-full h-auto"
      />
      {images[0].alt && (
        <figcaption className="mt-xs font-body text-caption italic font-normal text-text-tertiary">
          {images[0].alt}
        </figcaption>
      )}
    </figure>
  );
}
