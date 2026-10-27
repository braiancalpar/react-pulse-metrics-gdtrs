import React from 'react';
import { formatDate } from '../../utils/formatDate';

interface CampaignTimelineProps {
  campaign: any;
}

export function CampaignTimeline({ campaign }: CampaignTimelineProps) {
  const events = [
    { date: campaign.startDate, label: 'Início', icon: '<span className="material-icons" style={{fontSize:14}}>rocket_launch</span>' },
    { date: campaign.endDate, label: 'Término', icon: '<span className="material-icons" style={{fontSize:14}}>flag</span>' },
  ];
  return (
    <div style={{ padding: '16px 0' }}>
      {events.map(event => (
        <div key={event.label} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 20 }}>{event.icon}</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{event.label}</div>
            <div style={{ fontSize: 13, color: '#6b7280' }}>{formatDate(event.date)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
