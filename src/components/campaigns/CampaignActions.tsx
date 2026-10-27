import React from 'react';
import { Button } from '../common/Button';
import { Dropdown } from '../common/Dropdown';
import { Menu } from '../common/Menu';
import { MenuItem } from '../common/MenuItem';

interface CampaignActionsProps {
  campaign: any;
  onEdit?: () => void;
  onPause?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

export function CampaignActions({ campaign, onEdit, onPause, onDelete, onDuplicate }: CampaignActionsProps) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button variant="secondary" size="sm" onClick={onEdit}>Editar</Button>
      <Dropdown trigger={<Button variant="ghost" size="sm">⋮</Button>} align="right">
        <Menu>
          <MenuItem onClick={onDuplicate}>Duplicar campanha</MenuItem>
          <MenuItem onClick={onPause}>{campaign?.status === 'active' ? 'Pausar' : 'Ativar'}</MenuItem>
          <MenuItem onClick={onDelete} danger>Deletar</MenuItem>
        </Menu>
      </Dropdown>
    </div>
  );
}
