import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { useState } from "react";
import { colors } from "../../../Data/Filter/color";
import { price } from "../../../Data/Filter/price";
import { discount } from "../../../Data/Filter/discount";
import {useSearchParams} from "react-router-dom"

const FilterSection = () => {
  const [expendColor, setExpendColor] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleColorToggle = () => {
    setExpendColor(!expendColor);
  };

  const updateFilterParams = (e: any) => {
    const { value, name } = e.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    const newParams = new URLSearchParams(); // fresh instance
    setSearchParams(newParams);
  };
  return (
    <div className="-z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
        <p className="text-lg font-semibold">Filters</p>
        <Button
          size="small"
          className="text-teal-600 cursor-pointer font-semibold"
          onClick={clearAllFilters}
        >
          clear all
        </Button>
      </div>
      <Divider />

      <div className="px-9 space-y-6">
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[500],
                pb: "14px",
              }}
              id="color"
            >
              Color
            </FormLabel>
            <RadioGroup 
            onChange={updateFilterParams}
            aria-labelledby="color" defaultValue="" name="color">
              {colors.slice(0, expendColor ? colors.length : 5).map((item) => (
                <FormControlLabel
                  value={item.name}
                  key={item.name}
                  control={<Radio />}
                  label={
                    <div className="flex items-center gap-3">
                      <p>{item.name}</p>
                      <p
                        style={{ backgroundColor: item.hex }}
                        className={`h-5 w-5 rounded-full ${
                          item.name === "White" ? "border" : ""
                        }`}
                      ></p>
                    </div>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
          <div>
            <button
              onClick={handleColorToggle}
              className="text-primary-color cursor-pointer hover:text-teal-900 flex items-center"
            >
              {expendColor ? "hide" : `+${colors.length - 5} more`}
            </button>
          </div>
        </section>
        <Divider />

        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                pb: "14px",
                color: teal[600],
              }}
              id="price"
            >
              Price
            </FormLabel>
            <RadioGroup
              name="price"
              onChange={updateFilterParams}
              aria-labelledby="price"
              defaultValue=""
            >
              {price.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
        <Divider />
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                pb: "14px",
                color: teal[600],
              }}
              id="discount"
            >
              Discount
            </FormLabel>
            <RadioGroup
              name="discount"
              onChange={updateFilterParams}
              aria-labelledby="discount"
              defaultValue=""
            >
              {discount.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
      </div>
    </div>
  );
};

export default FilterSection;
