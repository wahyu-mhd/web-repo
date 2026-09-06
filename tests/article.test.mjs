import { test } from 'node:test';
import assert from 'node:assert/strict';
import { prepareArticle, readArticle } from '../src/lib/article.ts';
test('draft comments and fenced code never enter the contents', () => {
  const result = prepareArticle(
    '## Visible\n\n<!--\n## Secret draft\nprivate notes\n-->\n\n~~~sh\n## not a heading\n~~~\n\n### Child',
  );
  assert.deepEqual(
    result.toc.map((e) => e.title),
    ['Visible', 'Child'],
  );
  assert.ok(!result.markdown.includes('Secret draft'));
  assert.ok(!result.markdown.includes('private notes'));
});
test('stable explicit anchors and duplicate headings remain unique', () => {
  const result = prepareArticle(
    '## New requirements title {#requirements}\n## A heading\n### A heading\n## A heading-2\n## **Formatted** heading',
  );
  assert.deepEqual(
    result.toc.map((e) => e.id),
    [
      'requirements',
      'a-heading',
      'a-heading-2',
      'a-heading-2-2',
      'formatted-heading',
    ],
  );
  assert.equal(result.toc[0].title, 'New requirements title');
});
test('setext headings are included, h1 is excluded from contents', () => {
  assert.deepEqual(
    prepareArticle('# Title\n\nSection\n-------\n\n#### Detail').toc.map(
      (e) => [e.title, e.depth],
    ),
    [
      ['Section', 2],
      ['Detail', 4],
    ],
  );
});
test('existing public project articles have requirements and no draft leaks', async () => {
  for (const slug of [
    'chunkvault-safevault',
    'wazuh-soc-lab',
    'cicd-automation',
  ]) {
    const article = await readArticle(slug);
    assert.ok(
      article.toc.some((e) => e.id === 'requirements'),
      slug,
    );
    assert.ok(!article.markdown.includes('AUTHORING DRAFT'), slug);
    assert.equal(
      new Set(article.toc.map((e) => e.id)).size,
      article.toc.length,
    );
  }
});
test('article loader rejects traversal', async () => {
  await assert.rejects(readArticle('../private'), /Invalid article slug/);
});
