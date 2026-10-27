import React from 'react';

interface AvatarProps {
  name?: string;
  src?: string;
  size?: number;
}

export function Avatar({ name, src, size = 36 }: AvatarProps) {
  const initials = name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '?';
  if (src) return <img src={src} alt={name} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }} />;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: '#2563eb', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.35, fontWeight: 700,
    }}>
      {initials}
    </div>
  );
}
