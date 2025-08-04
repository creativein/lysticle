interface TabButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export function TabButton({ children, isActive, onClick }: TabButtonProps) {
  return (
    <button
      className={`
        whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
        ${isActive 
          ? 'border-violet-500 text-violet-600' 
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
