import { Chip } from '@mui/material';
import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { manipulateFilterChip } from '../../Redux/FilterChipData/FilterChipData-Action';
import {
  ADD_ITEM_IN_FILTER,
  REMOVE_ITEM_FROM_FILTER,
} from '../../Redux/FilterChipData/FilterChipData-Constants';

const FilterChip = ({ FilterElements, index, id }) => {
  const [isSelected, setIsSelected] = useState(false);

  const dispatch = useDispatch();
  const AddedFilterItemsInReducer = useSelector((state) => state.ReducerFilterChip.filterItems);

  const handleAddToFilterChip = (FilterElements) => {
    if (!AddedFilterItemsInReducer.find((item) => item === FilterElements.label)) {
      dispatch(manipulateFilterChip(ADD_ITEM_IN_FILTER, FilterElements));
    } else {
    }
    setIsSelected(true);
  };
  const handleRemoveFromFilterChip = (FilterElements) => {
    dispatch(manipulateFilterChip(REMOVE_ITEM_FROM_FILTER, FilterElements.id));
    setIsSelected(false);
  };

  return (
    <>
      {isSelected ? (
        <Chip
          // key={index}
          label={FilterElements.label}
          onClick={() => {
            handleRemoveFromFilterChip(FilterElements);
          }}
          color="primary"
          sx={{}}
        />
      ) : (
        <Chip
          // key={index}
          label={FilterElements.label}
          onClick={() => {
            handleAddToFilterChip(FilterElements);
          }}
          variant="outlined"
        />
      )}
    </>
  );
};

export default memo(FilterChip);
