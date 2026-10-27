import React, { useState } from 'react';
import { Select } from '../common/Select';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export function SegmentBuilder({ onSave }: { onSave?: (rules: any[]) => void }) {
  const [rules, setRules] = useState<any[]>([]);
  const addRule = () => setRules(r => [...r, { field: '', operator: 'equals', value: '' }]);
  return (
    <div>
      <h4 style={{ fontWeight: 600, marginBottom: 12 }}>Construtor de segmento</h4>
      {rules.map((rule, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <Select value={rule.field} onChange={v => setRules(r => r.map((x, j) => j === i ? { ...x, field: v } : x))}
            options={[{ value: 'age', label: 'Idade' }, { value: 'city', label: 'Cidade' }, { value: 'purchases', label: 'Compras' }]} />
          <Input value={rule.value} onChange={e => setRules(r => r.map((x, j) => j === i ? { ...x, value: e.target.value } : x))} placeholder="Valor" />
          <button onClick={() => setRules(r => r.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 18 }}>×</button>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <Button variant="ghost" size="sm" onClick={addRule}>+ Adicionar regra</Button>
        <Button size="sm" onClick={() => onSave?.(rules)}>Salvar segmento</Button>
      </div>
    </div>
  );
}
