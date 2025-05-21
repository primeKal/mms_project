/* eslint-disable no-async-promise-executor */
import baseAPI from "../base";

class ItemService {
    static getAllItems() {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await baseAPI.get('items')
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    static getItemById(itemId) {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await baseAPI.get(`items/${itemId}`)
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    static createItem(itemData) {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await baseAPI.post('items', itemData)
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    static updateItem(id, itemData) {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await baseAPI.put(`items/${id}`, itemData)
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    static deleteItem(itemId) {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await baseAPI.delete(`items/${itemId}`)
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default ItemService 