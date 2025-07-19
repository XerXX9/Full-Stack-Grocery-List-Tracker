import { getItems, type Item } from './itemService'; // adjust the path accordingly

async function main() {
  try {
    const items: Item[] = await getItems();
    console.log('Items from backend:', items);
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}

main();
