import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function GitHubIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 2C6.477 2 2 6.589 2 12.248c0 4.526 2.865 8.367 6.839 9.722.5.096.682-.221.682-.492 0-.243-.009-.889-.014-1.745-2.782.617-3.369-1.37-3.369-1.37-.455-1.184-1.11-1.5-1.11-1.5-.908-.635.069-.622.069-.622 1.004.072 1.532 1.056 1.532 1.056.892 1.564 2.341 1.113 2.91.851.091-.664.349-1.114.636-1.37-2.22-.26-4.555-1.137-4.555-5.061 0-1.118.39-2.033 1.029-2.749-.103-.261-.446-1.31.098-2.731 0 0 .84-.276 2.75 1.05A9.303 9.303 0 0 1 12 6.835c.85.004 1.707.118 2.507.346 1.909-1.326 2.748-1.05 2.748-1.05.545 1.42.202 2.47.1 2.731.64.716 1.028 1.631 1.028 2.749 0 3.934-2.339 4.798-4.566 5.053.359.319.678.947.678 1.909 0 1.378-.012 2.49-.012 2.829 0 .273.18.592.688.491C19.138 20.61 22 16.772 22 12.248 22 6.589 17.523 2 12 2Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.56C7.16 3.87 6.3 3 5.25 3S3.34 3.87 3.34 4.94c0 1.06.84 1.94 1.88 1.94h.02c1.07 0 1.92-.88 1.92-1.94ZM20.66 13.01c0-3.36-1.8-4.92-4.21-4.92-1.94 0-2.8 1.08-3.28 1.84V8.5H9.79c.04.95 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.12-.92.27-.68.88-1.38 1.91-1.38 1.35 0 1.89 1.04 1.89 2.57V20h3.38v-6.99Z" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        d="M12 4v10m0 0 4-4m-4 4-4-4M4 18.5h16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        d="M4 7.5h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Zm0 0 8 6 8-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        d="m15 6-6 6 6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        d="m9 6 6 6-6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        d="M6 6 18 18M18 6 6 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
