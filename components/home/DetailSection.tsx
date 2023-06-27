import styles from '../../styles/detail.module.scss';
import useSWR from 'swr';
import { CURRENT_STORE_KEY } from '@/hooks/useCurrentStore';
import { useState } from 'react';
import DetailContent from './DetailContent';
import DetailHeader from './DetailHeader';

const DetailSection = () => {
  const { data: currentStore } = useSWR(CURRENT_STORE_KEY);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`${styles.detailSection} ${
        currentStore ? styles.selected : ''
      } ${expanded ? styles.expanded : ''}`}
    >
      <DetailHeader
        currentStore={currentStore}
        expanded={expanded}
        onClickArrow={() => setExpanded(!expanded)}
      />
      <DetailContent currentStore={currentStore} expanded={expanded} />
    </div>
  );
};
export default DetailSection;
