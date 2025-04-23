import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href: string;
  }>;
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={item.href} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />}
            <Link
              to={item.href}
              className={`text-sm ${
                index === items.length - 1
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
} 