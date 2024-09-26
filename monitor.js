async function fetchInventory() {
    const url = '你的库存接口URL'; // 替换为你的库存接口URL
    try {
        const response = await fetch(url);
        const data = await response.json();

        const stores = data.body.content.pickupMessage.stores;
        
        stores.forEach(store => {
            const storeName = store.storeName;
            const pickupTime = store.partsAvailability.Z0YQ.pickupSearchQuote;
            console.log(`店名: ${storeName}, 取货时间: ${pickupTime}`);
        });
    } catch (error) {
        console.error('获取库存失败:', error);
    }
}

fetchInventory();
