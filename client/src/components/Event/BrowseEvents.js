import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { QUERY_EVENTS } from '../../utils/queries';

import {
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Banner from '../User/Banner';
import Loading from '../Loading';

import DateFormatter from '../../utils/dateFormat';
import Filters from './Filters';

const options = [
  'Party',
  'Festival',
  'Concert',
  'Convention',
  'Game Night',
  'Movie Night',
  'Date Night',
  'Pub Crawl',
  'Other',
];

export default function BrowseEvents() {
  const [events, setEvents] = useState([]);
  const [allChecked, setAllChecked] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [expiredEvents, setExpiredEvents] = useState([]);
  const [filteredExpiredEvents, setFilteredExpiredEvents] = useState([]);
  const [filters, setFilters] = useState([...options, 'Expired']);
  const { data, loading } = useQuery(QUERY_EVENTS);

  const handleChange = (e) => {
    const { name, checked } = e.target;

    if (checked) {
      setFilters([...filters, name]);
    } else {
      const filteredFilters = filters.filter((filter) => filter !== name);
      setFilters(filteredFilters);
    }
  };

  const handleCheckAll = (e) => {
    if (allChecked) {
      setFilters([]);
    } else {
      setFilters([...options, 'Expired']);
    }
    setAllChecked(!allChecked);
  };

  useEffect(() => {
    if (!loading) {
      const { events } = data;
      setEvents(events);

      const oldEvents = events.filter(
        (event) => event.startDate - 0 < Date.now()
      );

      setExpiredEvents(oldEvents);
      setFilteredExpiredEvents(oldEvents);

      const comingEvents = events.filter(
        (event) => event.startDate - 0 > Date.now()
      );
      setFilteredEvents(comingEvents);
    }
  }, [data, loading]);

  useEffect(() => {
    let updateEvents = events.filter(
      (event) =>
        filters.includes(event.eventType) && event.startDate - 0 > Date.now()
    );

    let updateExpiredEvents = expiredEvents.filter((event) =>
      filters.includes(event.eventType)
    );

    setFilteredEvents(updateEvents);
    setFilteredExpiredEvents(updateExpiredEvents);
  }, [expiredEvents, events, filters]);

  return loading || !events ? (
    <Loading />
  ) : (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        mb: 25,
      }}
    >
      <Typography variant='h5'>Browse Events</Typography>

      <Accordion sx={{ my: 3 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='Filter Options'
          id='filterOptions'
        >
          <Typography>Filter Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Filters
            handleChange={handleChange}
            handleCheckAll={handleCheckAll}
            options={options}
            filters={filters}
            allChecked={allChecked}
            setAllChecked={setAllChecked}
          />
        </AccordionDetails>
      </Accordion>

      {filteredEvents.map((event) => (
        <Banner
          key={event._id}
          _id={event._id}
          slug={event.slug}
          hero={event.hero}
          name={event.name}
          eventType={event.eventType}
          startDate={DateFormatter.getDate(event.startDate)}
          startTime={DateFormatter.getTime(event.startTime)}
          endDate={DateFormatter.getDate(event.endDate)}
          endTime={DateFormatter.getTime(event.endTime)}
          location={event.location}
        />
      ))}

      {filters.includes('Expired') && (
        <>
          <Typography variant='h5' sx={{ mt: 3 }}>
            Expired Events
          </Typography>
          {filteredExpiredEvents.map((event) => (
            <Banner
              key={event._id}
              _id={event._id}
              slug={event.slug}
              hero={event.hero}
              name={event.name}
              eventType={event.eventType}
              startDate={DateFormatter.getDate(event.startDate)}
              startTime={DateFormatter.getTime(event.startTime)}
              endDate={DateFormatter.getDate(event.endDate)}
              endTime={DateFormatter.getTime(event.endTime)}
              location={event.location}
            />
          ))}
        </>
      )}
    </Paper>
  );
}
