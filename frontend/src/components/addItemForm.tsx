import React, { useState } from 'react';
import { Box, TextField, Button} from '@mui/material';

interface AddItemFormprops {
    onAddItem: (itemData: { name: string, quantity: string }) => void;
}

export default function AddItemForm({ onAddItem }: AddItemFormprops) {
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(''); //<TextField> defaults all inputs to strings

    function handleSubmit(event: React.FormEvent) {
        event?.preventDefault();
        onAddItem({ name: itemName, quantity });
        setItemName("");
        setQuantity("");
    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>
                <TextField variant="filled" label="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)}></TextField>
                <TextField variant="filled" label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}></TextField>
                <Button type='submit' sx={{marginLeft: 'auto', marginRight: 2}}>Add Item</Button>
            </Box>


        </Box>
    )

}