import React, {FunctionComponent, memo, useCallback} from 'react';
import { Wrapper } from "./Item.styles";
import {Product} from "../../models/models";
import {Button} from "@mui/material";


interface ItemProps {
    item : Product;
    handleAddToCart:(clicked:Product) => void
}


const Item:FunctionComponent<ItemProps> = ({item,handleAddToCart}) => {

    const onClickHandler = useCallback(()=>{
        handleAddToCart(item)
    },[handleAddToCart, item])

    return (
        <Wrapper>
           <img src={item.image} alt={item.title}/>
            <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <h3>${item.price}</h3>
            </div>
            <Button onClick={onClickHandler}>Add To Cart</Button>
        </Wrapper>
    );
};

export default memo(Item);
