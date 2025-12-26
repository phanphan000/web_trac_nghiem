export default function DropdownItem({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
          relative px-5 py-2 text-left
          hover:bg-gray-100/60
          overflow-hidden
          group/item
        "
    >
      {children}
      <span
        className="
            absolute left-0 bottom-0
            h-[2px] w-full
            bg-[var(--color-secondary)]
            scale-x-0
            origin-left
            transition-transform duration-300
            group-hover/item:scale-x-100
          "
      />
    </button>
  );
}
