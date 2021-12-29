import { CreateOutlined } from "@mui/icons-material";
import DatePicker from "@mui/lab/DatePicker";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import * as React from "react";

const Landing = () => {
  const [value, setValue] = React.useState(null);

  return (
    <div>
      <Box p={2}>
        <Button variant="contained" startIcon={<CreateOutlined />}>
          sample
        </Button>

        <DatePicker
          label="Basic example"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </div>
  );
};

export default Landing;
