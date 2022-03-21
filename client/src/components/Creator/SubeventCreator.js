import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EVENT } from '../../utils/queries';

import Auth from '../../utils/auth';

import Creator from './Creator';
import Loading from '../Loading';

export default function SubeventCreator() {
  const { slug } = useParams();
  const { data: userData } = Auth.getProfile();

  const { data, loading } = useQuery(QUERY_EVENT, {
    variables: { slug: slug },
  });

  if (!loading) {
    if (data.event && data.event.ownerId !== userData._id) {
      window.location.assign(`/bash/e/${slug}`);
    }
  }

  return loading || !data?.event ? (
    <Loading />
  ) : (
    <Creator variant='subevent' _id={data.event._id} />
  );
}
