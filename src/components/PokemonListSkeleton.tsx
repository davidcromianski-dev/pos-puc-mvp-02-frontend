import { Skeleton } from "./ui/skeleton";

export function PokemonListSkeleton() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="relative">
          <Skeleton className="w-16 h-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}
