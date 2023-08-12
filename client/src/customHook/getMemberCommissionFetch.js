import { getCommissionsFn } from './getCommissionFetch';

export const getMemberCommissionFn = email => {
  const commissions = getCommissionsFn('commissionId', 10000);

  if (commissions) {
    return commissions.filter(el => el.memberEmail === email);
  }

  return;
};
