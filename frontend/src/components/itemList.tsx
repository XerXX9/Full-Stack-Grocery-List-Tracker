import {type Item} from "../api/itemService";
import { List, ListItem, ListItemText } from '@mui/material';

interface ItemListProps {
    items: Item[]
}

export default function ItemList({ items }: ItemListProps) {
    return (
        <List>
            { items.map(item => (
                <ListItem key={item.id}>
                    <ListItemText
                      primary={item.name}
                      secondary={item.quantity}
                    />
                </ListItem>
            )) }
        </List>
    );
}