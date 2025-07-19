import { TextField } from "@mui/material";
import { useState } from "react";

export default function ItemForm() {
    const [name, setName] = useState("");
    const [quantity, setquantity] = useState(null);

    return(
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    );
}