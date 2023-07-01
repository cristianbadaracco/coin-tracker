/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import PriceCard from "../../components/PriceCard";

import "./index.css";
import "../../index.css";

const defaultDolarFilters = ["oficial", "blue", "mep", "ccl", "qatar"];
const defaultCriptoFilters = ["buenbit", "lemoncash", "binance"];

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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const Dashboard = () => {
  const [dolarPrices, setDolarPrices] = useState([]);
  const [criptoPrices, setCriptoPrices] = useState([]);
  const [personName, setPersonName] = useState([]);

  const formatDolarPrices = (dolarPrices) => {
    let formatedDolarPrices = [];
    for (const [key, value] of Object.entries(dolarPrices)) {
      if (defaultDolarFilters.includes(key)) {
        formatedDolarPrices.push({
          name: key,
          value,
        });
      }
    }
    return formatedDolarPrices;
  };

  const formatCriptoPrices = (criptoPrices) => {
    const formatedCriptoPrices = [];
    for (const [key, values] of Object.entries(criptoPrices)) {
      if (defaultCriptoFilters.includes(key)) {
        formatedCriptoPrices.push({ name: key, value: values.totalBid });
      }
    }
    return formatedCriptoPrices;
  };

  useEffect(() => {
    const fetchDolarPrices = async () => {
      try {
        const response = await fetch("https://criptoya.com/api/dolar");
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const json = await response.json();
        setDolarPrices(formatDolarPrices(json));
      } catch (error) {
        console.log("Fetch dolar price failed: " + error);
      }
    };

    const fetchCriptoPrices = async () => {
      try {
        const response = await fetch("https://criptoya.com/api/usdt/ars/0.1");
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const json = await response.json();
        setCriptoPrices(formatCriptoPrices(json));
      } catch (error) {
        console.log("Fetch cripto price failed: " + error);
      }
    };

    fetchDolarPrices();
    fetchCriptoPrices();
  }, []);

  return (
    <div>
      <h1>COTIZACIONES (USD)</h1>
      <h2>USDT</h2>
      <div className="list">
        {criptoPrices.map(({ name, value }, index) => (
          <PriceCard key={index} name={name} value={value} />
        ))}
      </div>
      <div className="flex-row justify-between">
        <h2>DOLAR</h2>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Filter</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={() => {}}
            input={<OutlinedInput label="Filter" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="list">
        {dolarPrices.map(({ name, value }, index) => (
          <PriceCard key={index} name={name} value={value} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
