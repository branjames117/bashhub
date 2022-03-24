import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EVENT } from '../../utils/queries';

import Auth from '../../utils/auth';

import Creator from './Creator';
import Loading from '../Loading';
import { useEffect, useState } from 'react';

export default function Editor() {
  const { slug } = useParams();
  const [event, setEvent] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { data: userData } = Auth.getProfile();

  const { data, loading } = useQuery(QUERY_EVENT, {
    variables: { slug: slug },
  });

  if (!loading) {
    if (data.event && data.event.ownerName !== userData.username) {
      window.location.assign(`/bash/e/${slug}`);
    }
  }

  // structure the event data the way we need it
  useEffect(() => {
    if (!loading) {
      const {
        event: { attendees, comments, subevents, __typename, _id, ...event },
      } = data;

      // restructure the data so we can work with the existing Creator logic
      event.ownerId = Auth.getProfile().data._id;
      const tags = [];

      event.tags.forEach((tag) => {
        tags.push(tag.name);
      });

      event.tags = tags;
      event.eventParent = event?.eventParent._id;

      setEvent(event);
      setLoaded(true);
    }
  }, [data, loading]);

  return loading || !loaded || !data?.event ? (
    <Loading />
  ) : (
    <Creator variant='editor' _id={data.event._id} event={event} />
  );
}
