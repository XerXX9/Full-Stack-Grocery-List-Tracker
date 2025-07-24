import { useState, useEffect } from 'react'
import AddItemForm from '../components/addItemForm';
import ItemList from '../components/itemList';
import type { Item } from '../api/itemService';
import { postItem, getItems, deleteItem, putItem } from '../api/itemService'
import { Box, Container, Typography, Paper } from '@mui/material';

export default function Home() {
    const [items, setItems] = useState<Item[]>([]);
    const [editingItemId, setEditingItemId] = useState<number | null>(null);

    async function handleAddItem(itemData: { name: string, quantity: string }) {
        const payload = {
            name: itemData.name,
            quantity: Number(itemData.quantity)
        }
        const newItem = await postItem(payload);
        setItems([...items, newItem]);
    }

    async function handleUpdateItem(id: number, updatedData: { name: string, quantity: number }) {
        const updatedItemFromServer = await putItem(id, updatedData);
        setItems(
            items.map(item => (item.id === id ? updatedItemFromServer : item))
        );
        setEditingItemId(null);
    }

    function handleEnterEditMode(id: number) {
        setEditingItemId(id);
    }

    async function handleDeleteItem(id: number) {

        await deleteItem(id);
        setItems(items.filter(item => item.id !== id));
    }

    useEffect(() => {
        const fetchInitialItems = async () => {
            const allItems = await getItems();
            setItems(allItems)
        };
        fetchInitialItems();
    }, [])


    return (
        <Box sx={{
            pt: 8
        }}>

            <Container>
                    <Typography variant='h2' align='center'>
                        Welcome to your personal Grocery List
                    </Typography>
                    <Typography variant='h3' align='center'>
                        Please wait 3 minutes so that the backed server can spin up. (This is not an issue with the website, im using the free tier of Render which causes the backend to go offline after some inactivity)
                    </Typography>
                </Container>

            <Paper sx={{
                padding: 4,
                borderRadius: 5
            }}>
                

                <ItemList items={items} onDeleteItem={handleDeleteItem} onSetEditMode={handleEnterEditMode} editingItemId={editingItemId} onUpdateItem={handleUpdateItem}>

                </ItemList>

                <AddItemForm onAddItem={handleAddItem}>

                </AddItemForm>
            </Paper>

        </Box>



    );
}
