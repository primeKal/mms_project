/* eslint-disable no-async-promise-executor */
import baseAPI from "../base";

class InventoryService {
    static getAllInventory() {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await baseAPI.get('inventory')
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    static getInventoryById(inventoryId) {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await baseAPI.get(`inventory/${inventoryId}`)
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    static getInventoryByItem(itemId) {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await baseAPI.get(`inventory/item/${itemId}`)
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    static updateInventoryStatus(id, status) {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await baseAPI.put(`inventory/${id}/status`, { status })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default InventoryService 