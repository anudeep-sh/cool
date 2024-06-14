const inputs = [
  {
    name: 'title',
    type: 'text',
    label: 'Title*',
    placeholder: 'Add title',
    required: true,
    errorMessage: 'This is a required field*',
  },
  {
    name: 'duration',
    type: 'float',
    min: '1',
    label: 'Duration*',
    placeholder: 'Add duration',
    required: true,
    errorMessage: 'Please enter a valid duration*',
  },
  {
    name: 'startDate',
    type: 'date',
    label: 'Start Date',
    // required: true,
    // errorMessage: 'This is a required field*',
  },
  {
    name: 'startTime',
    type: 'time',
    label: 'Start Time',
  },
];

export default inputs;
