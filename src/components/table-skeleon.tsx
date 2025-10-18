import { Skeleton } from "../ui/skeleton";

export default function TableSkeleton() {
  return (
    <div className="flex items-center space-x-4 mt-12">
      <div className="space-y-4 ml-4 mt-8">
        <Skeleton className="h-8 w-[1100px]" />
        <Skeleton className="h-8 w-[1100px]" />
        <Skeleton className="h-8 w-[1100px]" />
        <Skeleton className="h-8 w-[1100px]" />
        <Skeleton className="h-8 w-[1100px]" />
        <Skeleton className="h-8 w-[1100px]" />
        <Skeleton className="h-8 w-[1100px]" />
        <Skeleton className="h-8 w-[1100px]" />
        <Skeleton className="h-8 w-[1100px]" />
      </div>
    </div>
  );
}
