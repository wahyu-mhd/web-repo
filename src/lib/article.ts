import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import type { Root, RootContent } from 'mdast';

export interface TocEntry {
  id: string;
  title: string;
  depth: number;
}
type TextNode = {
  type: string;
  value?: string;
  alt?: string | null;
  children?: TextNode[];
};
export function nodeText(node: TextNode): string {
  return node.value ?? node.alt ?? node.children?.map(nodeText).join('') ?? '';
}
export function assignHeadingIds(tree: Root): TocEntry[] {
  const entries: TocEntry[] = [];
  const used = new Set<string>();
  function walk(nodes: RootContent[]) {
    for (const node of nodes) {
      if (node.type === 'heading') {
        const text = nodeText(node);
        const explicit = text.match(/\s*\{#([a-z][a-z0-9-]*)\}$/);
        if (explicit) {
          const last = node.children.at(-1);
          if (last?.type === 'text')
            last.value = last.value.replace(/\s*\{#[a-z][a-z0-9-]*\}$/, '');
        }
        const title = nodeText(node);
        const base =
          explicit?.[1] ||
          title
            .toLowerCase()
            .normalize('NFKD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-') ||
          'section';
        let id = base;
        let count = 2;
        while (used.has(id)) id = base + '-' + count++;
        used.add(id);
        node.data = {
          ...node.data,
          hProperties: { ...node.data?.hProperties, id },
        };
        if (node.depth >= 2 && node.depth <= 6)
          entries.push({ id, title, depth: node.depth });
      }
      if ('children' in node && node.type !== 'heading')
        walk(node.children as RootContent[]);
    }
  }
  walk(tree.children);
  return entries;
}
export function remarkHeadingIds() {
  return (tree: Root) => {
    assignHeadingIds(tree);
  };
}
export function prepareArticle(source: string) {
  // Authoring comments are removed before parsing, so drafts never reach HTML or the TOC.
  const markdown = source.replace(/<!--[\s\S]*?-->/g, '').trim();
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown);
  return { markdown, toc: assignHeadingIds(tree) };
}
export async function readArticle(slug: string) {
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error('Invalid article slug');
  const source = await readFile(
    path.join(process.cwd(), 'content/projects', slug + '.md'),
    'utf8',
  );
  return prepareArticle(source);
}
