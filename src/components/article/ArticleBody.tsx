import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { remarkHeadingIds } from '@/lib/article';
import { CopyCode } from './CopyCode';

async function ArticleImage({ src, alt }: { src: string; alt: string }) {
  // Local assets only: no arbitrary remote fetching while rendering.
  if (!src.startsWith('/') || src.startsWith('//'))
    return <a href={src}>{alt || 'View image'}</a>;
  const publicRoot = path.join(process.cwd(), 'public');
  const target = path.resolve(publicRoot, '.' + src);
  if (!target.startsWith(publicRoot + path.sep)) return null;
  const dimensions = await sharp(await readFile(target)).metadata();
  return (
    <Image
      src={src}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      sizes="(max-width: 800px) 100vw, 740px"
      className="article-image"
    />
  );
}
export function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="article-prose">
      <Markdown
        skipHtml
        remarkPlugins={[remarkGfm, remarkHeadingIds]}
        components={{
          h2: ({ id, children }) => (
            <h2 id={id} tabIndex={-1}>
              <a href={`#${id}`}>
                {children}
                <span className="heading-anchor" aria-hidden="true">
                  #
                </span>
              </a>
            </h2>
          ),
          h3: ({ id, children }) => (
            <h3 id={id} tabIndex={-1}>
              <a href={`#${id}`}>
                {children}
                <span className="heading-anchor" aria-hidden="true">
                  #
                </span>
              </a>
            </h3>
          ),
          h4: ({ id, children }) => (
            <h4 id={id} tabIndex={-1}>
              {children}
            </h4>
          ),
          h5: ({ id, children }) => (
            <h5 id={id} tabIndex={-1}>
              {children}
            </h5>
          ),
          h6: ({ id, children }) => (
            <h6 id={id} tabIndex={-1}>
              {children}
            </h6>
          ),
          pre: ({ children }) => <CopyCode>{children}</CopyCode>,
          table: ({ children }) => (
            <div
              className="table-scroll"
              tabIndex={0}
              role="region"
              aria-label="Project reference table"
            >
              <table>{children}</table>
            </div>
          ),
          img: ({ src, alt }) => (
            <ArticleImage src={String(src ?? '')} alt={alt ?? ''} />
          ),
          a: ({ href, children, title }) => {
            if (
              typeof children === 'string' &&
              children.startsWith('video:') &&
              href?.startsWith('/') &&
              /\.(mp4|webm)$/.test(href)
            ) {
              return (
                <span className="article-video">
                  <video
                    controls
                    preload="metadata"
                    aria-label={children.slice(6).trim()}
                  >
                    <source src={href} />
                    {title?.endsWith('.vtt') && (
                      <track
                        kind="captions"
                        src={title}
                        srcLang="en"
                        label="English"
                        default
                      />
                    )}
                    Your browser does not support embedded video.{' '}
                    <a href={href}>Download video</a>
                  </video>
                  <span>{children.slice(6).trim()}</span>
                </span>
              );
            }
            return <a href={href}>{children}</a>;
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
