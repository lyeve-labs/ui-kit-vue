/** The shapes an image without a known size reserves its box at. */
export type ImageRatio = '1/1' | '4/3' | '3/2' | '16/9';

/** A link in a navigation bar. With no `href` the label is drawn as text. */
export interface NavLink {
  label: string;
  href?: string;
  /** The page the bar is drawn on, announced as the current page. */
  current?: boolean;
}

/** The networks a footer links a profile on, by the name each one uses. */
export const SOCIAL_NETWORKS = {
  x: 'X',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
  mastodon: 'Mastodon',
} as const;

export type SocialNetwork = keyof typeof SOCIAL_NETWORKS;

/** An image in a gallery, cropped to 4:3 so the tiles line up. */
export interface GalleryImage {
  src: string;
  /** What the image shows. An empty string marks it decorative. */
  alt: string;
  caption?: string;
}

/** What Field hands the control it wraps, through its default slot. */
export interface FieldWiring {
  /** The id the control must carry. The label's `for` already points at it. */
  id: string;
  /** The id of whichever message is on screen, for the control's `aria-describedby`. */
  describedBy: string | undefined;
  /** True while an error is showing, for the control's `aria-invalid`. */
  invalid: boolean;
  /** The id of the caption, for a group's `aria-labelledby`. Set only for a labeled group. */
  labeledBy: string | undefined;
}
