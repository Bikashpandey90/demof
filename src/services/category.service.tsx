import HttpService from "./http.service";
export enum CategoryStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}
export interface CategoryData {
    _id?: string,
    title: string,
    status: CategoryStatus,
    image?: any,
    slug?: string
}

class CategoryService extends HttpService {

    async createCategory(data: CategoryData) {
        try {
            const response = await this.postRequest('/category/create-category', data, { auth: true, file: true })
            return response.data
        } catch (exception) {
            throw exception
        }

    }
    async getAllCategory() {
        try {
            const response = await this.getRequest('/category/list-categories', { auth: true })
            return response.data
        } catch (exception) {
            throw exception
        }

    }
    async deleteCategory(id: string) {
        try {
            const response = await this.deleteRequest('/category/' + id, { auth: true })
            return response.data

        } catch (exception) {
            throw exception
        }
    }
}
const categorySvc = new CategoryService()
export default categorySvc