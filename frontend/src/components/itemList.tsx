import { type Item } from "../api/itemService";
import { List, ListItem, ListItemText, IconButton, TextField, Button, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";

interface ItemListProps {
    items: Item[];
    onDeleteItem: (itemId: number) => void;
    onSetEditMode: (itemId: number) => void;
    editingItemId: number | null;
    onUpdateItem: (itemId: number, updatedData: { name: string, quantity: number }) => void;
}

export default function ItemList({ items, onDeleteItem, onSetEditMode, editingItemId, onUpdateItem }: ItemListProps) {
    const [updatedName, setUpdatedName] = useState('');
    const [updatedQuantity, setUpdatedQuantity] = useState('');

    function handleUpdate() {
        if (editingItemId) {
            onUpdateItem(editingItemId, { name: updatedName, quantity: Number(updatedQuantity) });
        }

    }

    useEffect(() => {
        if (editingItemId !== null) {
            const itemToEdit = items.find(item => item.id === editingItemId);

            if (itemToEdit) {
                setUpdatedName(itemToEdit.name);
                setUpdatedQuantity(String(itemToEdit.quantity));
            }
        }
    }, [editingItemId, items]);

    return (
        <List>
            {items.map(item => {
                const isEditing = editingItemId === item.id;
                return (
                    <ListItem
                        key={item.id}
                        disablePadding
                        secondaryAction={
                            <>
                                <IconButton onClick={() => onSetEditMode(item.id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => onDeleteItem(item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }
                    >
                        {isEditing ? (
                            <Box sx={{
                                display: 'flex',
                                gap: 2
                            }}>
                                <TextField variant="filled" label='Item Name' value={updatedName} onChange={(e) => setUpdatedName(e.target.value)}></TextField>
                                <TextField variant="filled" label="Quantity" value={updatedQuantity} onChange={(e) => setUpdatedQuantity(e.target.value)}></TextField>
                                <Button sx={{ marginLeft: 'auto', marginRight: 2 }} onClick={handleUpdate}>Update Item</Button>
                            </Box>
                        ) : (
                            <ListItemText
                                primary={item.name}
                                secondary={`Qty: ${item.quantity}`}
                                sx={{ paddingX: 2 }}
                            />
                        )}
                    </ListItem>
                );
            })}
        </List>
    );
}