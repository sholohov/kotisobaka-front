<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
})

const md = new MarkdownIt()
const rendered = computed(() => md.render(props.content || ''))
</script>

<template>
  <div
    class="markdown-viewer"
    v-html="rendered"
  />
</template>

<style lang="scss">
.markdown-viewer {

  font-weight: 400;
  color: var(--color-text-brown);

  h1 {
    font-size: 2rem;
    font-weight: 800;
    margin: 1em 0 0.5em;
    color: var(--color-pink-dark);

    &:first-child {
      margin-top: 0;
    }
  }

  h2 {
    font-size: 1.6rem;
    font-weight: 700;
    margin: 1em 0 0.5em;
    color: var(--color-pink-dark);

    &:first-child {
      margin-top: 0;
    }
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0.8em 0 0.4em;
    color: var(--color-pink-dark);

    &:first-child {
      margin-top: 0;
    }
  }

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0.6em 0 0.3em;
    color: var(--color-pink-dark);

    &:first-child {
      margin-top: 0;
    }
  }

  strong, b {
    font-weight: 700;
  }

  em, i {
    font-style: italic;
  }

  u {
    text-decoration: underline;
  }

  s, del {
    text-decoration: line-through;
    color: var(--color-gray);
  }

  ul, ol {
    margin: 0 0 1em 1.5em;
    padding: 0 0 0 1em;

    & li::marker {
      color: var(--color-pink-dark);
      font-weight: 700;
    }
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  li {
    margin: 0.3em 0;
  }

  blockquote {
    display: block;
    position: relative;
    color: var(--color-text-chocolate);

    font-weight: 700;
    margin: 3em 0;
    font-size: 20px;
    text-transform: uppercase;
    font-style: normal;
    background-color: var(--color-purple-light);
    padding: 1.5em 2em;
    border-radius: 24px;
    text-indent: 2em
  }

  a {
    color: var(--color-orange);
    text-decoration: none;

    &:hover {
      color: var(--color-orange-dark);
      text-decoration: underline;
    }
  }

  code {
    padding: 0.2em 0.4em;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 24px;
    color: var(--color-pink-dark);
  }

  pre {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 1em;
    border-radius: 6px;
    overflow-x: auto;
    margin: 1em 0;
    color: var(--color-pink-dark);

    code {
      background: none;
      padding: 0;
    }
  }

  img {
    max-width: 100%;
    border-radius: 24px;
    margin: 3em 0;
    display: block;
  }

  hr {
    margin: 1em 0;
    height: 2px;
    border: none;
    background-color: var(--color-beige-light);
    opacity: 0.5;
  }
}
</style>
