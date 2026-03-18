import { FC, useState, useRef, useEffect } from 'react';
import { ICustomer } from '../../interfaces';

interface CustomerSelectorProps {
  onSelectCus: (customer: ICustomer) => void;
  customers: ICustomer[];
}


// export const CustomerSelector = ( {onSelectCus,customers} ) => {
export const CustomerSelector: FC<CustomerSelectorProps> = ({ onSelectCus, customers }) => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(customers);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  
  useEffect(() => {
    inputRef.current?.focus(); // Focus automático
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setSearch(value);
    const result = customers.filter(p =>
      p.codCus.includes(value) || p.nameCus.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(result);
    setHighlightedIndex(0); // Reset al buscar
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filtered.length === 0) return;

    if (e.key === 'ArrowDown') {
      setHighlightedIndex(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      onSelectCus(filtered[highlightedIndex]);
    }
  };

  // Scroll automático al elemento resaltado
  useEffect(() => {
    const listElement = listRef.current;
    if (listElement && listElement.children[highlightedIndex]) {
      listElement.children[highlightedIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [highlightedIndex]);

  return (
    <div style={{ padding: '10px' }}>
      <label htmlFor="codeInput">Código de Cliente:</label>
      <input
        id="codeInput"
        ref={inputRef}
        type="text"
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
        autoComplete="off"
      />
      {filtered.length > 0 && (
        <ul
          ref={listRef}
          style={{
            listStyle: 'none',
            padding: 0,
            border: '1px solid #ccc',
            maxHeight: '350px',
            overflowY: 'auto',
            margin: 0
          }}
        >
          {filtered.map((p, index) => (
            <li
              key={p.codCus}
              onClick={() => onSelectCus(p)}
              style={{
                padding: '6px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
                backgroundColor: index === highlightedIndex ? '#cce5ff' : '#fff'
              }}
            >
              <strong>{p.codCus}</strong> - {p.nameCus}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}





