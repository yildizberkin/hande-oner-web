import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  const tokenPattern =
    /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\))/g;

  return text.split(tokenPattern).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }

    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)$/);
    if (link) {
      const [, label, href] = link;
      const external = href.startsWith("http");
      return (
        <a
          key={index}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
        >
          {label}
        </a>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

export function renderMarkdown(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const nodes: ReactNode[] = [];
  let list: string[] = [];

  const flushList = () => {
    if (!list.length) return;
    nodes.push(
      <ul key={`list-${nodes.length}`}>
        {list.map((item, index) => (
          <li key={index}>{renderInline(item)}</li>
        ))}
      </ul>,
    );
    list = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      return;
    }

    if (line.startsWith("- ")) {
      list.push(line.slice(2));
      return;
    }

    flushList();

    if (line.startsWith("### ")) {
      nodes.push(<h3 key={nodes.length}>{renderInline(line.slice(4))}</h3>);
      return;
    }

    if (line.startsWith("## ")) {
      nodes.push(<h2 key={nodes.length}>{renderInline(line.slice(3))}</h2>);
      return;
    }

    nodes.push(<p key={nodes.length}>{renderInline(line)}</p>);
  });

  flushList();
  return nodes;
}
