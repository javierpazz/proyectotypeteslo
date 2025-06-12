import { FC, useState, useRef, useEffect } from 'react';
import { IProduct } from '../../interfaces';

interface ProductSelectorProps {
  onSelectPro: (product: IProduct) => void;
  productss: IProduct[];
}


// export const ProductSelector = ( {onSelectPro,productss} ) => {
export const ProductSelector: FC<ProductSelectorProps> = ({ onSelectPro, productss }) => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(productss);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  
  useEffect(() => {
    inputRef.current?.focus(); // Focus automático
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setSearch(value);
    const result = productss.filter(p =>
      p.codPro.includes(value) || p.title.toLowerCase().includes(value.toLowerCase())
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
      onSelectPro(filtered[highlightedIndex]);
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
      <label htmlFor="codeInput">Código de Diligencia:</label>
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
              key={p.codigoPro}
              onClick={() => onSelectPro(p)}
              style={{
                padding: '6px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
                backgroundColor: index === highlightedIndex ? '#cce5ff' : '#fff'
              }}
            >
              <strong>{p.codPro}</strong> - {p.title} - Valor - ${p.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}





