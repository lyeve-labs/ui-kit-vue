# ui-kit-vue

Vue 3 components drawn from [ui-kit](https://github.com/lyeve-labs/ui-kit),
the Svelte 5 component library behind LyEve. Each component renders the same
markup and classes as its Svelte original, so the kit's compiled stylesheet,
`site.css`, styles a Vue page the way it styles a Svelte one.

Nothing is published yet. The components are the ones a page for visitors
draws with: SectionHeading, Button, Card, Badge, Accordion, AccordionItem,
Field, Label, Input, Textarea, Checkbox, FormMessage, Section, Columns,
Prose, Image, Quote, NavBar, Footer and Gallery. Each renders on the server
with no script and no inline handler, and a parity test renders every case
in its corpus through the Svelte original and the Vue port and fails on any
difference in the markup.

## Use

```ts
import { Button, Card } from '@lyeve-labs/ui-kit-vue';
import '@lyeve-labs/ui-kit-vue/site.css';
```

`site.css` is the kit's own stylesheet, copied from the ui-kit release the
parity test holds to. The package has no runtime dependency besides Vue
3.5, which it needs for `useId`.

A page put together from several server renders gives each app its own
`app.config.idPrefix`, so the ids and accordion names of one render never
collide with another's.

## How the props map

Props keep the Svelte names and defaults. A snippet is a slot, and Field's
default slot receives the control's wiring (`id`, `describedBy`, `invalid`,
`labeledBy`) as slot props. A bindable value is a model: `v-model:value` on
Input and Textarea, `v-model:checked` and `v-model:indeterminate` on
Checkbox. A callback prop is an event: `@click` and `@keydown` on Card,
`@change` on Checkbox, `@input` and `@blur` on Textarea.

Button and Input pass every attribute they do not name to the element the
original spreads its rest props onto: the button or link, and the input.
Every other component takes `class` and nothing else, as its original does.

## Left out

These need the kit's client machinery and are not ported. A control renders
as the original does when no form assistant surrounds it.

- Button: `hint`, and the tooltip it shows on hover and focus.
- Input, Textarea and Checkbox: the form assistant's suggestion state and its
  accept and reject buttons. `noAI` still marks the control `data-no-ai`.

## Branches

`main` holds tagged releases, and `dev` is where work lands. Branch from
`dev` and open pull requests against `dev`.

## License

MIT, see [LICENSE](LICENSE).
