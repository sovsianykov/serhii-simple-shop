import {httpService} from "../api/httpService";
import {Product} from "../models/models";
import {useQuery} from "react-query";


export const useFetchAllProducts = () => {


    const fetchProducts = async () => {
        const response = await httpService.get<Product[]>('')
        return response.data

    }
    const {data, isLoading, error} = useQuery<Product[]>('products', fetchProducts)


   return { data, isLoading, error  }
}
