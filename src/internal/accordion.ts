import type { InjectionKey } from 'vue';

/** What an Accordion hands its items: the name they share, unless several may stay open. */
export const ACCORDION: InjectionKey<{ readonly name: string | undefined }> = Symbol('accordion');
