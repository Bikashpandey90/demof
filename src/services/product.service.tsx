import HttpService from "./http.service";
export enum ProductStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}
export interface ProductData {
    _id?: string,
    title: string,
    status: ProductStatus,
    image?: any,
    slug?: string
}

class ProductService extends HttpService {

    async createProduct(data: ProductData) {
        try {
            const response = await this.postRequest('/products/create-product', data, { auth: true, file: true })
            return response.data
        } catch (exception) {
            throw exception
        }

    }
    async getAllProducts() {
        try {
            const response = await this.getRequest('/products/list-all-products', {
                auth: true
            })
            return response

        } catch (exception) {
            throw exception
        }
    }
    async deleteProduct(id: string) {
        try {
            const response = await this.deleteRequest('/products/' + id, { auth: true })
            return response

        } catch (exception) {
            throw exception
        }
    }
    async fetchProductBySlug(slug: string) {
        try {
            const response = await this.getRequest('/products/' + slug + '/by-slug', { auth: false })
            return response.data

        } catch (exception) {
            console.log(exception)
            throw exception
        }
    }
    async updateProduct(id: string, data: ProductData) {
        try {
            const response = await this.patchRequest('/products/' + id, data, { auth: true, file: true })
            return response.data
        } catch (exception) {
            console.log(exception)
            throw exception
        }
    }
}
const productSvc = new ProductService()
export default productSvc