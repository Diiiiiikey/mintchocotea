import { getUserInfo } from 'apis/api/user';
import { useState, useEffect } from 'react';

export const getCurrentMemberFn = () => {
  const [currentMemberInfo, setCurrentMemberInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const id = localStorage.getItem('memberId');

  useEffect(() => {
    const fetch = async () => {
      if (id === null) {
        setLoading(false);
        return { currentMemberInfo, loading };
      } else {
        const { data, status } = await getUserInfo(id);
        if (status < 300) {
          setCurrentMemberInfo(data.data);
          setLoading(false);
        }
      }
    };
    fetch();
  }, [setCurrentMemberInfo, setLoading]);
  return { currentMemberInfo, loading };
};

export const getMemberInfoFn = id => {
  const [currentMemberInfo, setCurrentMemberInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, status } = await getUserInfo(id);
      if (status < 300) {
        setCurrentMemberInfo(data.data);
        setLoading(false);
      }
    };
    fetch();
  }, [setCurrentMemberInfo, setLoading]);
  return { currentMemberInfo, loading };
};

export const getMemberRoleFn = () => {
  const [currentMemberRole, setCurrentMemberRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const memberId = localStorage.getItem('memberId');
      if (memberId === null) {
        setCurrentMemberRole(null);
        setLoading(false);
        return;
      }
      const { data, status } = await getUserInfo(memberId);
      if (status < 300) {
        if (status < 300) {
          setCurrentMemberRole(data.data.roles[0]);
          setLoading(false);
        }
      }
    };
    fetch();
  }, [setCurrentMemberRole, setLoading]);
  return { currentMemberRole, loading };
};
