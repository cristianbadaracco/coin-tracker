import { useState, useEffect } from "react";

import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useFilterStore } from "../../hooks/useFilterStore";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selected, theme) {
  return {
    fontWeight:
      selected.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const DolarSelect = () => {
  const theme = useTheme();
  const { dolar, allTypesOfDolars, toogleFilterAction } = useFilterStore();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (dolar) {
      setSelected(dolar);
    }
  }, [dolar]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    toogleFilterAction(value, "dolar");
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 120 }} size="small">
        <InputLabel id="filter-select-label">Filter</InputLabel>
        <Select
          labelId="filter-select-label"
          id="filter-select"
          multiple
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput label="Filter" />}
          MenuProps={MenuProps}
        >
          {allTypesOfDolars.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selected, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DolarSelect;
