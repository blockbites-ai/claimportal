interface CenteredContainerProps {
  children: React.ReactNode;
}

export function CenteredContainer({ children }: CenteredContainerProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
