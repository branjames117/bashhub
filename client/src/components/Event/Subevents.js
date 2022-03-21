import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { QUERY_SUBEVENTS } from '../../utils/queries';

import Loading from '../Loading';

const sortSubevents = (input) => {
  // find out how many unique dates there are among subevents and create an array containing each unique date
  const [...subevents] = input;
  const dates = [];

  // subevents.sort((a, b) => b.startDate - a.startDate);

  subevents.forEach((e) =>
    dates.push(new Date(e.startDate - 0).toString().slice(0, 15))
  );
  subevents.sort((a, b) => {
    return (
      new Date(a.startDate - 0).getDate() - new Date(b.startDate - 0).getDate()
    );
  });

  console.log(dates);

  // if the array is only one date long, return the array

  // if the array is more than one date long, create now a 2-dimensional array, sorting each subevent into its proper array position

  // then return the newly sorted 2-dimensional array

  console.log(subevents);
  return subevents;
};

export default function Subevent({ _id }) {
  const [subevents, setSubevents] = useState([]);
  const { data, loading } = useQuery(QUERY_SUBEVENTS, {
    variables: { _id: _id },
  });

  useEffect(() => {
    if (data?.subevents) {
      if (data?.subevents.length > 0) {
        setSubevents(sortSubevents(data.subevents));
      }
    }
  }, [loading, data]);

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
