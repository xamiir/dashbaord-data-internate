import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import {
  Breadcrumb as BreadcrumbComponent,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  links: {
    href?: string;
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
  }[];
}

export const Breadcrumb = ({ links, ...props }: BreadcrumbProps) => {
  return (
    <BreadcrumbComponent className="hidden md:flex" {...props}>
      <BreadcrumbList>
        <BreadcrumbItem>
          {links.map((link, index) => (
            <Fragment key={index}>
              <BreadcrumbLink asChild key={index} aria-disabled={link.disabled}>
                <Link
                  to={link?.href as string}
                  className="flex items-center gap-2"
                >
                  {link.icon}
                  {link.label}
                </Link>
              </BreadcrumbLink>
              {index < links.length - 1 && <ChevronRight className="h-4 w-4" />}
            </Fragment>
          ))}
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbComponent>
  );
};
