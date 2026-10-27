import React from 'react';
import { Avatar } from '../common/Avatar';
import { formatDate } from '../../utils/formatDate';

export function ActivityItem({ activity }: { activity: any }) {
  return (
    <div style={{ display: 'flex', gap: 12, paddingBottom: 12, borderBottom: '1px solid #f3f4f6', marginBottom: 12 }}>
      <Avatar name={activity.user} size={32} />
      <div>
        <p style={{ fontSize: 14 }}><strong>{activity.user}</strong> {activity.action}</p>
        <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{formatDate(activity.time)}</p>
      </div>
    </div>
  );
}
