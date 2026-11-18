<script setup lang="ts">
/**
 * The foot of a site: a note, a row of links and the site's profiles
 * elsewhere. A profile is a plain link named for its network, never a
 * network's script or embed, and `rel="me"` lets the network confirm the site
 * is the profile's owner.
 */
import { SOCIAL_NETWORKS, type SocialNetwork } from '../types';

defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    /** With no `href` a label is drawn as text. */
    links?: { label: string; href?: string }[];
    social?: { network: SocialNetwork; href: string }[];
    /** The name of the links' landmark for a screen reader. */
    label?: string;
    /** The name of the list of profiles for a screen reader. */
    socialLabel?: string;
  }>(),
  { links: () => [], social: () => [], label: 'Footer', socialLabel: 'Social' },
);

const LINK = 'text-muted underline-offset-4 transition-colors hover:text-fg hover:underline';
const ROW = 'm-0 flex list-none flex-wrap gap-x-site-md gap-y-site-xs p-0';
</script>

<template>
  <footer
    :class="['grid gap-site-md border-t border-line pt-site-md text-sm text-muted', $attrs.class]"
  >
    <div v-if="$slots.note" class="[&_a:not([class])]:underline [&_p:not([class])+p]:mt-site-xs">
      <slot name="note" />
    </div>
    <nav v-if="links.length > 0" :aria-label="label">
      <ul :class="ROW">
        <li v-for="(link, i) in links" :key="i" class="shrink-0">
          <a v-if="link.href" :class="LINK" :href="link.href">{{ link.label }}</a>
          <span v-else>{{ link.label }}</span>
        </li>
      </ul>
    </nav>
    <!-- A list without its markers loses the list role in WebKit, and with it
         its name, so the role is stated. -->
    <ul v-if="social.length > 0" role="list" :class="ROW" :aria-label="socialLabel">
      <li v-for="(profile, i) in social" :key="i" class="shrink-0">
        <a :class="LINK" :href="profile.href" rel="me">{{ SOCIAL_NETWORKS[profile.network] }}</a>
      </li>
    </ul>
  </footer>
</template>
