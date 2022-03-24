import { FormGroup, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { pink } from '@mui/material/colors';

export default function Filters({
  options,
  handleChange,
  handleCheckAll,
  filters,
  allChecked,
  setAllChecked,
}) {
  return (
    <FormGroup>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <FormControlLabel
            control={
              <Checkbox
                name='Expired'
                onChange={handleChange}
                checked={filters.includes('Expired')}
                sx={{
                  color: pink[800],
                  '&.Mui-checked': {
                    color: pink[600],
                  },
                }}
              />
            }
            label='Expired'
          />
        </Grid>
        {options.map((option) => (
          <Grid key={option} item xs={6} sm={4} md={3} lg={2}>
            <FormControlLabel
              control={
                <Checkbox
                  name={option}
                  onChange={handleChange}
                  checked={filters.includes(`${option}`)}
                />
              }
              label={option}
            />
          </Grid>
        ))}
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={allChecked}
                name='Check All'
                onChange={handleCheckAll}
              />
            }
            label={`${allChecked ? 'Uncheck All' : 'Check All'}`}
          />
        </Grid>
      </Grid>
    </FormGroup>
  );
}
