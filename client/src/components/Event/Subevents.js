import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { QUERY_SUBEVENTS } from '../../utils/queries';

import Loading from '../Loading';

export default function Subevent({ _id }) {
  const [subevents, setSubevents] = useState([]);
  const { data, loading } = useQuery(QUERY_SUBEVENTS, {
    variables: { _id: _id },
  });

  useEffect(() => {
    if (data?.subevents) {
      const { subevents } = data;
      setSubevents(subevents);
    }
  }, [loading, data]);

  console.log('subevents', subevents);

  return !subevents ? (
    <Loading variant='contained' />
  ) : (
    <>
      {subevents.map((subevent) => (
        <div key={subevent._id}>{subevent.name}</div>
      ))}
    </>
  );
}
