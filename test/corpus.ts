/**
 * The cases the parity test renders through both frameworks. Text is plain,
 * and every harness wraps each piece in a span.
 */

export const COMPONENTS = [
  'SectionHeading',
  'Button',
  'Card',
  'Badge',
  'Accordion',
  'AccordionItem',
  'Field',
  'Label',
  'Input',
  'Textarea',
  'Checkbox',
  'FormMessage',
  'Section',
  'Columns',
  'Prose',
  'Image',
  'Quote',
  'NavBar',
  'Footer',
  'Gallery',
] as const;

export type ComponentName = (typeof COMPONENTS)[number];

export interface ParityCase {
  name: string;
  component: ComponentName;
  props?: Record<string, unknown>;
  /** The default slot. */
  children?: string;
  /** Named slots, by the name the original gives its snippet. */
  slots?: Record<string, string>;
  /** Field's default slot draws an input carrying the id and the message it was handed. */
  wired?: boolean;
  /** Passes the chevron icon as the `icon` prop. */
  icon?: boolean;
  /** Components drawn inside this one, in place of `children`. */
  items?: { component: ComponentName; props: Record<string, unknown>; children?: string }[];
}

const noop = () => {};

const variants = ['primary', 'secondary', 'danger', 'ghost', 'outline', 'violet'] as const;
const buttonSizes = ['sm', 'md', 'lg', 'icon'] as const;
const tones = ['neutral', 'brand', 'violet', 'success', 'warn', 'danger'] as const;
const ratios = ['1/1', '4/3', '3/2', '16/9'] as const;

export const CASES: ParityCase[] = [
  // SectionHeading
  { name: 'heading level 2', component: 'SectionHeading', children: 'Plans' },
  { name: 'heading level 3', component: 'SectionHeading', props: { level: 3 }, children: 'Plans' },
  {
    name: 'heading eyebrow at both levels',
    component: 'SectionHeading',
    props: { level: 3, variant: 'eyebrow', class: 'mb-2' },
    children: 'Plans',
  },
  {
    name: 'heading eyebrow level 2 with actions',
    component: 'SectionHeading',
    props: { variant: 'eyebrow' },
    children: 'Plans',
    slots: { actions: 'Filter' },
  },

  // Button
  ...variants.map((variant) => ({
    name: `button variant ${variant}`,
    component: 'Button' as const,
    props: { variant },
    children: 'Save',
  })),
  ...buttonSizes.map((size) => ({
    name: `button size ${size}`,
    component: 'Button' as const,
    props: { size, title: 'Save' },
    children: 'Save',
  })),
  { name: 'button submit', component: 'Button', props: { type: 'submit', name: 'go' }, children: 'Go' },
  { name: 'button reset, full width', component: 'Button', props: { type: 'reset', full: true }, children: 'Clear' },
  { name: 'button disabled', component: 'Button', props: { disabled: true }, children: 'Save' },
  { name: 'button loading', component: 'Button', props: { loading: true, class: 'w-40' }, children: 'Saving' },
  { name: 'button loading large', component: 'Button', props: { loading: true, size: 'lg' }, children: 'Saving' },
  { name: 'button link', component: 'Button', props: { href: '/start', 'data-track': 'cta' }, children: 'Start' },
  { name: 'button link disabled', component: 'Button', props: { href: '/start', disabled: true }, children: 'Start' },
  { name: 'button link loading', component: 'Button', props: { href: '/start', loading: true, variant: 'outline' }, children: 'Start' },
  { name: 'button link with a refused scheme', component: 'Button', props: { href: 'java\tscript:alert(1)' }, children: 'Start' },
  { name: 'button with a click handler', component: 'Button', props: { onclick: noop }, children: 'Open' },

  // Card
  { name: 'card with a title', component: 'Card', props: { title: 'Studio', description: 'A room to work in.' }, children: 'Body' },
  {
    name: 'card with an image',
    component: 'Card',
    props: { title: 'Studio', image: { src: '/studio.jpg', alt: 'A desk' } },
    children: 'Body',
  },
  {
    name: 'card with a sized image',
    component: 'Card',
    props: { image: { src: '/studio.jpg', alt: '', width: 640, height: 480 }, pad: 'none' },
    children: 'Body',
  },
  {
    name: 'card with a ratio image',
    component: 'Card',
    props: { image: { src: '/studio.jpg', alt: 'A desk', ratio: '1/1' }, pad: 'sm' },
    children: 'Body',
  },
  {
    name: 'card heading level 3 with icon and meta',
    component: 'Card',
    props: { heading: 'Usage', meta: '3 of 10', description: 'This month.' },
    icon: true,
    children: 'Body',
  },
  { name: 'card heading level 2', component: 'Card', props: { heading: 'Usage', headingLevel: 2, pad: 'lg' }, children: 'Body' },
  {
    name: 'card header and footer slots',
    component: 'Card',
    props: { heading: 'Ignored', hover: true, class: 'max-w-sm' },
    slots: { header: 'Custom header', footer: 'Footer' },
    children: 'Body',
  },
  { name: 'card clickable', component: 'Card', props: { title: 'Open', onclick: noop }, children: 'Body' },

  // Badge
  ...tones.map((tone) => ({
    name: `badge tone ${tone}`,
    component: 'Badge' as const,
    props: { tone, dot: true },
    children: 'New',
  })),
  { name: 'badge plain', component: 'Badge', children: 'New' },
  { name: 'badge size md', component: 'Badge', props: { size: 'md', class: 'ms-2' }, children: 'New' },

  // Accordion
  {
    name: 'accordion with two items',
    component: 'Accordion',
    items: [
      { component: 'AccordionItem', props: { id: 'refunds', title: 'Refunds' }, children: 'Within 30 days.' },
      { component: 'AccordionItem', props: { id: 'shipping', title: 'Shipping' }, children: 'Two days.' },
    ],
  },
  {
    name: 'accordion multiple and flush',
    component: 'Accordion',
    props: { multiple: true, flush: true, class: 'mt-4' },
    items: [
      { component: 'AccordionItem', props: { id: 'a', title: 'A', class: 'x' }, children: 'One' },
      { component: 'AccordionItem', props: { id: 'b', title: 'B' }, children: 'Two' },
    ],
  },
  { name: 'accordion item alone', component: 'AccordionItem', props: { id: 'refunds', title: 'Refunds' }, children: 'Within 30 days.' },

  // Field
  {
    name: 'field with a wired control and a hint',
    component: 'Field',
    props: { label: 'Email', hint: 'Replies go to this address.' },
    wired: true,
  },
  {
    name: 'field with an error, required',
    component: 'Field',
    props: { label: 'Email', hint: 'Hidden by the error.', error: 'Enter an email.', required: true, class: 'w-full' },
    wired: true,
  },
  { name: 'field with its own id and a hidden label', component: 'Field', props: { id: 'email', label: 'Email', labelHidden: true }, wired: true },
  { name: 'field group', component: 'Field', props: { label: 'Plan', group: true, required: true }, wired: true },
  { name: 'field without a label', component: 'Field', props: {}, wired: true },

  // Label
  { name: 'label', component: 'Label', props: { for: 'email' }, children: 'Email' },
  { name: 'label required with a hint', component: 'Label', props: { for: 'email', required: true, hint: 'optional', class: 'mb-1' }, children: 'Email' },

  // Input
  { name: 'input plain', component: 'Input', props: {} },
  {
    name: 'input with label, error and required',
    component: 'Input',
    props: { label: 'Name', name: 'name', required: true, error: 'Enter a name.' },
  },
  {
    name: 'input with hint and caller ids',
    component: 'Input',
    props: { label: 'Slug', hint: 'Lowercase.', describedBy: 'help-1 help-2', mono: true, value: 'my-site', class: 'w-64' },
  },
  {
    name: 'input email, disabled, own id and rest attributes',
    component: 'Input',
    props: { id: 'email', type: 'email', placeholder: 'you@example.com', disabled: true, autocomplete: 'email', 'aria-label': 'Email' },
  },
  { name: 'input no assistant', component: 'Input', props: { label: 'Card', noAI: true } },

  // Textarea
  { name: 'textarea plain', component: 'Textarea', props: {} },
  {
    name: 'textarea with label, hint and limits',
    component: 'Textarea',
    props: { label: 'Message', name: 'message', hint: 'Up to 500 characters.', maxlength: 500, rows: 6, value: 'Hello' },
  },
  {
    name: 'textarea with an error, fixed size and every flag',
    component: 'Textarea',
    props: {
      id: 'note',
      label: 'Note',
      error: 'Too long.',
      required: true,
      disabled: true,
      readonly: true,
      resize: false,
      mono: true,
      noAI: true,
      placeholder: 'Write...',
      class: 'mt-2',
    },
  },

  // Checkbox
  { name: 'checkbox bare', component: 'Checkbox', props: {} },
  { name: 'checkbox with label and hint', component: 'Checkbox', props: { label: 'Send me news', name: 'news', hint: 'One email a month.' } },
  { name: 'checkbox checked', component: 'Checkbox', props: { label: 'Agree', checked: true, required: true, value: 'yes' } },
  { name: 'checkbox indeterminate', component: 'Checkbox', props: { label: 'All', indeterminate: true } },
  {
    name: 'checkbox with description, error and icon',
    component: 'Checkbox',
    props: { label: 'Alerts', description: 'By email.', error: 'Pick one.', size: 'lg', class: 'mt-2' },
    icon: true,
  },
  { name: 'checkbox with description only', component: 'Checkbox', props: { label: 'Alerts', description: 'By email.', size: 'sm' } },
  {
    name: 'checkbox card checked',
    component: 'Checkbox',
    props: { variant: 'card', label: 'Pro', description: 'For teams.', checked: true, id: 'pro' },
  },
  { name: 'checkbox card disabled with icon only', component: 'Checkbox', props: { variant: 'card', disabled: true, noAI: true }, icon: true },
  { name: 'checkbox hidden label', component: 'Checkbox', props: { label: 'Select row', labelHidden: true } },

  // FormMessage
  { name: 'form message danger', component: 'FormMessage', children: 'Could not send.' },
  { name: 'form message success', component: 'FormMessage', props: { tone: 'success', class: 'mt-2' }, children: 'Message sent.' },

  // Section
  { name: 'section plain', component: 'Section', children: 'Content' },
  {
    name: 'section with intro, footer and label',
    component: 'Section',
    props: { label: 'Pricing', height: 'tall' },
    slots: { intro: 'Intro', footer: 'Foot' },
    children: 'Content',
  },
  {
    name: 'section with an image and a dark overlay',
    component: 'Section',
    props: { image: { src: '/hero.jpg', alt: 'A field' }, overlay: 'dark', height: 'screen', class: 'mb-0' },
    children: 'Content',
  },
  { name: 'section with a light overlay', component: 'Section', props: { overlay: 'light' }, children: 'Content' },
  { name: 'section with an image and no alt', component: 'Section', props: { image: { src: '/hero.jpg' } }, slots: { intro: 'Intro' } },

  // Columns
  { name: 'columns auto', component: 'Columns', children: 'A' },
  ...([2, 3, 4] as const).map((max) => ({
    name: `columns max ${max}`,
    component: 'Columns' as const,
    props: { max, class: 'mt-4' },
    children: 'A',
  })),

  // Prose
  { name: 'prose', component: 'Prose', children: 'Text' },
  { name: 'prose with a class', component: 'Prose', props: { class: 'mx-auto' }, children: 'Text' },

  // Image
  ...ratios.map((ratio) => ({
    name: `image ratio ${ratio}`,
    component: 'Image' as const,
    props: { src: '/a.jpg', alt: 'A view', ratio },
  })),
  { name: 'image sized and eager', component: 'Image', props: { src: '/a.jpg', alt: '', width: 800, height: 600, loading: 'eager', class: 'mt-2' } },
  { name: 'image with a caption', component: 'Image', props: { src: '/a.jpg', alt: 'A view', caption: 'The view.', class: 'mt-2' } },
  { name: 'image with a caption and size', component: 'Image', props: { src: '/a.jpg', alt: 'A view', caption: 'The view.', width: 10, height: 10 } },
  { name: 'image with only a width', component: 'Image', props: { src: '/a.jpg', alt: 'A view', width: 10 } },

  // Quote
  { name: 'quote', component: 'Quote', children: 'It works.' },
  { name: 'quote with a source', component: 'Quote', props: { source: 'A customer', class: 'my-4' }, children: 'It works.' },

  // NavBar
  { name: 'navbar empty', component: 'NavBar', props: {} },
  {
    name: 'navbar with brand, links and action',
    component: 'NavBar',
    props: {
      brand: 'Acme',
      links: [
        { label: 'Home', href: '/', current: true },
        { label: 'About', href: '/about' },
        { label: 'Soon' },
      ],
      action: { label: 'Start', href: '/start' },
      label: 'Site',
      class: 'py-2',
    },
  },
  {
    name: 'navbar with a logo and a brand',
    component: 'NavBar',
    props: { brand: 'Acme', logo: { src: '/logo.svg', alt: 'Acme logo', width: 32, height: 32 } },
  },
  {
    name: 'navbar with a logo alone',
    component: 'NavBar',
    props: { logo: { src: '/logo.svg', alt: 'Acme', width: 64, height: 32 } },
  },

  // Footer
  { name: 'footer empty', component: 'Footer', props: {} },
  {
    name: 'footer with a note, links and every network',
    component: 'Footer',
    props: {
      links: [{ label: 'Privacy', href: '/privacy' }, { label: 'Made here' }],
      social: [
        { network: 'x', href: 'https://x.com/acme' },
        { network: 'linkedin', href: 'https://linkedin.com/company/acme' },
        { network: 'github', href: 'https://github.com/acme' },
        { network: 'instagram', href: 'https://instagram.com/acme' },
        { network: 'facebook', href: 'https://facebook.com/acme' },
        { network: 'youtube', href: 'https://youtube.com/@acme' },
        { network: 'mastodon', href: 'https://mastodon.social/@acme' },
      ],
      label: 'Legal',
      socialLabel: 'Profiles',
      class: 'mt-8',
    },
    slots: { note: 'Acme, 1 Main St.' },
  },

  // Gallery
  { name: 'gallery empty', component: 'Gallery', props: { images: [] } },
  {
    name: 'gallery grid',
    component: 'Gallery',
    props: {
      images: [
        { src: '/1.jpg', alt: 'One', caption: 'First' },
        { src: '/2.jpg', alt: '' },
      ],
    },
  },
  {
    name: 'gallery row',
    component: 'Gallery',
    props: { images: [{ src: '/1.jpg', alt: 'One' }], layout: 'row', label: 'Photos', class: 'mt-4' },
  },
];
