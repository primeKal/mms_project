/* eslint-disable no-async-promise-executor */
import baseAPI from "../base";

class ProcurementService {
    static getAllProcurements() {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await baseAPI.get('procurement')
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    static getProcurementById(procurementId) {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await baseAPI.get(`procurement/${procurementId}`)
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    static createProcurement(procurementData) {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await baseAPI.post('procurement', procurementData)
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    static updateProcurementStatus(id, status, remarks) {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await baseAPI.put(`procurement/${id}/status`, { status, remarks })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    static deleteProcurement(procurementId) {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await baseAPI.delete(`procurement/${procurementId}`)
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default ProcurementService 