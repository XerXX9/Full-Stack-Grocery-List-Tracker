import { type Item } from "../api/itemService";
import { List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';
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
                            <>
                                <TextField label='Item Name' value={updatedName} onChange={(e) => setUpdatedName(e.target.value)}></TextField>
                                <TextField label="Quantity" value={updatedQuantity} onChange={(e) => setUpdatedQuantity(e.target.value)}></TextField>
                                <Button onClick={handleUpdate}>Update Item</Button>
                            </>
                        ) : (
                            <ListItemText
                                primary={item.name}
                                secondary={item.quantity}
                            />
                        )}
                    </ListItem>
                );
            })}
        </List>
    );
}