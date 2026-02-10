export function SearchInput({ value, onChange, placeholder = 'Cari...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input pl-24"
      />
    </div>
  );
}

