'use client'

import { useEffect } from 'react';
import useCheckUrl from '@/hooks/useCheckUrl';
import { BreadCrumb } from '@/types/breadCrumb';

interface CheckUrlClientProps {
  breadCrumbs: BreadCrumb[];
}

const CheckUrl: React.FC<CheckUrlClientProps> = ({ breadCrumbs }) => {
  useCheckUrl(breadCrumbs);

  return null;
};

export default CheckUrl;